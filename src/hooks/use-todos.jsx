import { useState, useEffect } from "react";
import { BASE_URL } from "../constants";

const checkResponseStatus = async (response) => {
	if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
	return response.json();
};

export const useTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const getTodos = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(`${BASE_URL}/todos`);
			const data = await checkResponseStatus(response);
			setTodos(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getTodos();
	}, []);

	const addTodos = async (newTodo) => {
		if (!newTodo) return;

		try {
			const response = await fetch(`${BASE_URL}/todos`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					title: newTodo,
					completed: false,
				}),
			});

			const data = await checkResponseStatus(response);
			setTodos((prev) => [...prev, data]);
		} catch (error) {
			setError(error.message);
		}
	};

	const updateTodos = async (id, value) => {
		const updatedItem =
			typeof value === "boolean"
				? { completed: !value }
				: { title: value };

		try {
			const response = await fetch(`${BASE_URL}/todos/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedItem),
			});

			const data = await checkResponseStatus(response);

			setTodos((prev) =>
				prev.map((todo) =>
					todo.id === id ? { ...todo, ...data } : todo,
				),
			);
		} catch (error) {
			setError(error.message);
		}
	};

	const deleteTodos = async (id) => {
		try {
			const response = await fetch(`${BASE_URL}/todos/${id}`, {
				method: "DELETE",
			});

			await checkResponseStatus(response);

			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (error) {
			setError(error.message);
		}
	};

	const sortTodos = async () => {
		try {
			const response = await fetch(`${BASE_URL}/todos?_sort=title`);
			const data = await checkResponseStatus(response);
			setTodos(data);
		} catch (error) {
			setError(error.message);
		}
	};

	const searchTodos = async (text) => {
		let url = !text
			? `${BASE_URL}/todos`
			: `${BASE_URL}/todos?title=${text}`;

		try {
			const response = await fetch(url);
			const data = await checkResponseStatus(response);
			setTodos(data);
		} catch (error) {
			setError(error.message);
		}
	};

	return {
		todos,
		isLoading,
		error,
		addTodos,
		updateTodos,
		deleteTodos,
		sortTodos,
		searchTodos,
	};
};
