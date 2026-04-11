import { useState } from "react";
import styles from "../app.module.css";

export const TodosItem = ({
	id,
	completed,
	title,
	updateTodos,
	deleteTodos,
}) => {
	const [editingId, setEditingId] = useState(null);
	const [editedTitle, setEditedTitle] = useState("");

	const startEditing = (id, title) => {
		setEditingId(id);
		setEditedTitle(title);
	};

	return (
		<li
			className={`${styles.todos__item} ${
				completed ? styles.todos__item_completed : ""
			}`}
			key={id}
		>
			<input
				className={styles.todos__checkbox}
				type="checkbox"
				checked={completed}
				onChange={() => updateTodos(id, completed)}
			/>

			{editingId === id ? (
				<input
					className={styles["todos__title-input"]}
					value={editedTitle}
					onChange={(e) => setEditedTitle(e.target.value)}
					onBlur={() => {
						updateTodos(id, editedTitle);
						setEditingId(null);
					}}
					autoFocus
				/>
			) : (
				<p
					className={styles.todos__title}
					onDoubleClick={() => startEditing(id, title)}
				>
					{title}
				</p>
			)}

			<button
				className={styles.todos__btn}
				onClick={() => deleteTodos(id)}
				disabled={completed}
			>
				{completed ? "Выполнено" : "Удалить"}
			</button>
		</li>
	);
};
