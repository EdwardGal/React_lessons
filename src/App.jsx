import { useState } from "react";
import styles from "./app.module.css";
import data from "./data.json";

export const App = () => {
	const steps = data;
	const [activeIndex, setActiveIndex] = useState(0);
	const lastIndex = steps.length - 1;

	const clickOnButtonNext = () => {
		if (activeIndex === lastIndex) {
			setActiveIndex(0);
			return;
		}
		setActiveIndex(activeIndex + 1);
	};

	const clickOnButtonPrev = () => {
		if (activeIndex > 0) {
			setActiveIndex(activeIndex - 1);
		}
	};

	const clickOnButtonStep = (stepIndex) => {
		setActiveIndex(stepIndex);
	};

	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<h1>Инструкция по готовке пельменей</h1>
				<div className={styles.steps}>
					<div className={styles["steps-content"]}>
						{steps[activeIndex]?.content}
					</div>
					<ul className={styles["steps-list"]}>
						{steps.map((step, stepIndex) => (
							<li
								className={`
									${styles["steps-item"]}
									${stepIndex < activeIndex ? styles.done : ""}
									${stepIndex === activeIndex ? styles.active : ""}
								`}
								key={step.id}
							>
								<button
									className={styles["steps-item-button"]}
									onClick={() => clickOnButtonStep(stepIndex)}
								>
									{stepIndex + 1}
								</button>
								{step.title}
							</li>
						))}
					</ul>
					<div className={styles["buttons-container"]}>
						<button
							className={styles.button}
							onClick={clickOnButtonPrev}
							disabled={activeIndex === 0}
						>
							Назад
						</button>
						<button
							className={styles.button}
							onClick={clickOnButtonNext}
						>
							{activeIndex < lastIndex
								? "Далее"
								: "Начать сначала"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
