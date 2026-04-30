import styles from "./app.module.scss";
import { ControlPanel, TodosList } from "./components";
import { useTodos } from "./provider/TodosProvider";

export const App = () => {
	const { isLoading, error } = useTodos();

	if (error) {
		return <div className={styles.todos__error}>{error}</div>;
	}

	return (
		<>
			<ControlPanel />
			{isLoading ? (
				<div className={styles.todos__loader}></div>
			) : (
				<TodosList />
			)}
		</>
	);
};
