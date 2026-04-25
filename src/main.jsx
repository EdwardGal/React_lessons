import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {  RouterProvider } from "react-router-dom";
import { router } from "./routing";
import "./index.css";
import styles from "./app.module.scss";


const rootElement = document.getElementById("app");
rootElement.className = styles.app;

const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
