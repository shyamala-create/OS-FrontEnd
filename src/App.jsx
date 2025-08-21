import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import ForgetPasswordPage from "./pages/forgetPasswordPage";
import ResetPasswordPage from "./pages/resetPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy-loaded pages
const Login = lazy(() => import("./pages/loginPage"));
const Dashboard = lazy(() => import("./pages/dasboardPage"));

const routes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<div>Loading Login...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<div>Loading Dashboard...</div>}>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Suspense>
    ),
  },
  {
    path: "/forget-password",
    element: (
      <Suspense fallback={<div>Loading forget password...</div>}>
        <ForgetPasswordPage />
      </Suspense>
    ),
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordPage />,
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
