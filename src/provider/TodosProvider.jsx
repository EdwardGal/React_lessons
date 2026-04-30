import { useContext, useEffect, useState } from "react";
import { readTodos, createTodos, updateTodos, deleteTodos } from "../api";
import { addTodo, saveTodo, deleteTodo } from "../utils";
import { TodosContext } from "../context/todosContext";
import { useUI } from "./UIProvider";

export const useTodos = () => {
	const context = useContext(TodosContext);
	if (!context) {
		throw new Error("useTodos must be used within TodosProvider");
	}
	return context;
};

export const TodosProvider = ({ children }) => {
	const { debouncedSearchTerm, isAlphabetSorting } = useUI();
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const handleCreate = (title) => {
		const newTodo = { title, completed: false };

		createTodos(newTodo).then((data) => {
			setTodos((prev) => addTodo(prev, data));
		});
	};

	const handleUpdate = (updatedTodo) => {
		updateTodos(updatedTodo).then((data) => {
			setTodos((prev) => saveTodo(prev, data));
		});
	};

	const handleDelete = (id) => {
		deleteTodos(id).then(() => {
			setTodos((prev) => deleteTodo(prev, id));
		});
	};

	useEffect(() => {
		setIsLoading(true);
		readTodos(debouncedSearchTerm, isAlphabetSorting)
			.then(setTodos)
			.catch((error) => setError(error.message))
			.finally(() => setIsLoading(false));
	}, [debouncedSearchTerm, isAlphabetSorting]);

	return (
		<TodosContext
			value={{
				todos,
				isLoading,
				error,
				handleCreate,
				handleUpdate,
				handleDelete,
			}}
		>
			{children}
		</TodosContext>
	);
};
