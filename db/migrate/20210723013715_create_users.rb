class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :profile_pic
      t.string :contact
      t.string :city_state
      t.string :website
      t.text :message
      t.string :username, null: false
      t.string :email, null: false
      t.string :password, null: false
      t.boolean :is_host

      t.timestamps
    end
  end
end
