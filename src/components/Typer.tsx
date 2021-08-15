import React from "react";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import useKeyPress from "../hooks/useKeyPress";

interface Args {
	wordsArr: Array<Array<string>>;
	numOfChars: number;
}

export const Typer: React.FC<Args> = ({ wordsArr, numOfChars }) => {
	const carotRef = useRef<HTMLDivElement>(null);
	const lettertRef = useRef<HTMLDivElement>(null);
	const [wordQueue, setWordQueue] = useState<any>([]);
	const [numOfKeysPressed, setNumOfKeysPressed] = useState<number>(0);
	const [numOfSpacePressed, setNumOfSpacePressed] = useState<number>(0);
	const [isSpaceMissed, setIsSpaceMissed] = useState<boolean>(false);
	const [isExtraKeyPressed, setIsExtraKeyPressed] = useState<boolean>(false);
	const [isDeleteKeyPressed, setIsDeleteKeyPressed] = useState<boolean>(false);
	const [isValidKeyPressed, setIsValidKeyPressed] = useState<boolean>(false);
	const [pressedKey, setPressedKey] = useState<string>("");
	const [reset, setReset] = useState<boolean>(true);

	//Reset the word queue
	useEffect(() => {
		if (reset) {
			setReset(false);
			let initQueue = [];
			if (!wordsArr[0]) return;
			for (let i = 0; i < wordsArr.length; i++) {
				const word = wordsArr[i];
				let initLetersArr = [];
				for (let j = 0; j < word.length; j++) {
					initLetersArr.push({
						letter: word[j],
						pressedKey: null,
						pressedTime: null,
						isNext: i === 0 && j === i,
						isPassed: false,
						isExtra: false,
						isCorrect: false,
					});
				}
				initQueue.push(initLetersArr);
			}
			setWordQueue([...initQueue]);
		}
	}, [wordsArr, reset, numOfKeysPressed]);

	//First time trigger reset
	useEffect(() => {
		setReset(true);
	}, [wordsArr]);

	//Checks if user missed space, if yes start adding the extra characters
	useEffect(() => {
		if (
			wordQueue[numOfSpacePressed] &&
			numOfKeysPressed >= wordQueue[numOfSpacePressed].length
		) {
			setIsSpaceMissed(true);
		}
	}, [numOfKeysPressed, numOfSpacePressed, wordQueue]);

	//Debug
	useEffect(() => {
		console.log(wordQueue);
	}, [wordQueue]);

	//Carot's position
	useEffect(() => {
		if (lettertRef.current?.className.includes("extra")) {
			carotRef.current?.setAttribute(
				"style",
				`position: absolute; top: ${lettertRef.current?.offsetTop}px; left: ${
					lettertRef.current?.offsetLeft + 8
				}px;`
			);
			return;
		}
		carotRef.current?.setAttribute(
			"style",
			`position: absolute; top: ${lettertRef.current?.offsetTop}px; left: ${lettertRef.current?.offsetLeft}px;`
		);
	}, [numOfKeysPressed, numOfSpacePressed, wordQueue]);

	//Valid Key Pressed
	useLayoutEffect(() => {
		if (isValidKeyPressed && pressedKey !== "") {
			setIsValidKeyPressed(false);
			if (wordQueue[0] === undefined) return;
			let worQueueTemp = wordQueue;
			let wordArrTemp = worQueueTemp[numOfSpacePressed];
			let letterTemp = wordArrTemp[numOfKeysPressed].letter;
			wordArrTemp[numOfKeysPressed] = {
				...wordArrTemp[numOfKeysPressed],
				pressedKey: pressedKey,
				pressedTime: Date.now(),
				isNext: false,
				isPassed: true,
				isExtra: false,
				isCorrect: letterTemp === pressedKey,
			};

			if (wordArrTemp[numOfKeysPressed + 1]) {
				wordArrTemp[numOfKeysPressed + 1] = {
					...wordArrTemp[numOfKeysPressed + 1],
					isNext: true,
				};
			}
			worQueueTemp[numOfSpacePressed] = wordArrTemp;
			setWordQueue([...worQueueTemp]);
			setNumOfKeysPressed((prev) => prev + 1);
		}
	}, [
		isValidKeyPressed,
		numOfKeysPressed,
		numOfSpacePressed,
		pressedKey,
		wordQueue,
	]);

	//Space missed, start adding chars to the word
	useLayoutEffect(() => {
		if (isSpaceMissed && isExtraKeyPressed) {
			setIsExtraKeyPressed(false);
			let worQueueTemp = wordQueue;
			let wordArrTemp = worQueueTemp[numOfSpacePressed];
			wordArrTemp[wordArrTemp.length - 1] = {
				...wordArrTemp[wordArrTemp.length - 1],
				isNext: false,
			};
			wordArrTemp.push({
				letter: pressedKey,
				pressedKey: pressedKey,
				pressedTime: Date.now(),
				isNext: true,
				isPassed: true,
				isExtra: true,
				isCorrect: false,
			});
			worQueueTemp[numOfSpacePressed] = wordArrTemp;
			setWordQueue([...worQueueTemp]);
		}
	}, [
		isSpaceMissed,
		numOfSpacePressed,
		pressedKey,
		wordQueue,
		isExtraKeyPressed,
	]);

	//Backspace pressed
	useEffect(() => {
		if (isDeleteKeyPressed) {
			if (wordQueue[0] === undefined) return;
			setIsDeleteKeyPressed(false);
			let worQueueTemp = wordQueue;
			let wordArrTemp = worQueueTemp[numOfSpacePressed];
			let lettterTemp = wordArrTemp[numOfKeysPressed];
			if (lettterTemp && !lettterTemp.isExtra) {
			}
		}
	}, [isDeleteKeyPressed, numOfKeysPressed, wordQueue, numOfSpacePressed]);

	//Check if finished
	useEffect(() => {
		if (wordQueue[0] === undefined) return;
		if (numOfSpacePressed >= wordQueue.length) {
			setReset(true);
			setNumOfSpacePressed(0);
			setNumOfKeysPressed(0);
		}
	}, [numOfSpacePressed, wordQueue]);

	//Keypress Hook
	useKeyPress((key: string) => {
		if (key === " ") {
			if (wordQueue[0] === undefined) return;
			if (numOfSpacePressed >= wordQueue.length) {
				setReset(true);
				setNumOfSpacePressed(0);
				setNumOfKeysPressed(0);
				return;
			}
			setNumOfSpacePressed((prev) => prev + 1);
			setNumOfKeysPressed(0);
			setIsSpaceMissed(false);
		} else if (key === "Backspace") {
			setIsDeleteKeyPressed(true);
		} else {
			if (isSpaceMissed) {
				setPressedKey(key);
				setIsExtraKeyPressed(true);
			} else {
				setPressedKey(key);
				setIsValidKeyPressed(true);
			}
		}
	});

	//Render the words
	const wordsMapped = () => {
		return wordQueue.map((word: any, i: number) => {
			let wordsCompArr = word.map((obj: any, j: number) => {
				let classNamesD = "letter";
				if (obj.isPassed) {
					if (obj.isCorrect) {
						classNamesD = "correct";
					} else {
						classNamesD = "incorrect";
					}
				} else if (obj.isNext) {
					classNamesD = "next";
				}
				if (obj.isExtra) {
					classNamesD += " extra";
				}

				return (
					<span
						key={j}
						className={"letter-margin " + classNamesD}
						ref={obj.isNext ? lettertRef : null}
					>
						{obj.letter}
					</span>
				);
			});
			return (
				<div className="word" key={i}>
					{wordsCompArr}
				</div>
			);
		});
	};

	return (
		<div className="words-container">
			{wordsMapped()}
			<div className="carot" ref={carotRef}></div>
		</div>
	);
};

/**
 * TODO: MAKE BACKSPACE WORK
 * TODO: MAKE CAROT MOVE TO THE LEFT OF THE LAST CHARACTER IN THE WORD, INSTEAD OF TELEPORTING TO THE BEGINNING
 * TODO: PUT WORD COUNTER
 */
