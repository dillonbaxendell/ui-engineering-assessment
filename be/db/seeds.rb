# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
User.create({ first_name: 'Jane', last_name: 'Doe', email_address: 'undeliverable@threeflow.com' })
Event.create({ name: 'Meetup', location: 'Threeflow', start_date: '2024-05-20T00:00:00.000Z' })