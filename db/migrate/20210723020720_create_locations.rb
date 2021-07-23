class CreateLocations < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :street
      t.string :city
      t.string :state
      t.string :img_url
      t.boolean :sales
      t.integer :commission
      t.text :message
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
