require 'sidekiq'
require 'sidekiq-cron'

Sidekiq::Cron::Job.create(
  name: 'Generate Recurring Tasks',
  cron: '*/2 * * * *',
  class: 'TaskGeneratorJob'
)
