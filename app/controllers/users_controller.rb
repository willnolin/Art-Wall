class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]
  before_action :authorize_request, only: %i[update destroy]
  before_action :set_locations, only: :show
  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    render json: {user: @user, artworks: @user.artworks , locations: @locations}
  end

  # post to db
  def create
    @user = User.new(user_params)
    if @user.save
      NewUserEmailMailer.notify_user(@user).deliver
      @token = encode({ id: @user.id })
      render json: {
        user: @user.attributes.except('password_digest'),
        token: @token
      }, status: :created
    else
      # puts @user.errors.full_messages
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @current_user.update(user_params)
      render json: @current_user
    else
      render json: @current_user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

   # join tables and find all locations where user has artwork
   def set_locations
    @locations = Location.joins(
    <<~SQL 
      INNER JOIN artworks ON artworks.location_id = locations.id
      INNER JOIN users ON users.id = artworks.user_id
      WHERE users.id = #{params[:id]} 
      SQL
    ).distinct
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:name, :profile_pic, :contact, :city_state, :website, :message, :username, :email,
                                 :password, :is_host)
  end
end
