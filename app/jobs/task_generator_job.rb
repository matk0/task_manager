class TaskGeneratorJob < ApplicationJob
  queue_as :default

  def perform
    Project.find_each do |project|
      Task.create!(name: "New Task #{Time.now.strftime('%H:%M:%S')}", project: project)
    end
  end
end
