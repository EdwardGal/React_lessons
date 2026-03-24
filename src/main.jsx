import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import styles from "./game.module.css";
import { Game } from "./Game.jsx";

const rootElement = document.getElementById("game");
rootElement.className = styles.app;

const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<Game />
	</StrictMode>,
);
