# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    first_name               { "Bruce" }
    last_name                { "Wayne" }
    sequence(:email_address) { |n| "user#{n}@example.com" }
  end
end
