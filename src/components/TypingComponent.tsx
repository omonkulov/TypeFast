import React from "react";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import useKeyPress from "../hooks/useKeyPress";

interface Args {
	wordsArr: Array<Array<string>>;
	numOfChars: number;
}

export const TypingComponent: React.FC<Args> = ({ wordsArr, numOfChars }) => {
	const letterSpanRef = useRef<HTMLSpanElement>(null);
	const cursor = useRef<HTMLDivElement>(null);
	const [currentLetter, setCurrentLetter] = useState<number>(0);
	const [numOfWordsTyped, setNumOfWordsTyped] = useState<number>(0);
	const [numOfLettersTyped, setNumOfLettersTyped] = useState<number>(0);
	const [pressedKeys, setPressedKeys] = useState<any>([]);
	const [disposalWordArr, setDisposalWordArr] = useState<Array<Array<string>>>(
		[]
	);

	useLayoutEffect(() => {
		console.log(
			letterSpanRef.current?.offsetTop,
			letterSpanRef.current?.offsetLeft
		);
		cursor.current?.setAttribute(
			"style",
			`position: absolute; top: ${letterSpanRef.current?.offsetTop}px; left: ${letterSpanRef.current?.offsetLeft}px;`
		);
	}, [currentLetter]);

	useEffect(() => {
		setDisposalWordArr([...wordsArr]);
	}, [wordsArr]);

	useEffect(() => {
		if (disposalWordArr[0] && disposalWordArr[0].length === numOfLettersTyped) {
			setNumOfWordsTyped((prev) => prev + 1);
			let a = disposalWordArr;
			a.shift();
			setDisposalWordArr(a);
			setNumOfLettersTyped(0);
			if (a.length === 0) {
				console.log("GAME OVER");
				setDisposalWordArr([...wordsArr]);
				setCurrentLetter(0);
				setNumOfLettersTyped(0);
				setNumOfWordsTyped(0);
				setPressedKeys([]);
			}
		}
	}, [disposalWordArr, numOfLettersTyped, currentLetter, wordsArr]);

	//Key Press Hook
	useKeyPress((key: string) => {
		if (wordsArr[0] === undefined) return;
		if (key === " ") return;
		if (key === "Backspace") {
			let a = pressedKeys;
			a.pop();
			setPressedKeys([...a]);
			setNumOfLettersTyped((prev) => prev - 1);
			setCurrentLetter((prev) => prev - 1);
		} else {
			setNumOfLettersTyped((prev) => prev + 1);
			setCurrentLetter((prev) => prev + 1);
			let isCorrect = wordsArr[numOfWordsTyped][numOfLettersTyped] === key;
			setPressedKeys((prev: any) => [
				...prev,
				{ key: key, time: Date.now(), isCorrect: isCorrect },
			]);
		}
	});

	//Render the words array with contains array of letters
	const mapWords = () => {
		if (wordsArr.length === 0) return;
		let numOfLetters = -1;
		let words = wordsArr.map((wordArr, i) => {
			let letters = wordArr.map((letter, j) => {
				numOfLetters += 1;
				let name = "";
				let theKey = pressedKeys[numOfLetters];
				if (theKey) {
					if (theKey.isCorrect) {
						name = "correct";
					} else {
						name = "incorrect";
					}
				}

				return (
					<span
						className={`letter ${name}`}
						key={j}
						ref={numOfLetters === currentLetter ? letterSpanRef : null}
					>
						{letter}
					</span>
				);
			});
			return (
				<div key={i} className="word">
					{letters}
				</div>
			);
		});
		return words;
	};

	return (
		<div className="words-container">
			{mapWords()}
			<div className="cursor" ref={cursor}></div>
		</div>
	);
};

/**
 * When Typing
 */
