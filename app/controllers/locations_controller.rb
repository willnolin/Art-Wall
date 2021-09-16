class LocationsController < ApplicationController
  before_action :set_location, only: %i[show update destroy]
  before_action :set_users_at_location, only: :show
  before_action :authorize_request, only: %i[create update destroy]
  # GET /locations
  def index
    @locations = Location.all
    render json: @locations
  end

  def show
    render json: {location: @location, include: { artworks: { include: :user } }, artists: @artists}
  end

  def create
    @location = Location.new(location_params)
    @location.user = @current_user # set location.user_id to the user from the token
    if @location.save
      render json: @location, status: :created
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  def update
    if @location.update(location_params)
      render json: @location
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @location.destroy
  end
  
  def get_owner
    @owner = User.find(@location.user_id)
    render json: @owner, status: :ok
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_location
    @location = Location.find(params[:id])
  end

  # join tables and find distinct artists at that location
  def set_users_at_location
    @artists = User.joins(
    <<~SQL  
      INNER JOIN artworks ON artworks.user_id = users.id
      INNER JOIN locations ON locations.id = artworks.location_id
      WHERE locations.id = #{params[:id]}
    SQL
    ).distinct
  end

  # Only allow a list of trusted parameters through.
  def location_params
    params.require(:location).permit(:name, :street, :city, :state, :img_url, :sales, :commission, :message, :user_id)
  end
end
