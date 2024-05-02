# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    association :user
    name        { "Epic Superhero Party" }
    location    { "Gotham City" }
    start_date  { 1.month.from_now }
    description { "A great event" }
  end
end
