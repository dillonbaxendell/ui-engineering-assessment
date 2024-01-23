require 'rails_helper'

RSpec.describe Attendee, type: :model do
  it { expect(subject).to belong_to(:event) }
  it { expect(subject).to belong_to(:user) }
end