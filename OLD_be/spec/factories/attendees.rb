# frozen_string_literal: true

FactoryBot.define do
  factory :attendee do
    association :user
    association :event
  end
end
