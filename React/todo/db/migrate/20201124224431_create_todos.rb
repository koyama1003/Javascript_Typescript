class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.text :title
      t.text :body
      t.datetime :startdate
      t.datetime :deadline
      t.text :comment
      t.integer :user_id,null:false
      t.string :status,null:false, default: "yet"
      t.timestamps
    end
  end
end
