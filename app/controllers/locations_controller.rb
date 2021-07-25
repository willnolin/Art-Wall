class LocationsController < ApplicationController
  before_action :set_location, only: %i[show update destroy]
  before_action :authorize_request, only: %i[create update destroy]
  # GET /locations
  def index
    @locations = Location.all

    render json: @locations
  end

  # GET /locations/1
  #
  def show
    render json: @location, include: { artworks: { include: :user } }
  end

  # POST /locations
  def create
    @location = Location.new(location_params)
    @location.user = @current_user # set location.user_id to the user from the token
    if @location.save
      render json: @location, status: :created
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /locations/1
  def update
    if @location.update(location_params)
      render json: @location
    else
      render json: @location.errors, status: :unprocessable_entity
    end
  end

  # DELETE /locations/1
  def destroy
    @location.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_location
    @location = Location.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def location_params
    params.require(:location).permit(:name, :street, :city, :state, :img_url, :sales, :commission, :message, :user_id)
  end
end
