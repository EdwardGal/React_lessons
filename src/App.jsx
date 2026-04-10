import { useEffect } from "react";
import styles from "./app.module.css";
import { AddTodos } from "./components/AddTodos";
import { SearchTodos } from "./components/SearchTodos";
import { SortedTodos } from "./components/SortedTodos";
import { TodoItem } from "./components/TodoItem";
import { useTodos } from "./hooks/use-todos";

export const App = () => {
	const {
		todos,
		isLoading,
		error,
		getTodos,
		addTodos,
		updateTodos,
		deleteTodos,
		sortTodos,
		serchTodos,
	} = useTodos();

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<>
			{isLoading && <div className={styles.todos__loader}></div>}
			{error && <div className={styles.todos__error}>{error}</div>}
			<div className={styles.todos}>
				<div className={styles.todos__actions}>
					<AddTodos addTodos={addTodos} />
					<SearchTodos serchTodos={serchTodos} />
					<SortedTodos sortTodos={sortTodos} />
				</div>
				<ul className={styles.todos__list}>
					{todos.length
						? todos.map((todo) => (
								<TodoItem
									key={todo.id}
									{...todo}
									updateTodos={updateTodos}
									deleteTodos={deleteTodos}
								/>
							))
						: "Список задач пуст"}
				</ul>
			</div>
		</>
	);
};
