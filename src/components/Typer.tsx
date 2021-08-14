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
	const [isValidKeyPressed, setIsValidKeyPressed] = useState<boolean>(false);
	const [pressedKey, setPressedKey] = useState<string>("");

	//Once WordsArr is initialzied, create a queue
	//Then set it in worQueue State
	useEffect(() => {
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
		setWordQueue(initQueue);
	}, [wordsArr]);

	//Checks if user missed space, if yes start adding the extra characters
	useEffect(() => {
		if (
			wordQueue[numOfSpacePressed] &&
			numOfKeysPressed >= wordQueue[numOfSpacePressed].length
		) {
			console.log("Start adding characters");
			setIsSpaceMissed(true);
		}
	}, [numOfKeysPressed, numOfSpacePressed, wordQueue]);

	useEffect(() => {
		console.log(wordQueue);
	}, [wordQueue]);

	useEffect(() => {
		carotRef.current?.setAttribute(
			"style",
			`position: absolute; top: ${lettertRef.current?.offsetTop}px; left: ${lettertRef.current?.offsetLeft}px;`
		);
	}, [numOfKeysPressed]);

	//Valid Key Pressed
	useLayoutEffect(() => {
		if (isValidKeyPressed && pressedKey !== "") {
			setIsValidKeyPressed(false);
			if (wordQueue[0] === undefined) return;
			let worQueueTemp = wordQueue;
			let wordArrTemp = worQueueTemp[numOfSpacePressed];
			let letterTemp = wordArrTemp[numOfKeysPressed].letter;
			console.log(letterTemp);
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
			wordArrTemp.push({
				letter: pressedKey,
				pressedKey: pressedKey,
				pressedTime: Date.now(),
				isNext: false,
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

	useKeyPress((key: string) => {
		//Spacebar pressed
		if (key === " ") {
			setNumOfSpacePressed((prev) => prev + 1);
			setNumOfKeysPressed(0);
			setIsSpaceMissed(false);
		}
		//Backspace pressed
		else if (key === "Backspace") {
			console.log("backspace");
		} else {
			if (isSpaceMissed) {
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

				return (
					<span
						key={j}
						className={classNamesD}
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
