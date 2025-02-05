import { gql } from "@apollo/client";

export const TASK_CREATED_SUBSCRIPTION = gql`
  subscription OnTaskCreated {
    taskCreated {
      task {
        id
        name
        projectId
      }
    }
  }
`;
