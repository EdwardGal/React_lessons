import { useRef, useState } from "react";
import styles from "./app.module.css";

const EMAIL_REGEX =
	/^(?!.*\.\.)([A-Za-z0-9._%+-]+)@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/;
const PASSWORD_REGEX = /^[A-Za-z0-9]+$/;

const initialFormData = {
	email: "",
	password: "",
	confirmPassword: "",
};

export const App = () => {
	const [formData, setFormData] = useState(initialFormData);

	const [error, setError] = useState(null);

	const emailRef = useRef(null);
	const passwordRef = useRef(null);
	const confirmPasswordRef = useRef(null);

	const hasEmptyField = Object.values(formData).some((value) => value === "");

	const formReset = () => {
		setFormData(initialFormData);
	};

	const errorAndFocusHandler = (message, ref) => {
		setError(message);
		ref.current.focus();
	};

	const onSubmit = (e) => {
		e.preventDefault();
		setError(null);

		if (!EMAIL_REGEX.test(formData.email)) {
			errorAndFocusHandler("Некорректно введен email", emailRef);
			return;
		}

		if (!PASSWORD_REGEX.test(formData.password)) {
			errorAndFocusHandler(
				"Пароль должен содержать только цифры и буквы",
				passwordRef,
			);
			return;
		}
		if (formData.password.length < 4) {
			errorAndFocusHandler(
				"Длина пароля должна быть больше 3 символов",
				passwordRef,
			);
			return;
		}

		if (formData.password !== formData.confirmPassword) {
			errorAndFocusHandler("Пароли не совпадают", confirmPasswordRef);
			return;
		}

		console.log(formData);

		formReset();
	};

	const onChangeHandler = ({ target }) => {
		const { name, value } = target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<form className={styles.form} onSubmit={onSubmit}>
			{error && <div className={styles.form__error}>{error}</div>}
			<input
				ref={emailRef}
				type="email"
				placeholder="Введите Ваш email"
				name="email"
				value={formData.email}
				onChange={onChangeHandler}
			></input>
			<input
				ref={passwordRef}
				type="password"
				placeholder="Введите пароль"
				name="password"
				value={formData.password}
				onChange={onChangeHandler}
			></input>
			<input
				ref={confirmPasswordRef}
				type="password"
				placeholder="Подтвердите пароль"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={onChangeHandler}
			></input>
			<button type="submit" disabled={hasEmptyField}>
				Зарегистрироваться
			</button>
		</form>
	);
};
