export const saveTodo = (todos, data) =>
	todos.map((todo) => (todo.id === data.id ? { ...todo, ...data } : todo));
