import { useState } from "react";
import { BASE_URL } from "../constants";

const checkResponseStatus = (response) => {
	if (!response.ok) {
		throw new Error(`Ошибка: ${response.status}`);
	}

	return response;
};

export const useTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const getTodos = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(`${BASE_URL}/todos`);
			checkResponseStatus(response);

			const data = await response.json();
			setTodos(data);
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

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

			checkResponseStatus(response);

			const data = await response.json();

			setTodos((prev) => [...prev, data]);
		} catch (error) {
			setError(error.message);
		}
	};

	const updateTodos = async (id, value) => {
		const updatedItem =
			typeof value === "boolean"
				? { completed: Boolean(!value) }
				: { title: value };

		try {
			const response = await fetch(`${BASE_URL}/todos/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedItem),
			});
			checkResponseStatus(response);

			const data = await response.json();

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
			checkResponseStatus(response);

			setTodos((prev) => prev.filter((todo) => todo.id !== id));
		} catch (error) {
			setError(error.message);
		}
	};

	const sortTodos = async () => {
		try {
			const response = await fetch(`${BASE_URL}/todos?_sort=title`);
			checkResponseStatus(response);

			const data = await response.json();

			setTodos(data);
		} catch (error) {
			setError(error.message);
		}
	};

	const serchTodos = async (query) => {
		const url = query?.trim()
			? `${BASE_URL}/todos?title=${query}`
			: `${BASE_URL}/todos`;

		try {
			const response = await fetch(url);
			checkResponseStatus(response);
			const data = await response.json();

			console.log(data);

			setTodos(data);
		} catch (error) {
			console.log(error);
		}
	};

	return {
		todos,
		isLoading,
		error,
		getTodos,
		addTodos,
		updateTodos,
		deleteTodos,
		sortTodos,
		serchTodos,
	};
};
