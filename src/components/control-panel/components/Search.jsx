import { useRef, useState } from "react";
import { debounce } from "../../../utils";

export const Search = ({ onSearch }) => {
	const [value, setValue] = useState("");

	const debouncedOnSearch = useRef(debounce(onSearch, 300)).current;

	const onChange = ({ target }) => {
		setValue(target.value);
		debouncedOnSearch(target.value);
	};

	return (
		<input
			type="text"
			value={value}
			placeholder="Поиск..."
			onChange={onChange}
		/>
	);
};
