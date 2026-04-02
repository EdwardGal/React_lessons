import styles from "./app.module.css";
import { useState, useRef, useEffect } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const useStore = () => {
  const [state, setState] = useState(initialState);
  return {
    getState: () => state,
    updateState: (fieldName, newValue) => setState(newState => ({ ...newState, [fieldName]: newValue })),
    resetState: () => setState(initialState),
  }
}

const sendData = (data) => {
  console.log(data);
}

export const App = () => {
  const { getState, updateState, resetState } = useStore();
  const [error, setError] = useState(null);
  const buttonRef = useRef(null);

  const { email, password, confirmPassword } = getState();

  const isFormValid = !error && email &&
    password && confirmPassword === password

  useEffect(() => {
    if (isFormValid) {
      buttonRef.current?.focus();
    }
  }, [isFormValid]);


  const onChangeHandler = ({ target }) => {
    const { name, value } = target;
    updateState(name, value);

    let errorMessage = null;

    if (name === "email" && !EMAIL_REGEX.test(value)) {
      errorMessage = "Некорректный email";
    }

    if (name === "password") {
      if (!PASSWORD_REGEX.test(value)) {
        errorMessage = "Пароль должен содержать хотя бы одну латинскую букву, цифру и быть не менее 8 символов";
      } else if (
        confirmPassword &&
        value !== confirmPassword
      ) {
        errorMessage = "Пароли не совпадают";
      }
    }
    if (name === "confirmPassword" && value !== password) {
      errorMessage = "Пароли не совпадают";
    }

    setError(errorMessage);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    sendData(getState())
    resetState()
    setError(null);
  }

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      {error && <div className={styles.form__error}>{error}</div>}
      <input
        className={styles.form__input}
        type="email"
        name="email"
        value={email}
        placeholder="Введите email"
        onChange={onChangeHandler}
      />
      <input
        className={styles.form__input}
        type="password"
        name="password"
        value={password}
        placeholder="Введите пароль"
        onChange={onChangeHandler}
      />
      <input
        className={styles.form__input}
        type="password"
        name="confirmPassword"
        value={confirmPassword}
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
