import { useEffect, useState } from "react";
import {
	ref,
	onValue,
	get,
	push,
	update,
	remove,
	query,
	orderByChild,
	startAt,
	endAt,
} from "firebase/database";
import { db } from "../firebase";

const dbREfHandler = (url) => {
	const todosDbRef = ref(db, url);
	return todosDbRef;
};


export const useTodos = () => {
	const [todos, setTodos] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		return onValue(dbREfHandler("todos"), (snapshot) => {
			const data = snapshot.val() || {};
			const loadedTodos = Object.entries(data);

			setTodos(loadedTodos);
			setIsLoading(false);
		});
	}, []);

	const addTodos = (newTodo) => {
		if (!newTodo) return;
		push(dbREfHandler("todos"), {
			title: newTodo,
			completed: false,
		});
	};

	const updateTodos = (id, value) => {
		const updatedItem =
			typeof value === "boolean"
				? { completed: Boolean(!value) }
				: { title: value };

		update(dbREfHandler(`todos/${id}`), updatedItem);
	};

	const deleteTodos = (id) => {
		remove(dbREfHandler(`todos/${id}`))
	};

	const sortTodos = async () => {
		const q = query(dbREfHandler("todos"), orderByChild("title"));
		const snapshot = await get(q);
		const loadedTodos = [];
		snapshot.forEach((child) => {
			loadedTodos.push([child.key, child.val()]);
		});

		setTodos(loadedTodos);
	};

	const searchTodos = async (text) => {
		const q = query(
			dbREfHandler("todos"),
			orderByChild("title"),
			startAt(text),
			endAt(text + "\uf8ff"),
		);

		const snapshot = await get(q);

		const results = [];

		snapshot.forEach((child) => {
			results.push({ id: child.key, ...child.val() });
		});

		setTodos(Object.entries(results));
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
