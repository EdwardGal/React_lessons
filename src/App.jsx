import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ControlPanel, Todo } from "./components";
import styles from "./app.module.scss";
import { addTodo } from "./utils";
import { createTodos, readTodos } from "./api";

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [searchPhrase, setSearchPhrase] = useState("");
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

	useEffect(() => {
		setLoading(true);
		readTodos(searchPhrase, isAlphabetSorting)
			.then(setTodos)
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, [searchPhrase, isAlphabetSorting]);

	const onCreateTodos = (newTodo) => {
		createTodos(newTodo).then((data) => {
			setTodos((prev) => addTodo(prev, data));
		});
	};

	return (
		<>
			{error && <div className={styles.todos__error}>{error}</div>}

			<div className={styles.todos}>
				<ControlPanel
					onCreate={onCreateTodos}
					onSearch={setSearchPhrase}
					onSorting={setIsAlphabetSorting}
				/>

				{loading ? (
					<div className={styles.todos__loader}></div>
				) : (
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
				)}
			</div>
		</>
	);
};
