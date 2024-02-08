# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
user_1 = User.create({ first_name: 'Event', last_name: 'Creator', email_address: 'test@threeflow.com', admin: true })
user_2 = User.create({ first_name: 'Jane', last_name: 'Doe', email_address: 'jane@threeflow.com' })
user_3 = User.create({ first_name: 'John', last_name: 'Doe', email_address: 'john@threeflow.com' })
event_1 = Event.create({ user_id: 2, name: 'Meetup at Threeflow', location: 'Threeflow', start_date: '2024-01-01T00:00:00.000Z' })
event_2 = Event.create({ user_id: 1, name: 'Bug Fixing Party', location: 'Threeflow', start_date: '2024-05-20T00:00:00.000Z' })
event_3 = Event.create({ user_id: 1, name: 'New Features Project', location: 'Threeflow', start_date: '2024-08-12T00:00:00.000Z' })
event_4 = Event.create({ user_id: 2, name: 'Celebration', location: 'Threeflow', start_date: '2025-01-01T00:00:00.000Z' })
Attendee.create({ user_id: user_2.id, event_id: event_1.id })
Attendee.create({ user_id: user_2.id, event_id: event_2.id })
