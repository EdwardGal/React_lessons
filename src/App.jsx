import { useEffect, useState } from "react";
import styles from "./app.module.css";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const App = () => {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		fetch(`${BASE_URL}/todos`)
			.then((response) => response.json())
			.then((data) => setTodos(data.slice(0, 10)));
	}, []);

	return (
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
	);
};
