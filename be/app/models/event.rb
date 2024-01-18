class Event < ApplicationRecord
  has_many :attendees
  has_many :users, through: :attendees

  validates :name, :location, :start_date, presence: true
end
