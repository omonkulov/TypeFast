import { useState, useEffect } from "react";

const useKeyPress = (callback: (key: string) => void) => {
	const [keyPressed, setKeyPressed] = useState<null | string>(null);

	useEffect(() => {
		const downHandler = ({ key }: KeyboardEvent): void => {
			if ((keyPressed !== key && key.length === 1) || key === "Backspace") {
				setKeyPressed(key);
				callback(key);
			}
		};

		const upHandler = () => {
			setKeyPressed(null);
		};

		window.addEventListener("keydown", downHandler);
		window.addEventListener("keyup", upHandler);

		return () => {
			window.removeEventListener("keydown", downHandler);
			window.removeEventListener("keyup", upHandler);
		};
	});

	return keyPressed;
};

export default useKeyPress;
