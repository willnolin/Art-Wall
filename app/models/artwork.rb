class Artwork < ApplicationRecord
  belongs_to :user
  belongs_to :location
end
