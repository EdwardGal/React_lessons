import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import styles from "./app.module.scss";
import { TodosProvider } from "./provider/TodosProvider.jsx";
import { UIProvider } from "./provider/UIProvider.jsx";


const rootElement = document.getElementById("app");
rootElement.className = styles.todos;

const root = createRoot(rootElement);

root.render(
	<UIProvider>
		<TodosProvider>
			<App />
		</TodosProvider>
	</UIProvider>,
);
