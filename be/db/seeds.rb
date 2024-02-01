# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create({ first_name: 'Event', last_name: 'Creator', email_address: 'test@threeflow.com' })
User.create({ first_name: 'Jane', last_name: 'Doe', email_address: 'jane@threeflow.com' })
User.create({ first_name: 'John', last_name: 'Doe', email_address: 'john@threeflow.com' })
Event.create({ user_id: 1, name: 'Meetup at Threeflow', location: 'Threeflow', start_date: '2024-01-01T00:00:00.000Z' })
Event.create({ user_id: 1, name: 'Bug Fixing Party', location: 'Threeflow', start_date: '2024-05-20T00:00:00.000Z' })
Event.create({ user_id: 1, name: 'New Features Project', location: 'Threeflow', start_date: '2024-08-12T00:00:00.000Z' })
Event.create({ user_id: 1, name: 'Celebration', location: 'Threeflow', start_date: '2024-01-01T00:00:00.000Z' })
Attendee.create({ user_id: 2, event_id: 1})
Attendee.create({ user_id: 2, event_id: 2})
Attendee.create({ user_id: 3, event_id: 2})