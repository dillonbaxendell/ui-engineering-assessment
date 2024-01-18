# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { expect(subject).to have_many(:attendees) }
  it { expect(subject).to have_many(:events).through(:attendees) }

  it { expect(subject).to validate_presence_of(:first_name) }
  it { expect(subject).to validate_presence_of(:last_name) }
  it { expect(subject).to validate_presence_of(:email_address) }
end