import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Flashcard from "./components/Flashcard";

const el = document.getElementById("root");
const root = ReactDOM.createRoot(el);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/flashcard/:flashcardId",
    element: <Flashcard />,
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
