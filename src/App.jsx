import styles from "./app.module.css";
import { useState, useRef, useEffect } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const App = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);
  const buttonRef = useRef(null);



  const isFormValid = !error && formData.email &&
    formData.password &&
    formData.confirmPassword === formData.password


  useEffect(() => {
    if (isFormValid) {
      buttonRef.current.focus();
    }
  }, [isFormValid]);



  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    setError(null);
    setFormData(initialState);
  }

  const onChangeHandler = ({ target }) => {
    const { name, value } = target;
    setFormData(prev => ({ ...prev, [name]: value }));

    let errorMessage = null;

    if (name === "email" && !EMAIL_REGEX.test(value)) {
      errorMessage = "Некорректный email";
    }

    if (name === "password") {
      if (!PASSWORD_REGEX.test(value)) {
        errorMessage = "Пароль должен содержать хотя бы одну латинскую букву, цифру и быть не менее 8 символов";
      } else if (
        formData.confirmPassword &&
        value !== formData.confirmPassword
      ) {
        errorMessage = "Пароли не совпадают";
      }
    }
    if (name === "confirmPassword" && value !== formData.password) {
      errorMessage = "Пароли не совпадают";
    }

    setError(errorMessage);
  };



  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      {error && <div className={styles.form__error}>{error}</div>}
      <input
        className={styles.form__input}
        type="email"
        name="email"
        value={formData.email}
        placeholder="Введите email"
        onChange={onChangeHandler}
      />
      <input
        className={styles.form__input}
        type="password"
        name="password"
        value={formData.password}
        placeholder="Введите пароль"
        onChange={onChangeHandler}
      />
      <input
        className={styles.form__input}
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        placeholder="Подтвердите пароль"
        onChange={onChangeHandler}
      />
      <button
        ref={buttonRef}
        className={styles.form__btn}
        type="submit"
        disabled={!isFormValid}
      >
        Зарегистрироваться
      </button>
    </form>
  );
};
