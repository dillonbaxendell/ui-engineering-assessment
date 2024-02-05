# frozen_string_literal: true

require "rails_helper"

describe "Events API", type: :request do
  let!(:event_1) { create(:event) }
  let!(:event_2) { create(:event) }

  describe "GET /v1/events" do
    let(:described_request) do
      get "/v1/events"
      response
    end

    it "returns all events" do
      expect(described_request).to have_http_status(:ok)
      expect(response.body).to eq(Event.with_attendee_count.to_json)
    end
  end

  describe "GET /v1/events/:id" do
    let(:described_request) do
      get "/v1/events/#{event_1.id}"
      response
    end

    it "returns a specific event" do
      expect(described_request).to have_http_status(:ok)

      event = JSON.parse(response.body)
      expect(event["id"]).to eq(event_1.id)
      expect(event["name"]).to eq(event_1.name)
      expect(event["location"]).to eq(event_1.location)
    end
  end
  
  describe "POST /v1/events" do
    let!(:user) { create(:user) }
    let(:described_request) do
      post "/v1/events", params: { event: { name: "Superhero Party", location: "Smallville", start_date: 1.week.from_now, description: "Party in Smallville", user_id: user.id } }
      response
    end

    it "creates a new user" do
      expect(described_request).to have_http_status(:ok)
      expect(response.body).to include("Superhero Party")
      expect(response.body).to include("Smallville")
    end
  end

  describe "PATCH /v1/events/:id" do
    let!(:event) { create(:event) }
    let(:described_request) do
      patch "/v1/events/#{event.id}", params: { event: { name: "Villanous Council" } }
      response
    end

    it "updates an event" do
      expect(described_request).to have_http_status(:ok)
      expect(response.body).to include("Villanous Council")
    end
  end

  describe "DELETE /v1/events/:id" do
    let!(:event) { create(:event) }
    let(:described_request) do
      delete "/v1/events/#{event.id}"
      response
    end

    it "deletes an event" do
      expect { described_request }.to change(Event, :count).by(-1)
    end
  end

  describe "GET /v1/events/:id/users" do
    let!(:user)  { create(:user) }
    let!(:event) { create(:event) }
    let!(:attendee) { create(:attendee, user: user, event: event) }
    let(:described_request) do
      get "/v1/events/#{event.id}/users"
      response
    end

    it "returns all attendees for an event" do
      expect(described_request).to have_http_status(:ok)
      expect(response.body).to include(attendee.to_json)
    end
  end

  describe "POST /v1/events/:id/users/" do
    let!(:user)  { create(:user) }
    let!(:event) { create(:event) }
    let(:described_request) do
      post "/v1/events/#{event.id}/users", params: { email_address: user.email_address }
      response
    end

    it "add the user as an attendee for the event" do
      expect { described_request }.to change(Attendee, :count).by(1)
    end
  end
end
