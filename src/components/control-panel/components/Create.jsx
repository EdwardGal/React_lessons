import { useState } from "react";
import { Button } from "../../button/Button";

export const Create = ({ onCreate }) => {
	const [newTodo, setNewTodo] = useState("");

	return (
		<>
			<input
				type="text"
				value={newTodo}
				placeholder="Введите название задачи"
				onChange={({ target }) => setNewTodo(target.value)}
			/>
			<Button
				onClick={() => {
					onCreate({ title: newTodo, completed: false });
					setNewTodo("");
				}}
			>
				✚
			</Button>
		</>
	);
};
