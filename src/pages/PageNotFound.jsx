import { Link } from "react-router-dom";

export const PageNotFound = () => {
	return (
		<>
			<Link to="/">← Вернуться на главную</Link>
			<div>Такая страница не существует</div>
		</>
	);
};
