class RemoveNullFalseFromLocation < ActiveRecord::Migration[6.1]
  def change
    change_column :artworks, :location_id, :bigint, null: true
  end
end
