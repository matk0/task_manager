import { createRoot } from "react-dom/client";
import { ApolloProvider, useQuery, useSubscription } from "@apollo/client";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import { useState, useEffect } from "react";
import client from "./apolloClient";
import { GET_PROJECTS } from "./queries";
import { TASK_CREATED_SUBSCRIPTION } from "./subscriptions";

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

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
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Task Manager</h1>
      {projects.map((project) => (
        <div key={project.id} className="mb-8 p-4 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">{project.name}</h2>
          <ul className="list-disc list-inside">
            {project.tasks.map((task) => (
              <li key={task.id} className="text-lg mb-2">
                {task.name}
              </li>
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
