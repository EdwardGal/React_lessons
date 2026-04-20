import { BASE_URL, HTTP_METHOD } from "../constants";

const fetchData = (method, { id, ...payload } = {}) => {
	let url = `${BASE_URL}/todos`;
	let options = {
		method,
		headers: { "Content-Type": "application/json" },
	};

	if (method === HTTP_METHOD.GET) {
		const { searchPhrase, isAlphabetSorting } = payload;
		const sortingParams = isAlphabetSorting
			? "_sort=title&_order=asc"
			: "_sort=id&_order=desc";
		url += `?${sortingParams}&title_like=${searchPhrase}`;
	} else {
		if (method !== HTTP_METHOD.POST) {
			url += `/${id}`;
		}

		if (method !== HTTP_METHOD.DELETE) {
			options.body = JSON.stringify(payload);
		}
	}

	return fetch(url, options).then((response) => response.json());
};

export const createTodos = (newTodo) => fetchData("POST", newTodo);
export const readTodos = (searchPhrase = "", isAlphabetSorting = false) =>
	fetchData("GET", { searchPhrase, isAlphabetSorting });
export const updateTodos = (updatedTodo) => fetchData("PATCH", updatedTodo);
export const deleteTodos = (id) => fetchData("DELETE", { id });
