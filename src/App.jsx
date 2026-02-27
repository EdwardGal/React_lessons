import { useState } from "react";
import styles from "./app.module.css";

export const App = () => {
	const [value, setValue] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState("");

	let isValueValid = value.length >= 3;

	const onInputButtonClick = () => {
		const promptValue = prompt("Введите значение");

		if (!promptValue || promptValue.length < 3) {
			setError("Введенное значение должно содержать минимум 3 символа");
			return;
		}

		setValue(promptValue.trim());
		setError("");
	};

	const onAddButtonClick = () => {
		if (value?.length >= 3) {
			const date = new Date();
			const id = date.getTime();
			const dateString =
				date.toISOString().substring(0, 10) +
				" " +
				date.toISOString().substring(11, 19);

			setList((list) => [...list, { id, value, dateString }]);

			setValue("");
			setError("");
		}
	};

	return (
		<>
			<div className={styles.app}>
				<h1 className={styles["page-heading"]}>Ввод значения</h1>
				<p className={styles["no-margin-text"]}>
					Текущее значение <code>value</code>: "
					<output className={styles["current-value"]}>{value}</output>
					"
				</p>

				{error !== "" && (
					<div className={styles.error}>
						Введенное значение должно содержать минимум 3 символа
					</div>
				)}
				<div className={styles["buttons-container"]}>
					<button
						className={styles.button}
						onClick={onInputButtonClick}
					>
						Ввести новое
					</button>
					<button
						className={styles.button}
						onClick={onAddButtonClick}
						disabled={!isValueValid}
					>
						Добавить в список
					</button>
				</div>
				<div className={styles["list-container"]}>
					<h2 className={styles["list-heading"]}>Список:</h2>

					{list.length === 0 && (
						<p className={styles["no-margin-text"]}>
							Нет добавленных элементов
						</p>
					)}

					<ul className={styles.list}>
						{list.map(({ id, value, dateString }) => (
							<li className={styles["list-item"]} key={id}>
								{value + " - " + dateString}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
