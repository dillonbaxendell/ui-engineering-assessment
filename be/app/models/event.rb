class Event < ApplicationRecord
  has_many :attendees, dependent: :destroy
  has_many :attendee_users, through: :attendees, source: :user
  belongs_to :user, foreign_key: :user_id, class_name: "User", inverse_of: :events

  validates :location, :start_date, presence: true

  scope :with_attendee_count, -> { 
    left_joins(:attendees)
      .select('events.*, COUNT(attendees.id) AS attendee_count')
      .group('events.id')
  }
end
