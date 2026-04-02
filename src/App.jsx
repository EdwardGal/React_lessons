import styles from "./app.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useRef, useEffect } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const schema = yup.object().shape({
  email: yup.string().matches(EMAIL_REGEX, "Некорректный email"),
  password: yup.string().matches(PASSWORD_REGEX, "Пароль должен содержать хотя бы одну латинскую букву, цифру и быть не менее 8 символов").max(16, "Пароль должен содержать не более 16 символов"),
  confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Пароли не совпадают"),
});

export const App = () => {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: initialState,
  });

  const buttonRef = useRef(null);

  useEffect(() => {
    if (isValid) {
      buttonRef.current?.focus();
    }
  }, [isValid]);

  const onSubmit = (formData) => {
    console.log(formData);
    reset();
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {Object.values(errors)?.map((err) =>
        <div key={err.message} className={styles.form__error}>
          {err.message}
        </div>
      )}
      <input
        className={styles.form__input}
        type="email"
        name="email"
        placeholder="Введите email"
        {...register("email")}
      />
      <input
        className={styles.form__input}
        type="password"
        name="password"
        placeholder="Введите пароль"
        {...register("password")}
      />
      <input
        className={styles.form__input}
        type="password"
        name="confirmPassword"
        placeholder="Подтвердите пароль"
        {...register("confirmPassword")}
      />
      <button
        ref={buttonRef}
        className={styles.form__btn}
        type="submit"
        disabled={!isValid}
      >
        Зарегистрироваться
      </button>
    </form>
  );
};
