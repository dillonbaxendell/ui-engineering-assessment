# Threeflow Full-Stack Challenge

- [Threeflow Full-Stack Challenge](#threeflow-full-stack-challenge)
  - [Front-end](#front-end)
    - [Requirements](#requirements)
  - [Back-end](#back-end)
    - [Requirements](#requirements-1)
  - [Getting started](#getting-started)
  - [Support requests](#support-requests)
    - [Bug 1](#bug-1)
    - [Bug 2](#bug-2)
    - [Bug 3](#bug-3)
    - [Feature request 1](#feature-request-1)
    - [Feature request 2](#feature-request-2)
    - [Feature request 3](#feature-request-3)
    - [Feature request 4](#feature-request-4)

## Front-end
- `/fe` directory
### Requirements
- NodeJS v20

## Back-end
- `/be` directory
### Requirements
- Ruby v3.1.2
- rails v7
- sqlite3

## Getting started
- We recommend using [asdf](https://asdf-vm.com/) to manage installed Node and Ruby versions
- run `bash setup.sh`
  - this will install the dependencies and create and populate the database
- run `bash start_server.sh`
  - this will start both servers and should open the browser to [localhost:8080](http://localhost:8080)
- Sign in with one of the seed users:
  - `test@threeflow.com`
  - `jane@threeflow.com`
  - `john@threeflow.com`

## Support requests
### Bug 1
**Support request:**
I'm having trouble sorting the table of events when viewing events I've created. Sometimes they're sorted correctly but other times they aren't.

**Acceptance criteria**

**GIVEN:**
I am signed in and viewing the Your events tab at /events/my-events

**WHEN:**
I click the Name column to sort the table

**THEN:**
The table rows should be sorted correctly

---
### Bug 2
**Support request:**
I clicked the Attend button for an event by mistake and now I can't seem to Decline it

**Acceptance criteria**

**GIVEN:**
I am signed in as `jane@threeflow.com` and have clicked the Attend button on an event

**WHEN:**
I click the Decline button for the event I have chosen to attend

**THEN:**
The event status should change and the button should show Attend again

---
### Bug 3
**Support request:**
A third party system is submitting empty data to the "Create Event" `POST /v1/events` endpoint. We need to ensure that we don't allow blank data to be intserted into the database.

**Acceptance criteria**

**GIVEN:**
I am submitting data via the API

**WHEN:**
I submit blank data for an event

**THEN:**
The event should not be created and I should receive an error message.

---
### Feature request 1
**Feature request:**
I would like the ability to sort events by date when viewing the table of events I've created.

**Acceptance criteria**

**GIVEN:**
I am signed in and viewing the Your events tab at /events/my-events

**WHEN:**
I click the Date

**THEN:**
The table rows should be sorted by date

---
### Feature request 2
**Feature request:**
Being able to sort events by date in the Upcoming events view would make it easier to find events I wish to attend

**Acceptance criteria**

**GIVEN:**
I am signed in and viewing the Upcoming events view

**THEN:**
I should see a control I can use to sort the list of events

---
### Feature request 3
**Feature request:**
The front-end application supports displaying event attendees on the event show page (/events/:id). We need to include attendees in the API response.

**Acceptance criteria**

**GIVEN:**
I am signed in and viewing a specific event

**THEN:**
I should see a list of attendees

---
### Feature request 4
**Feature request:**
In order to provide a better user experience we need to add pagination to the Event index page (GET /v1/events).
`curl --location 'http://localhost:3000/v1/events/'`

**Acceptance criteria**

**GIVEN:**
I am a user of a third party system that uses the API.

**THEN:**
I should receive a paginated list of Events when I hit the "GET /v1/events" endpoint.
