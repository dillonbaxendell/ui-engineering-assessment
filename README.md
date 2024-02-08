# Threeflow Full-Stack Challenge

- [Front-end requirements](#front-end)
- [Back-end requirements](#back-end)
- [Getting started](#getting-started)
- [Support requests](#support-requests)
  - [Bug 1](#bug-1)
  - [Bug 2](#bug-2)
  - [Feature request 1](#feature-request-1)
  - [Feature request 2](#feature-request-2)

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
