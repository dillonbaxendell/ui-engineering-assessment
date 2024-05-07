require 'rails_helper'

RSpec.describe Event, type: :model do
  it { expect(subject).to have_many(:attendees) }
  it { expect(subject).to belong_to(:user) }

  it { expect(subject).to validate_presence_of(:name) }
  it { expect(subject).to validate_presence_of(:location) }
  it { expect(subject).to validate_presence_of(:start_date) }
end