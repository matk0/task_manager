import { createRoot } from "react-dom/client";

const App = () => {
  return (
    <div>
      <h1 className="logo">Task Manager</h1>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
