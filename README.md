# Threeflow Frontend Challenge

- [Threeflow Frontend Challenge](#threeflow-frontend-challenge)
  - [Front-end](#front-end)
    - [Requirements](#requirements)
  - [Back-end](#back-end)
    - [Requirements](#requirements-1)
  - [Getting started](#getting-started)
  - [Front-end challenge](#front-end-challenge)

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
  - `test@threeflow.com` (admin user)
  - `jane@threeflow.com` 
  - `john@threeflow.com`

# Front-end challenge

This bundle contains a very basic Ruby on Rails API server project and a small Vue 3 project. 

For the front-end challenge, we’ll be asking you to add the following three features (time permitting) to the site and to submit your updated code back to us. 

The Vue app will come with the Element Plus UI library already set up in the package and it's used for all of the UI elements of the project.

**We want to be respectful of your time**. Please time-box to a maximum of three hours. We recommend you start with an outline on your approach for all three "tickets" so that, in case you run out of time, our interviewers can use that information to guide the conversation. 

**The goal of this test is to start a conversation about your engineering skills and approaches to architecture.**

## Feature requests

### Feature Request:

I would like the ability to delete my own events when logged in as a normal user and when logged in as an admin user, I want the ability to delete any event.

#### Acceptance Criteria:
**GIVEN**: 
I am viewing the Upcoming Events page while logged in as an Admin User

**THEN**: 
I see a new "Delete" button on the Event cards for all events

**WHEN**: 
I click on the "Delete" button, a DELETE call to the `/events/:id` BE endpoint is made to delete the event

**AND**: 
The UI is updated, and the deleted event no longer displays
 
---

**GIVEN**: 
I am viewing the My Events page while logged in as a non-Admin User

**THEN**: 
I see a new “Delete” button on the Event rows of the table for any events I created

**WHEN**: 
I click on the "Delete" button, a call to the `/events/:id` BE endpoint is made to delete the event

**AND**: The UI is updated, and the deleted event no longer displays

---
 
### Feature Request:

I would like the ability to toggle between a Card and Table view on the Upcoming Events page.

#### Acceptance Criteria:
**GIVEN**:
I am viewing the Upcoming Events page while logged in as any user 

**THEN**:
I see two new buttons above the Events, one to display events as Cards and the other to display them in a Table format

**GIVEN**:
I am viewing the Upcoming Events page while logged in as any user 

**WHEN**:
I click on the first “Card view” button, then I will see all of the Upcoming Events displayed as cards (which is the current UX)

---

**GIVEN**: 
I am viewing the Upcoming Events page while logged in as any user 

**WHEN**: 
I click on the second “Table view” button, then I will see all of the Upcoming Events displayed as a table with the following columns:
- Event Name
- Description
- Start Date
- Attendee Count
- CTAs

**AND**: The CTAs column should contain the Attend, Edit and/or Delete buttons
  
---
 
### Feature Request:
I would like the ability to modify the User information for all users when logged in as an Admin.

#### Acceptance Criteria:

**GIVEN**: 
I am viewing the Users page while logged in as an Admin User 

**THEN**: 
I see a new "Edit" button on each User table row

**WHEN**: 
I click on the "Edit" button, an dialog opens with a form containing the following editable fields:
- First Name
- Last Name
- Email Address

**AND**: 
The dialog contains a “Confirm User Edits” button at the bottom

---

#### Acceptance Criteria:

**GIVEN**: 
I am viewing the User Edit dialog and have filled in all of the fields

**WHEN**: 
I click on the “Confirm User Edits” button

**THEN**: 
A PATCH call to the `users/:id` BE endpoint is made with the user data as payload 

**AND**: 
The UI is updated, displaying all of updated user info that was entered in the dialog
