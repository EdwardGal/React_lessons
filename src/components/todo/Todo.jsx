import { useState } from "react";
import styles from "../../app.module.css";
import { Button } from "../button/Button";

export const Todo = ({ id, completed, title, onUpdate, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newTitle, setNewTitle] = useState(title);
	const [newCompleted, setNewCompleted] = useState(completed);

	return (
		<li className={styles.todos__item}>
			<input
				className={styles.todos__checkbox}
				type="checkbox"
				checked={newCompleted}
				onChange={() => {
					setNewCompleted((prev) => {
						const update = !prev;
						onUpdate({
							id,
							completed: update,
						});

						return update;
					});
				}}
			/>

			{isEditing ? (
				<input
					className={styles["todos__title-input"]}
					type="text"
					value={newTitle}
					onChange={({ target }) => setNewTitle(target.value)}
				/>
			) : (
				<div
					className={styles.todos__title}
					onDoubleClick={() => setIsEditing(true)}
				>
					{newTitle}
				</div>
			)}
				{isEditing ? (
					<Button
						onClick={() => {
							onUpdate({ id, title: newTitle });
							setIsEditing(false);
						}}
					>
						✎
					</Button>
				) : (
					<Button onClick={() => onDelete(id)}>✖</Button>
				)}

		</li>
	);
};
