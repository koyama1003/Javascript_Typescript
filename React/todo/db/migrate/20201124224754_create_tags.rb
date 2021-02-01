class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.text :description
      t.string :color
      t.integer :count , null:false , default: 0

      t.timestamps
    end
  end
end