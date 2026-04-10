import { useState } from "react";
import styles from "../app.module.css";

export const AddTodos = ({ addTodos }) => {
	const [newTodo, setNewTodo] = useState("");

	const addTodoHandler = () => {
		addTodos(newTodo?.trim());
		setNewTodo("");
	};

	return (
		<div className={styles.todos__action}>
			<label className={styles.todos__label} htmlFor="newTask">
				Новая задача:
			</label>
			<input
				className={styles.todos__input}
				type="text"
				id="newTask"
				value={newTodo}
				placeholder="Введите название задачи"
				onChange={({ target }) => setNewTodo(target.value)}
			/>
			<button
				className={styles.todos__btn}
				type="button"
				onClick={addTodoHandler}
			>
				Добавить
			</button>
		</div>
	);
};
