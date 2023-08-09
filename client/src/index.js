import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Flashcard from "./components/Flashcard";
import LandingPage from "./components/LandingPage";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/flashcards/:flashcardId",
    element: <Flashcard />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
