class Todo < ApplicationRecord
    belongs_to :user
    validates :user_id, presence: true
    has_many :tag_todos
    has_many :tags,through: :tag_todos
end
