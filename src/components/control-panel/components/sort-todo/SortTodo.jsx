import { use } from "react";
import { Button } from "../../../button/Button";
import styles from "../../controlpanel.module.scss";
import { UIContext } from "../../../../context/uiContext";

export const SortTodo = () => {
	const { setIsAlphabetSorting } = use(UIContext);

	return (
		<div className={styles["todos__control-panel-input"]}>
			<Button onClick={setIsAlphabetSorting}>A&darr;</Button>
		</div>
	);
};
