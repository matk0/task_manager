# MindMeister Challenge

**Caveats**

- The challenge says "Make the project production ready.", yet this is a very broad statement. Here are some of the things that I believe should be done before going into production, yet I decided to not do them for the lack of time:
  - Did not TDD this challenge.
  - Proper CORS policy.
  - CI/CD process.
  - Monitoring and analytics.
  - I would use Docker to containerise the application (to use in production and also for collaborators).
- I did use github copilot. I believe we should embrace new tools to improve our programming output.
- Spend 2 hours more on the challenge than suggested in the instructions. Graphql subscriptions were new to me so I had to take more time to implement them.
<!-- -->

**Backend**

- I am aware I was supposed to use MySQL but I ran into troubles installing it on my computer so I went for postgresql.
- Had to add session middleware to an api only application so that I can use sidekiq web UI.
- Did not run into any major trouble on the RoR side. Pretty simple and straightforward implementation in my opinion.
<!-- -->

**Frontend**

- Was relatively simple.
- Only reacts to adding a new task, not removing.
- I would continue with extracting the different lists organizations (grid, list) into their own components.
<!-- -->

**Biggest Challenge**
Graphql subscription over ActionCable.
