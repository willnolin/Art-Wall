class User < ApplicationRecord
  has_secure_password
  has_many :locations
  has_many :artworks 

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, length: { minimum: 6 }, on: :create
end
