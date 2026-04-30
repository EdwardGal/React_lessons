import { use, useState } from "react";
import styles from "./todo.module.scss";
import { Button } from "../../../button/Button";
import { TodosContext } from "../../../../context/todosContext";

export const Todo = ({ id, title, completed }) => {
	const { handleUpdate, handleDelete } = use(TodosContext);

	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(title);
	const [newCompleted, setNewCompleted] = useState(completed);

	const onChangeHandler = ({ target }) => {
		const elemType = target.type;
		if (elemType === "checkbox") {
			const checked = target.checked;
			setNewCompleted(checked);
			handleUpdate({
				id,
				completed: checked,
			});
		} else {
			handleUpdate({ id, title: newTitle });
			setIsEditing(false);
		}
	};

	return (
		<li className={styles.todo}>
			<input
				className={styles.todo__checkbox}
				type="checkbox"
				checked={newCompleted}
				onChange={onChangeHandler}
			/>

			{isEditing ? (
				<input
					className={styles["todo__title-input"]}
					type="text"
					value={newTitle}
					onChange={({ target }) => setNewTitle(target.value)}
				/>
			) : (
				<div
					className={styles.todo__title}
					onDoubleClick={() => setIsEditing(true)}
				>
					{newTitle}
				</div>
			)}
			{isEditing ? (
				<Button onClick={onChangeHandler}>✎</Button>
			) : (
				<Button onClick={() => handleDelete(id)}>✖</Button>
			)}
		</li>
	);
};
