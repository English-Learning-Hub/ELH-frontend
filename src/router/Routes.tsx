import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import { HomePage } from "../pages/HomePage";
import { ProfilePage } from "../pages/ProfilePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LessonsPage } from "../pages/LessonsPage";
import { LessonDetailPage } from "../pages/LessonDetailPage";
import { CreateLessonPage } from "../pages/CreateLessonPage";
import RequireAuth from "./RequireAuth";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      {
        path: "register",
        element: <RegisterPage />
      },
      {
        path: "profile",
        element: <ProfilePage />
      },
      { path: "lessons", element: <LessonsPage /> },
      { path: "lessons/:id", element: <LessonDetailPage /> },
      {
        element: <RequireAuth allowedRoles={['teacher']} />,
        children: [{ path: "create-lesson", element: <CreateLessonPage /> }],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
