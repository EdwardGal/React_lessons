import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createElement, Fragment } from "react";

function App() {
	const currentYear = new Date().getFullYear();

	const logos = createElement(
		"div",
		null,
		createElement(
			"a",
			{ href: "https://vite.dev", target: "_blank" },
			createElement("img", {
				src: viteLogo,
				className: "logo",
				alt: "Vite logo",
			}),
		),
		createElement(
			"a",
			{ href: "https://react.dev", target: "_blank" },
			createElement("img", {
				src: reactLogo,
				className: "logo",
				alt: "React logo",
			}),
		),
	);

	const title = createElement("h1", null, null);

	const card = createElement(
		"div",
		{ className: "card" },
		createElement(
			"p",
			null,
			"Edit <code>src/App.jsx</code> and save to test HMR",
		),
	);

	const docs = createElement(
		"div",
		{ className: "read-the-docs" },
		"Click on the Vite and React logos to learn more",
	);

	const app = createElement(Fragment, null, [
		logos,
		title,
		currentYear,
		card,
		docs,
	]);

	return app;
}

export default App;
