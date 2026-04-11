import styles from "./app.module.css";
import { AddTodos } from "./components/AddTodos";
import { SearchTodos } from "./components/SearchTodos";
import { SortedTodos } from "./components/SortedTodos";
import { TodosItem } from "./components/TodosItem";
import { useTodos } from "./hooks/use-todos";

export const App = () => {
	const { todos, isLoading, error, ...actions } = useTodos();

	return (
		<>
			{error && <div className={styles.todos__error}>{error}</div>}
			<div className={styles.todos}>
				<div className={styles.todos__actions}>
					<AddTodos addTodos={actions.addTodos} />
					<SearchTodos serchTodos={actions.serchTodos} />
					<SortedTodos sortTodos={actions.sortTodos} />
				</div>
				{isLoading ? (
					<div className={styles.todos__loader}></div>
				) : (
					<ul className={styles.todos__list}>
						{todos.length
							? todos.map((todo) => (
									<TodosItem
										key={todo.id}
										{...todo}
										updateTodos={actions.updateTodos}
										deleteTodos={actions.deleteTodos}
									/>
								))
							: "Список задач пуст"}
					</ul>
				)}
			</div>
		</>
	);
};
