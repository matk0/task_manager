class Task < ApplicationRecord
  belongs_to :project

  after_create :trigger_task_created_subscription

  private

  def trigger_task_created_subscription
    TaskManagerSchema.subscriptions.trigger(:task_created, {}, { task: self })
  end
end
