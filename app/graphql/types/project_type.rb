module Types
  class ProjectType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :tasks, [Types::TaskType], null: false
  end
end
