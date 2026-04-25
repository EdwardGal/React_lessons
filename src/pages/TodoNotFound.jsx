import { Link } from "react-router-dom";

export const TodoNotFound = () => {
	return (
		<>
			<Link to="/">← Вернуться на главную</Link>
			<div>Такой задачи не существует</div>
		</>
	);
};
