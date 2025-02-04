class TaskGeneratorJob < ApplicationJob
  queue_as :default

  def perform
    Project.all.each do |project|
      Task.create!(name: "New Task #{Time.now.strftime('%H:%M:%S')}", project:)
    end
  end
end
