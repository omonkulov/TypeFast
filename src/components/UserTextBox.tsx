import React from "react";
import { useRef } from "react";

interface Props {
	setWordsArr: React.Dispatch<React.SetStateAction<Array<Array<string>>>>;
	setNumOfChars: React.Dispatch<React.SetStateAction<number>>;
}

export const UserTextBox: React.FC<Props> = ({
	setWordsArr,
	setNumOfChars,
}) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const submitHandler = () => {
		if (textAreaRef && textAreaRef.current) {
			let charsCount = 0;
			let wordArr =
				"is great if that's exactly what you want. But if you're using this in an"
					.replace(/(\r\n|\n|\r)/gm, " ")
					.replace(/[^a-z0-9 _-]/gi, "")
					.split(" ");
			//Removes elements that is empy string
			wordArr = wordArr.filter((word) => word !== "");
			let lettersArr = [];
			for (let i = 0; i < wordArr.length; i++) {
				charsCount = wordArr[i].length;
				lettersArr.push(wordArr[i].split(""));
			}
			setWordsArr(lettersArr);
			setNumOfChars(charsCount);
		}
	};
	return (
		<div>
			<textarea ref={textAreaRef} />
			<button onClick={submitHandler}>Submit</button>
		</div>
	);
};
