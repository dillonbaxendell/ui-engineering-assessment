class User < ApplicationRecord
  has_many :attendees, dependent: :destroy
  has_many :events, through: :attendees, dependent: :destroy

  validates :first_name, :last_name, :email_address, presence: true
end