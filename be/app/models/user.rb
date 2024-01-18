class User < ApplicationRecord
  has_many :attendees
  has_many :events, through: :attendees

  validates :first_name, :last_name, :email_address, presence: true
end
