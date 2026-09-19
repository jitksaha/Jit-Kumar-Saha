import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import "./styles.css";

const router = getRouter();

export default function StaticApp() {
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")!).render(<StaticApp />);
