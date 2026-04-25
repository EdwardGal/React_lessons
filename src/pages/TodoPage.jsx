import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "../components/button/Button";
import styles from "../app.module.scss";
import { TodoNotFound } from "../pages";
import { deleteTodos, getTodo, updateTodos } from "../api";

const onUpdateTodos = (updatedTodo) => updateTodos(updatedTodo);
const onDeleteTodos = (id) => deleteTodos(id);

export const TodoPage = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [todo, setTodo] = useState({});

	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		setLoading(true);
		getTodo(id)
			.then((data) => setTodo(data))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}, [id]);

	const handleUpdate = async (update) => {
		try {
			await onUpdateTodos({ id, ...update });
			setIsEditing(false);
		} catch (err) {
			setError(err);
		}
	};

	const handleDelete = async () => {
		try {
			await onDeleteTodos(id);
			navigate("/");
		} catch (err) {
			setError(err);
		}
	};

	if (error) return <TodoNotFound />;

	return (
		<>
			<Link to="/">← Вернуться на главную</Link>

			{loading ? (
				<div className={styles.todos__loader}></div>
			) : (
				<li className={styles.todo}>
					<input
						type="checkbox"
						checked={todo.completed || false}
						onChange={() => {
							const updated = !todo.completed;

							setTodo((prev) => ({
								...prev,
								completed: updated,
							}));

							handleUpdate({ completed: updated });
						}}
					/>

					{isEditing ? (
						<input
							value={todo.title || ""}
							onChange={({ target }) =>
								setTodo((prev) => ({
									...prev,
									title: target.value,
								}))
							}
						/>
					) : (
						<div onDoubleClick={() => setIsEditing(true)}>
							{todo.title}
						</div>
					)}

					{isEditing ? (
						<Button
							onClick={() =>
								handleUpdate({
									title: todo.title,
								})
							}
						>
							✎
						</Button>
					) : (
						<Button onClick={handleDelete}>✖</Button>
					)}
				</li>
			)}
		</>
	);
};
