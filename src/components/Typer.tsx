import React from "react";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const InputField = styled.p`
	background-color: #ddd;
	width: 50rem;
	height: 10rem;
	margin: 2rem auto;
	padding: 1rem;
	border-radius: 10px;
	border: 2px solid #555;
	transition: all 0.3s;
	font-size: 1.5rem;
	font-family: Consolas;

	display: flex;
	flex-wrap: wrap;
	column-gap: 1ch;

	&:focus {
		outline: none;
		background-color: #e1e3f7;
		border: 2px solid #7622e3;
	}
`;

const Caret = styled.div`
	min-width: 2px;
	min-height: 1.5rem;
	background-color: rgb(57, 85, 241);
	position: absolute;
	transform: tanslate(100%, -50%);
`;

interface Props {
	text: string;
}

export const Typer: React.FC<Props> = ({ text }) => {
	//Me
	const caretRef = useRef<HTMLDivElement>(null);
	const lettertRef = useRef<HTMLDivElement>(null);

	const [input, setInput] = useState(``);

	useEffect(() => {
		if (caretRef.current && lettertRef.current) {
			caretRef.current.style.top = `${lettertRef.current?.offsetTop}px`;
			caretRef.current.style.left = `${lettertRef.current?.offsetLeft + 10}px`;
		}
	}, [lettertRef, caretRef, input]);

	function handleKeyDown(evt: React.KeyboardEvent<HTMLDivElement>) {
		if (evt.ctrlKey || evt.altKey || evt.metaKey) return;
		if (evt.key.length === 1) {
			setInput((input) => input + evt.key);
		} else if (evt.key === `Backspace`) {
			setInput((input) => input.slice(0, -1));
		}
	}

	type Char = {
		char: string;
		timeTyped: number | null;
		correct: boolean | null;
		untyped: boolean;
		extra: boolean;
	};

	function wordDiff(word1: string, word2: string): Char[] {
		let result: Char[] = [];
		for (let i = 0; i < Math.max(word1.length, word2.length); i++) {
			let char1 = word1[i];
			let char2 = word2[i];

			if (char1 === undefined) {
				result.push({
					char: char2,
					timeTyped: null,
					correct: null,
					untyped: true,
					extra: false,
				});
			} else if (char2 === undefined) {
				result.push({
					char: char1,
					timeTyped: Date.now(),
					correct: false,
					untyped: false,
					extra: true,
				});
			} else if (char1 === char2) {
				result.push({
					char: char1,
					timeTyped: Date.now(),
					correct: true,
					untyped: false,
					extra: false,
				});
			} else if (char1 !== char2) {
				result.push({
					char: char2,
					timeTyped: Date.now(),
					correct: false,
					untyped: false,
					extra: false,
				});
			}
		}

		return result;
	}

	return (
		<div>
			<Caret ref={caretRef} />
			<InputField onKeyDown={handleKeyDown} tabIndex={0}>
				{text.split(` `).map((word, i) => {
					const diff = wordDiff(input.split(` `)[i] || ``, word);

					return (
						<span key={i}>
							{diff.map((char, j) => {
								let color = `black`;
								if (char.untyped) color = `#888`;
								if (char.correct === false) color = `red`;
								if (char.extra) color = `maroon`;

								return (
									<span key={`${i}-${j}`} style={{ color }} ref={char.untyped ? null : lettertRef}>
										{char.char}
									</span>
								);
							})}
						</span>
					);
				})}
			</InputField>
		</div>
	);
};
