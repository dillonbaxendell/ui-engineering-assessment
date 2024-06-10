# Threeflow UI Technical Assessment

Hey there! 👋 Thanks for inviting me to participate in this take-home assessment. I had a lot of fun and I look forward to discussing it more! Below is an overview of the changes I've made to the Threeflow UI Technical Assessment project. 🚀

Have a good week!

## Changes Overview

- Implemented Feature Request #1: User Information Modification
  - Added an "Edit" button on each user row for authenticated Admin users.
  - Created a dialog with editable fields (First Name, Last Name, Email Address) prefilled with user information.
  - Implemented functionality to update user information and persist changes after a page refresh.
- Implemented Feature Request #2: Card and Table View Toggle
  - Added a conditional button to toggle between Card and Table view on the Upcoming Events page for all users.
  - Implemented Card view to display events as cards and Table view to display events in a table format with specified columns.


## Testing

Due to time-boxing, I added only one test for functionality related to the Edit User Information feature:
- Added test cases in `EditUserModal.spec.js` to ensure the Edit User dialog opens correctly, fields are prefilled, edits are confirmed, and updated information persists. 

Added test cases in `EventsTable.spec.js` for the Card and Table view toggle feature:
- Tested that the Card view button correctly displays events as cards.
- Tested that the Table view button correctly displays events in a table with the specified columns and buttons.

## Getting Started

To run the project with my changes:
1. Ensure you have NodeJS version 20 installed.
2. Clone the repository and navigate to the project directory.
3. Run `bash setup.sh` to install dependencies for both the front-end and back-end.
4. Run `bash start_server.sh` to start both servers. The frontend will be accessible at [localhost:8080](http://localhost:8080), and the backend will run on [localhost:3000](http://localhost:3000).
5. Sign in using one of the seed users:
   - `test@threeflow.com` (admin user)
   - `jane@threeflow.com`
   - `john@threeflow.com`

If you encounter any issues or are unable to run the provided scripts, you can manually set up the project by following the instructions in the original README under "Manual setup."

## Notes

- Ensure to have Vue 3 and Element Plus dependencies properly installed as per the original README.
- Feel free to explore and test the added features and functionalities.

---

This README summarizes the changes made to the Threeflow UI Technical Assessment project. If you have any questions or need further clarification, please let me know. 🤖

Email Address: dillon.j.baxendell@gmail.com
Mobile: (952)-649-0060
