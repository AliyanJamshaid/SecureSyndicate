import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Parent from "./components/Parent";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // children: [
    //   {
    //     path: "/",
    //     element: <Home />,
    //   },
    // ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
