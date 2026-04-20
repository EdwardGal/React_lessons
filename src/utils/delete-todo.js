export const deleteTodo = (todos, todoId) =>
	todos.filter((todo) => todo.id !== todoId);
