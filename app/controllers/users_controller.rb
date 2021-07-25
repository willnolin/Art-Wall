class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy]
  before_action :authorize_request, only: %i[update destroy]
  # before_action :get_users_at_location, only: :all_by_location
  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # # Get all users by location
  # def all_by_location
  #   @id_array = Artwork.all.where("location_id = #{params[:id]}")
  #   render json: @id_array
  # end

  # GET /users/1
  def show
    render json: @user, include: { artworks: { include: :location } }
  end

  # post to db
  def create
    @user = User.new(user_params)

    if @user.save
      @token = encode({ id: @user.id })
      render json: {
        user: @user.attributes.except('password_digest'),
        token: @token
      }, status: :created
    else
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

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:name, :profile_pic, :contact, :city_state, :website, :message, :username, :email,
                                 :password, :is_host)
  end
end
