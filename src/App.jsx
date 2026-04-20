import { useEffect, useState } from "react";
import styles from "./app.module.css";
import { ControlPanel, Todo } from "./components";
import { createTodos, readTodos, updateTodos, deleteTodos } from "./api";
import { addTodo, saveTodo, deleteTodo } from "./utils";

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchPhrase, setSearchPhrase] = useState("");
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

	useEffect(() => {
		setIsLoading(false);
		readTodos()
			.then((data) => setTodos(data))
			.catch((error) => setError(error.message))
			.finally(() => setIsLoading(false));
	}, []);

	const onCreateTodos = (newTodo) => {
		createTodos(newTodo).then((data) => setTodos(addTodo(todos, data)));
	};

	const onUpdateTodos = (updatedTodo) => {
		updateTodos(updatedTodo).then((data) =>
			setTodos(saveTodo(todos, data)),
		);
	};

	const onDeleteTodos = (id) => {
		deleteTodos(id).then(() => setTodos(deleteTodo(todos, id)));
	};

	useEffect(() => {
		readTodos(searchPhrase, isAlphabetSorting).then((loadedTodos) =>
			setTodos(loadedTodos),
		);
	}, [searchPhrase, isAlphabetSorting]);

	return (
		<>
			{error && <div className={styles.todos__error}>{error}</div>}
			<div className={styles.todos}>
				<ControlPanel
					onCreate={onCreateTodos}
					onSearch={setSearchPhrase}
					onSorting={setIsAlphabetSorting}
				/>
				{isLoading ? (
					<div className={styles.todos__loader}></div>
				) : (
					<ul className={styles.todos__list}>
						{todos.length
							? todos.map(({ id, ...rest }) => (
									<Todo
										key={id}
										{...rest}
										id={id}
										onUpdate={onUpdateTodos}
										onDelete={onDeleteTodos}
									/>
								))
							: "Список задач пуст"}
					</ul>
				)}
			</div>
		</>
	);
};
