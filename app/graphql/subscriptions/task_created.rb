module Subscriptions
  class TaskCreated < GraphQL::Schema::Subscription
    field :task, Types::TaskType, null: false
  end
end
