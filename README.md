# Threeflow UI Technical Assessment

- [Threeflow UI Technical Assessment](#threeflow-ui-technical-assessment)
  - [Front-end](#front-end)
    - [Requirements](#requirements)
  - [Back-end](#back-end)
    - [Requirements](#requirements-1)
  - [Getting started](#getting-started)
  - [Description](#description)
  - [Feature Requests](#feature-requests)
    - [Feature Request #1](#feature-request-1)
    - [Feature Request #2](#feature-request-2)
    - [Feature Request #3](#feature-request-3)

### Requirements
- NodeJS v20

### Docs
- [Vue 3](https://v3.vuejs.org/guide/introduction.html)
- [Element Plus](https://element-plus.org/#/en-US)

## Getting started
- We recommend using [asdf](https://asdf-vm.com/) or [fnm](https://github.com/Schniz/fnm) to manage installed Node versions, but use whatever you're most comfortable with.
- run `bash setup.sh`
  - this will install the dependencies for both the front-end and back-end
- run `bash start_server.sh`
  - this will start both servers and should open the browser to [localhost:8080](http://localhost:8080)
  - the backend server will be running on [localhost:3000](http://localhost:3000)
  - the backend will reseed the database with the seed data anytime the server is restarted
- Sign in with one of the seed users:
  - `test@threeflow.com` (admin user)
  - `jane@threeflow.com` 
  - `john@threeflow.com`

### Manual setup
If you aren't able to run the provided bash scripts, you can manually run the following on two separate terminal windows starting at the root of the project:
- Frontend
```bash
clone the repo
cd fe
npm i
npm run dev
```
- Backend
```bash
cd be
npm i
npm run start
```


## Description

This bundle contains a very basic Node backend and a small Vue 3 frontend. 

For the UI assessment, we’ll be asking you to add the following three features (time permitting) to the site and to submit your updated code back to us. 

The Vue app will come with the Element Plus UI library already set up in the package and it's used for all of the UI elements of the project.

**We want to be respectful of your time**. Please time-box to a maximum of four hours. We do not require you to finish both feature requests, however, we recommend you start with an outline of your approach for each so our interviewers can use that information to guide the conversation in case you aren't able to complete every request.

**The goal of this test is to start a conversation about your engineering skills and approach to architecture.**

# Tips for a great take home

  - Add frontend testing
  - Document your API endpoints
  - Think through how you would want to handle corner cases and invalid requests
  - Think through performance implications and what you would want to do in
production
  - Make it easy for our team to build and run locally

**After you are done, please upload your result to GitHub in a private repository and share the link with us.**

## Feature Requests

### Feature Request #1:
As an Admin, I would like the ability to modify the User information for all users.

#### Acceptance Criteria (Seeing the Edit Button):

**GIVEN**: 
I am an authenticated Admin user

**WHEN**: 
I view the Users page

**THEN**: 
I will see an "Edit" button on each user row.

#### Acceptance Criteria (Editing User Information):

**GIVEN**:
I am an authenticated Admin user on the Users page

**WHEN**:
I click on the "Edit" button for a user

**THEN**:
A dialog opens with a form containing the following editable fields:
- First Name
- Last Name
- Email Address

**AND**:
All of the user's information is prefilled in the fields.

**AND**: 
The dialog contains a “Confirm Edits” button at the bottom

#### Acceptance Criteria (Submitting User Edits):

**GIVEN**: 
I am an authenticated Admin User viewing the User Edit dialog and have filled in all of the fields

**WHEN**: 
I click on the “Confirm User Edits” button

**THEN**: 
the dialog closes with the user's information updated in the applicable row on the Users page

**AND**: 
The updated information persists after a page refresh.

---
 
### Feature Request #2:

I would like the ability to toggle between a Card and Table view on the Upcoming Events page.

#### Acceptance Criteria (Seeing the View Toggle):
**GIVEN**:
I am any user

**WHEN**:
I view the Upcoming Events page

**THEN**:
I will see two buttons above the Events, one to display events as Cards and the other to display them in a Table format

#### Acceptance Criteria (Viewing Events as Cards):
**GIVEN**:
I am any user viewing the Upcoming Events page

**WHEN**:
I click on the “Card view” button

**THEN**:
I will see all of the Upcoming Events displayed as cards.

#### Acceptance Criteria (Viewing Events as a Table):
**GIVEN**: 
I am any user viewing the Upcoming Events page

**WHEN**: 
I click on the “Table View” button

**THEN**:
I will see all of the Upcoming Events displayed as a table with the following columns:
- Event Name
- Description
- Start Date
- Attendee Count
- CTAs

**AND**:
The CTAs column should contain the Attend/Decline button and an Edit button if applicable.
