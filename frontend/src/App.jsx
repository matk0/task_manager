import { createRoot } from "react-dom/client";
import { ApolloProvider, gql, useQuery, useSubscription } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useState, useEffect } from "react";
import client from "./apolloClient";

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      tasks {
        id
        name
      }
    }
  }
`;

const TASK_CREATED_SUBSCRIPTION = gql`
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

const App = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [projects, setProjects] = useState([]);

  useSubscription(TASK_CREATED_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData: { data } }) => {
      if (!data || !data.taskCreated || !data.taskCreated.task) {
        return;
      }

      const newTask = data.taskCreated.task;
      setProjects((prevProjects) => {
        // Find the project to which the task belongs
        const updatedProjects = prevProjects.map((project) => {
          if (project.id === newTask.projectId) {
            return {
              ...project,
              tasks: [...project.tasks, newTask],
            };
          }
          return project;
        });
        return updatedProjects;
      });
    },
  });

  useEffect(() => {
    if (data) {
      setProjects(data.projects);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="logo">Task Manager</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <ul>
            {project.tasks.map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
