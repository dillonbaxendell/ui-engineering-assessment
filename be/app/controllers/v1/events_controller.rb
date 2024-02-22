# frozen_string_literal: true

module V1
  class EventsController < ApplicationController

    # GET /v1/events
    def index
      events = Event.with_attendee_count
      render json: events.to_json
    end

    # GET /v1/events/:id
    def show
      event = Event.find(params[:id])
      render json: event
    end

    # POST /v1/events
    def create
      event = Event.new(event_params)

      if event.save
        render json: event.to_json
      else
        render json: event.errors.to_json
      end
    end

    # DELETE /v1/events/:id
    def destroy
      event = Event.find(params[:id])
      event.destroy

      render json: event.to_json
    end

    # PATCH /v1/events/:id
    def update
      event = Event.find(params[:id])

      if event.update(event_params)
        render json: event.to_json
      else
        render json: event.errors.to_json
      end
    end

    # DELETE /v1/events/:id
    def destroy
      event = Event.find(params[:id])
      event.destroy

      render json: event.to_json
    end

    private

    def event_params
      params.require(:event).permit(:name, :location, :description, :start_date, :user_id, :attendees)
    end
  end
end
