import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { gql, useQuery } from "@apollo/client";
import client from "./apolloClient";

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

const App = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {" "}
      <h1 className="logo">Task Manager</h1>
      {data.projects.map((project) => (
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
