import { createRoot } from 'react-dom/client';
import { ApolloProvider, useQuery, useSubscription } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { useState, useEffect } from 'react';
import client from './apolloClient';
import { GET_PROJECTS } from './queries';
import { TASK_CREATED_SUBSCRIPTION } from './subscriptions';

if (import.meta.env.DEV) {
  loadDevMessages();
  loadErrorMessages();
}

const App = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

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
      if (data.projects.length > 0) {
        setSelectedProjectId(data.projects[0].id);
      }
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId,
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Task Manager</h1>
      <div className="mb-4">
        <label
          htmlFor="project-select"
          className="block text-lg font-medium mb-2"
        >
          Select Project:
        </label>
        <select
          id="project-select"
          className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedProjectId || ''}
          onChange={(e) => setSelectedProjectId(e.target.value)}
        >
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      {selectedProject && (
        <div className="mb-8 p-4 border rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedProject.name}
          </h2>
          <ul className="list-disc list-inside">
            {selectedProject.tasks.map((task) => (
              <li key={task.id} className="text-lg mb-2">
                {task.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
