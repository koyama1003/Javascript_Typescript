class CreateTagTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :tag_todos do |t|
    t.references :tag, index: true
    t.references :todo, index: true
    t.timestamps
    end
  end
end