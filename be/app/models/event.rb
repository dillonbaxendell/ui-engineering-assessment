class Event < ApplicationRecord
  has_many :attendees, dependent: :destroy
  belongs_to :user, foreign_key: :user_id, class_name: "User", inverse_of: :events

  validates :name, :location, :start_date, presence: true

  scope :with_attendee_count, -> { 
    left_joins(:attendees)
      .select('events.*, COUNT(attendees.id) AS attendee_count')
      .group('events.id')
  }
end
