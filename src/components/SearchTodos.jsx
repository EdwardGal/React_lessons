import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const SearchTodos = ({ searchTodos }) => {
	const [value, setValue] = useState("");

	const debouncedSearch = useDebouncedCallback((val) => {
		searchTodos(val);
	}, 500);

	const handleChange = ({ target }) => {
		const val = target.value;
		setValue(val);
		debouncedSearch(val);
	};

	return (
		<input
			type="search"
			value={value}
			onChange={handleChange}
			placeholder="Поиск..."
		/>
	);
};
