import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import styles from "./app.module.css";

const rootElement = document.getElementById("app");
rootElement.className = styles.app;

const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
