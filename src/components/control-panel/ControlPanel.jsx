import { CreateTodo, SearchTodo, SortTodo } from "./components";
import styles from "./controlpanel.module.scss";

export const ControlPanel = () => {
	return (
		<div className={styles["todos__control-panel"]}>
			<SearchTodo />
			<SortTodo />
			<CreateTodo />
		</div>
	);
};
