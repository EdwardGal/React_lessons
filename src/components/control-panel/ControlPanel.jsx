import styles from "./controlpanel.module.scss";
import { Button } from "../button/button";
import { Search, Sorting, Create } from "./components";



export const ControlPanel = ({ onCreate, onSearch, onSorting }) => {
	return (
		<div className={styles.todos__actions}>
			<Search onSearch={onSearch} />
			<Sorting onSorting={onSorting} />
			<Create onCreate={onCreate} />
		</div>
	);
};
