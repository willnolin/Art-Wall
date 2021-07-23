# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Artwork.destroy_all
Location.destroy_all
User.destroy_all

@admin = User.create!(name: 'Admin Sparrow',
                      profile_pic: 'https://res.cloudinary.com/willnolin/image/upload/v1627062609/girl_lagp5c.jpg', username: 'sparrow', email: 'sparrow@email.com', password: '123456')
@billy = User.create!(name: 'Billy Bob',
                      profile_pic: 'https://res.cloudinary.com/willnolin/image/upload/v1627063576/man_wftcux.jpg', username: 'billy', email: 'molly@email.com', password: '654321')
@molly = User.create!(name: 'Molly Parks',
                      profile_pic: 'https://res.cloudinary.com/willnolin/image/upload/v1627062609/girl_lagp5c.jpg', username: 'molly', email: 'Billy@email.com', password: 'sparrow')
@james = User.create!(username: 'james', email: 'kjames@email.com', password: 'sparrow1')
@kevin = User.create!(username: 'kevin', email: 'kevin@email.com', password: 'sparrow2')
puts "#{User.count} users(s) created"

@five_o = Location.create!(name: 'Five-O Gallery',
                           street: '14 Debbie Lane',
                           city: 'New York',
                           state: 'New York',
                           img_url: 'www.image_uro.com',
                           sales: false,
                           commission: 3,
                           message: 'What a great Gallery! Five-O is the best!',
                           user: @admin)
@van_ward = Location.create!(name: 'Van Ward Gallery',
                             street: '5 Turtle St.',
                             city: 'Ogunquit',
                             state: 'Maine',
                             img_url: 'www.dragon_uro.com',
                             sales: true,
                             commission: 1,
                             message: 'What a great Gallery! Van Ward is the best!',
                             user: @molly)
puts "#{Location.count} locations created"

Artwork.create!(title: 'freedom',
                img_url: 'https://res.cloudinary.com/willnolin/image/upload/v1627062610/david-clode-Ysmu6i5bfIc-unsplash_kuz3ts.jpg', user: @molly, location: @five_o)
Artwork.create!(title: 'black swan',
                img_url: 'https://res.cloudinary.com/willnolin/image/upload/v1627062611/grey-brick-wall_nepjxb.jpg', user: @admin, location: @van_ward)
Artwork.create!(title: 'capers',
                img_url: 'https://res.cloudinary.com/willnolin/image/upload/v1627062608/chirag-saini-YP8drQuufyw-unsplash_xgwevq.jpg', user: @molly, location: @van_ward)
Artwork.create!(title: 'oceanscape',
                img_url: 'https://res.cloudinary.com/willnolin/image/upload/v1627062610/david-clode-Ysmu6i5bfIc-unsplash_kuz3ts.jpg', user: @molly, location: @five_o)
Artwork.create!(title: 'portrait',
                img_url: 'https://res.cloudinary.com/willnolin/image/upload/v1627062610/david-clode-Ysmu6i5bfIc-unsplash_kuz3ts.jpg', user: @billy, location: @van_ward)
Artwork.create!(title: 'lice music',
                img_url: 'https://res.cloudinary.com/willnolin/image/upload/v1627062610/david-clode-Ysmu6i5bfIc-unsplash_kuz3ts.jpg', user: @billy, location: @van_ward)
Artwork.create!(title: 'or live music?',
                img_url: 'https://res.cloudinary.com/willnolin/image/upload/v1627062610/david-clode-Ysmu6i5bfIc-unsplash_kuz3ts.jpg', user: @billy, location: @van_ward)

puts "#{Artwork.count} locations created"
