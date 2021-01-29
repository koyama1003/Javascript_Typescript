class Tag < ApplicationRecord
  has_many :tag_todos
  has_many :todos,through: :tag_todos
  validates :name, uniqueness: true
end
