class User < ApplicationRecord
  has_many :attendees
  # has_many :events, through: :attendees
  has_many :events, inverse_of: :user, dependent: :destroy

  validates :first_name, :last_name, :email_address, presence: true
end
