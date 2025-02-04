module Types
  class SubscriptionType < Types::BaseObject
    field :task_created, subscription: Subscriptions::TaskCreated
  end
end
