import { use, useState } from "react";
import { Button } from "../../../button/Button";
import styles from "../../controlpanel.module.scss";
import { TodosContext } from "../../../../context/todosContext";

export const CreateTodo = () => {
	const [newTodoTitle, setNewTodoTitle] = useState("");
	const { handleCreate } = use(TodosContext);

	const onChangeHandler = ({ target }) => setNewTodoTitle(target.value);
	const onClickHandler = () => {
		handleCreate(newTodoTitle);
		setNewTodoTitle("");
	};

	return (
		<div
			className={`${styles["todos__control-panel-input"]} ${styles["todos__control-panel-input_create"]}`}
		>
			<input
				type="text"
				value={newTodoTitle}
				placeholder="Введите название задачи"
				onChange={onChangeHandler}
			/>
			<Button onClick={onClickHandler}>✚</Button>
		</div>
	);
};
