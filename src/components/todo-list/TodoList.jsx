import { use } from "react";
import styles from "./todolist.module.scss";
import { Todo } from "./components/todo";
import { TodosContext } from "../../context/todosContext";
import { useUI } from "../../provider/UIProvider";

export const TodosList = () => {
	const { todos } = use(TodosContext);
	const { searchPhrase, isAlphabetSorting } = useUI();

	return (
		<ul className={styles.todos__list}>
			{todos.length
				? todos.map(({ id, title, completed }) => (
						<Todo
							key={id}
							id={id}
							title={title}
							completed={completed}
						/>
					))
				: "Список задач пуст"}
		</ul>
	);
};
