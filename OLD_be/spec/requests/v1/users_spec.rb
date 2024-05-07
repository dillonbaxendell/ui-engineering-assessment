# frozen_string_literal: true

require "rails_helper"

describe "Users API", type: :request do
  let!(:user_1)   { create(:user) }
  let!(:user_2) { create(:user) }

  describe "GET /v1/users" do
    let(:described_request) do
      get "/v1/users"
      response
    end

    it "returns all users" do
      expect(described_request).to have_http_status(:ok)
      expect(response.body).to include(user_1.to_json)
      expect(response.body).to include(user_2.to_json)
    end
  end

  describe "GET /v1/users/:id" do
    let(:described_request) do
      get "/v1/users/#{user_1.id}"
      response
    end

    it "returns a specific users" do
      expect(described_request).to have_http_status(:ok)

      user = JSON.parse(response.body)
      expect(user["id"]).to eq(user_1.id)
      expect(user["first_name"]).to eq(user_1.first_name)
      expect(user["last_name"]).to eq(user_1.last_name)
      expect(user["email_address"]).to eq(user_1.email_address)
    end
  end
  
  describe "POST /v1/users" do
    let(:described_request) do
      post "/v1/users", params: { user: { first_name: "Clark", last_name: "Kent", email_address: "clarkkent@threeflow.com" } }
      response
    end

    it "creates a new user" do
      expect(described_request).to have_http_status(:ok)
      expect(response.body).to include("Clark")
      expect(response.body).to include("Kent")
      expect(response.body).to include("clarkkent@threeflow.com")
    end
  end

  describe "DELETE /v1/users/:id" do
    let!(:user) { create(:user) }
    let(:described_request) do
      delete "/v1/users/#{user.id}"
      response
    end

    it "deletes a user" do
      expect { described_request }.to change(User, :count).by(-1)
    end
  end
  
  describe "POST /v1/login" do
    let(:described_request) do
      post "/v1/login", params: { email_address: user_1.email_address }
      response
    end

    it "autheticates a user" do
      expect(described_request).to have_http_status(:ok)
      expect(response.body).to include(user_1.to_json)
    end
  end

  describe "POST /v1/users/:id/events" do
    let(:event) { create(:event) }
    let(:described_request) do
      post "/v1/users/#{user_1.id}/events", params: { event_id: event.id }
      response
    end

    it "add the user as an attendee for the event" do
      expect { described_request }.to change(Attendee, :count).by(1)
    end
  end

  describe "DELETE /v1/users/:id/events/:event_id" do
    let(:user)  { create(:user) }
    let(:event) { create(:event) }
    let!(:attendee) { create(:attendee, user: user, event: event) }
    let(:described_request) do
      delete "/v1/users/#{user.id}/events/#{event.id}"
      response
    end

    it "removes the user as an attendee for the event" do
      expect { described_request }.to change(Attendee, :count).by(-1)
    end
  end
end
