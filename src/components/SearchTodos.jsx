import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const SearchTodos = ({ serchTodos }) => {
	const [value, setValue] = useState("");

	const debouncedSearch = useDebouncedCallback((val) => {
		serchTodos(val);
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
