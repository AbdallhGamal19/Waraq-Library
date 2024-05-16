import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import LogIn from "./Components/LogIn/LogIn.jsx";
import SginUp from "./Components/SginUp/SginUp.jsx";
import Home from "./Components/Home/Home.jsx";
import RootLayout from "./Components/RootLayout/RootLayout.jsx";
import Profile from "./Components/Profile/Profile.jsx";
import IssueBook from "./Components/IssueBook/IssueBook.jsx";
import NonReturnedBook from "./Components/NonReturnedBook/NonReturnedBook.jsx";
import BookDetails from "./Components/BookDetails/BookDetails.jsx";
import Create from "./Components/Create/Create.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
const routers = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "sginUp", element: <SginUp /> },
      { path: "logIn", element: <LogIn /> },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "addBook",
        element: (
          <ProtectedRoute>
            <Create />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/NonReturnedBook",
        element: (
          <ProtectedRoute>
            <NonReturnedBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile/issuedBooks",
        element: (
          <ProtectedRoute>
            <IssueBook />
          </ProtectedRoute>
        ),
      },
      {
        path: "bookDetails/:id",
        element: (
          <ProtectedRoute>
            <BookDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={routers} />;
}

export default App;
