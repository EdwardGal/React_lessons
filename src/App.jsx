import { useState } from "react";
import styles from "./app.module.css";

export const App = () => {
	const [operand1, setOperand1] = useState("");
	const [operator, setOperator] = useState("");
	const [operand2, setOperand2] = useState("");
	const [sum, setSum] = useState(null);
	const [isSecondOperand, setIsSecondOperand] = useState(false);

	const NUMS = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0"];
	const SYMBOLS = ["C", "+", "-", "="];

	const checkSymbolOnEquals = operator === "=";

	const calcSum = (currentOperator) => {
		const oper1 = Number(operand1);
		const oper2 = Number(operand2);

		switch (currentOperator) {
			case "+":
				setSum(oper1 + oper2);
				break;
			case "-":
				setSum(oper1 - oper2);
				break;
			default:
				break;
		}
	};

	const onDigitHandler = (digit) => {
		if (!isSecondOperand) {
			setOperand1((prev) => prev + digit);
		} else {
			setOperand2((prev) => prev + digit);
		}
	};

	const onSymbolHandler = (symbol) => {
		if (!operand1) return;

		if (symbol === "C") {
			setOperand1("");
			setOperand2("");
			setOperator("");
			setSum(null);
			setIsSecondOperand(false);
			return;
		}

		if (symbol === "=") {
			if (!operand2) return;
			calcSum(operator);
			setOperator(symbol);
			setIsSecondOperand(false);
			return;
		}

		if (sum !== null) {
			setOperand1(sum);
			setOperand2("");
			setSum(null);
		}

		setOperator(symbol);
		setIsSecondOperand(true);
	};

	return (
		<div className={styles.calculator}>
			<div className={styles.calculator__content}>
				<div className={styles.calculator__screen}>
					<span
						className={`${styles["calculator__screen-count"]} ${
							checkSymbolOnEquals ? styles.active : ""
						}`}
					>
						{checkSymbolOnEquals
							? sum
							: operand1 + operator + operand2}
					</span>
				</div>

				<div className={styles.calculator__inner}>
					<div className={styles.calculator__nums}>
						{NUMS.map((item) => (
							<div
								className={styles.calculator__item}
								key={item}
								onClick={() => onDigitHandler(item)}
							>
								{item}
							</div>
						))}
					</div>

					<div className={styles.calculator__symbols}>
						{SYMBOLS.map((item) => (
							<div
								className={styles.calculator__item}
								key={item}
								onClick={() => onSymbolHandler(item)}
							>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};
