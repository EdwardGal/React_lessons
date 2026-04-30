import { useState, use } from "react";
import styles from "../../controlpanel.module.scss";
import { UIContext } from "../../../../context/uiContext";

export const SearchTodo = () => {
	const { setSearchPhrase } = use(UIContext);
	const [value, setValue] = useState("");

	const onChange = ({ target }) => {
		setValue(target.value);
		setSearchPhrase(target.value);
	};

	return (
		<div
			className={`${styles["todos__control-panel-input"]} ${styles["todos__control-panel-input_search"]}`}
		>
			<input
				type="search"
				value={value}
				placeholder="Поиск..."
				onChange={onChange}
			/>
		</div>
	);
};
