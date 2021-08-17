import React from "react";
import { useState, useRef, useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import useTyping from "react-typing-game-hook-v2";

const CaretSpan = styled.span`
	border-left: 0.2rem solid ${(props) => props.theme.main};
`;
const InputFieldDiv = styled.div`
	background-color: ${(props) => props.theme.foreground};
	width: 50rem;
	height: 50vh;
	margin: 2rem auto;
	padding: 1rem;
	transition: all 0.3s;
	font-size: 2rem;
	font-family: Consolas;
	outline: none;
	position: relative;
	&:focus {
		outline: none;
		background-color: ${(props) => props.theme.background};
	}
`;

const TitleP = styled.p`
	font-size: 2.2rem;
	margin: 10px 0px;
	text-align: center;
	color: ${(props) => props.theme.correct};
`;

interface Props {
	note: {
		title: string;
		body: string;
	};
}

export const Typer: React.FC<Props> = ({ note }) => {
	const [isFocused, setIsFocused] = useState(false);
	const letterElements = useRef<HTMLDivElement>(null);
	const themeContext = useContext(ThemeContext);
	const {
		states: { charsState, currIndex },
		actions: { insertTyping, deleteTyping, resetTyping },
	} = useTyping(note.body, { skipCurrentWordOnSpace: true, pauseOnError: false });

	//handle key presses
	const handleKeyDown = (letter: string, control: boolean) => {
		if (letter === "Escape") {
			resetTyping();
		} else if (letter === "Backspace") {
			deleteTyping(control);
		} else if (letter.length === 1) {
			insertTyping(letter);
		}
	};

	return (
		<div>
			<TitleP>{note.title}</TitleP>
			<InputFieldDiv
				ref={letterElements}
				onKeyDown={(e) => handleKeyDown(e.key, e.ctrlKey)}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				tabIndex={0}
			>
				{note.body.split("").map((char: string, index: number) => {
					let state = charsState[index];
					let color =
						state === 0 ? themeContext.utyped : state === 1 ? themeContext.correct : themeContext.wrong;
					let backgroundcolor = state === 2 && char === " " ? themeContext.wrong : "";
					return (
						<CaretSpan
							key={char + index}
							style={{
								color: color,
								backgroundColor: backgroundcolor,
								textDecorationColor: themeContext.main,
							}}
							className={currIndex + 1 === index && isFocused ? "curr-letter" : "not-curr-letter"}
						>
							{char}
						</CaretSpan>
					);
				})}
			</InputFieldDiv>
		</div>
	);
};

/**
 * currChar     - the last typed character in string
 * length       - the length of typed characters
 * correctChar  - number of correct typed characters
 * errorChar    - number of wrong typed characters
 * phase        - 0: user didn't type yet   1:user typing     2: done typing
 * startTinme   - time of start
 * endTime      - time of finished
 */
