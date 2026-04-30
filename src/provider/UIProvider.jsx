import { useState, useContext } from "react";
import { UIContext } from "../context/uiContext";
import { useDebounce } from "@uidotdev/usehooks";

export const useUI = () => {
	const context = useContext(UIContext);
	if (!context) {
		throw new Error("useUI must be used within UIProvider");
	}
	return context;
};

export const UIProvider = ({ children }) => {
	const [searchPhrase, setSearchPhrase] = useState("");
	const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

	const debouncedSearchTerm = useDebounce(searchPhrase, 500);

	return (
		<UIContext
			value={{
				searchPhrase,
				setSearchPhrase,
				isAlphabetSorting,
				setIsAlphabetSorting,
				debouncedSearchTerm,
			}}
		>
			{children}
		</UIContext>
	);
};
