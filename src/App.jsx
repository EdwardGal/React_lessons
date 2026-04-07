import { useEffect, useState } from "react";
import styles from "./app.module.css";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const App = () => {
	const [todos, setTodos] = useState([]);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch(`${BASE_URL}/todos`)
			.then((response) => {
				if (!response.ok) throw new Error("Ошибка загрузки");
				return response.json();
			})
			.then((data) => setTodos(data.slice(0, 10)))
			.catch((error) => setError(error.message))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<>
			{isLoading && (
				<div className={styles.todos__loader}></div>
			)}

			{error && !isLoading && (
				<div className={styles.todos__error}>{error}</div>
			)}

			{!isLoading && !error && (
				<ul className={styles.todos}>
					{todos.map(({ id, title, completed }) => (
						<li className={styles.todos__item} key={id}>
							<input
								className={styles.todos__input}
								type="checkbox"
								checked={completed}
								readOnly
							/>
							<p className={styles.todos__title}>{title}</p>
						</li>
					))}
				</ul>
			)}
		</>
	);
};
