import React from "react";
import { useRef } from "react";

interface Props {
	setTypeText: React.Dispatch<React.SetStateAction<null | string>>;
}

export const UserTextBox: React.FC<Props> = ({ setTypeText }) => {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const submitHandler = () => {
		if (textAreaRef && textAreaRef.current) {
			let arr = [];
			for (let i = 0; i < textAreaRef.current.value.length; i++) {
				let isWordStart = false;
				let isWordEnd = false;
				if (i === 0 || textAreaRef.current.value[i - 1] === " ")
					isWordStart = true;
				if (
					i + 1 >= textAreaRef.current.value.length ||
					textAreaRef.current.value[i + 1] === " "
				)
					isWordEnd = true;

				arr.push({
					key: textAreaRef.current.value[i],
					wordStart: isWordStart,
					wordEnd: isWordEnd,
				});
			}
			console.log(arr);

			setTypeText(textAreaRef.current.value);
		}
	};
	return (
		<div>
			<textarea ref={textAreaRef} />
			<button onClick={submitHandler}>Submit</button>
		</div>
	);
};
