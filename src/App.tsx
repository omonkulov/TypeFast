import React, { ReactElement } from "react";
import { UserTextBox } from "./components/UserTextBox";
import { useState, useEffect } from "react";
import useKeyPress from "./hooks/useKeyPress";

function App() {
	const [noteToType, setNoteToType] = useState<null | string>(null);
	const [currentChar, setCurrentChar] = useState<number>(0);

	useKeyPress({
		callback: (key: string) => {
			console.log(key);
		},
	});

	useEffect(() => {
		console.log(noteToType);
	}, [noteToType]);

	const mapNote = (): null | Array<ReactElement> => {
		if (!noteToType) return null;
		let arr = noteToType.split("").map((letter, i) => {
			return (
				<span
					key={i}
					className={`${
						currentChar === i
							? "current"
							: currentChar >= i
							? "past"
							: currentChar <= i
							? "incoming"
							: null
					}`}
				>
					{letter}
				</span>
			);
		});
		return arr;
	};
	return (
		<div className="App">
			<UserTextBox setTypeText={setNoteToType} />
			{mapNote()}
			<button onClick={() => setCurrentChar((prev) => prev + 1)}>Change</button>
		</div>
	);
}

export default App;
