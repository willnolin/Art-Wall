class Location < ApplicationRecord
  belongs_to :user
  has_many :artworks, dependent: :nullify
end
