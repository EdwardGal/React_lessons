import { createBrowserRouter } from "react-router-dom";
import { TodoPage, PageNotFound, TodoNotFound } from "./pages";
import { App } from "./App";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <PageNotFound />,
	},
	{
		path: "/todo/:id",
		element: <TodoPage />,
		errorElement: <TodoNotFound />,
	},
]);
