class UserArtworks < ActiveRecord::Migration[6.1]
  def change
    create_join_table :users, :artworks do |t|
      t.index :user_id
      t.index :artwork_id
    end
  end
end
