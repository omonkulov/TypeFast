import React from "react";
import { useState, useEffect, useRef, useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const TyperWrapper = styled.div``;

const InputField = styled.p`
	background-color: ${(props) => props.theme.background};
	width: 50rem;
	height: 10rem;
	margin: 2rem auto;
	padding: 1rem;
	transition: all 0.3s;
	font-size: 1.5rem;
	font-family: Consolas;
	display: flex;
	flex-wrap: wrap;
	column-gap: 12px;

	&:focus {
		outline: none;
		background-color: ${(props) => props.theme.foreground};
		border: 2px solid ${(props) => props.theme.foreground};
	}
`;

const Caret = styled.div`
	width: 0.2rem;
	height: 1.5rem;
	background-color: ${(props) => props.theme.main};
	position: absolute;
`;

interface Props {
	text: string;
}

export const Typer: React.FC<Props> = ({ text }) => {
	//Ref for the cursor
	const caretRef = useRef<HTMLDivElement>(null);
	//Ref for the last typed letter
	const lettertRef = useRef<HTMLDivElement>(null);
	//Theme
	const themeContext = useContext(ThemeContext);
	//User's Input
	const [input, setInput] = useState(``);

	useEffect(() => {
		if (caretRef.current && lettertRef.current) {
			caretRef.current.style.top = `${lettertRef.current?.offsetTop}px`;
			console.log(
				input
					.replace(/\s{2,}/g, "")
					.trim()
					.split(" ")
			);
			console.log();
			if (input[input.length - 1] === " ") {
				caretRef.current.style.left = `${
					lettertRef.current?.offsetLeft + lettertRef.current?.offsetWidth + 12
				}px`;
			} else {
				caretRef.current.style.left = `${lettertRef.current?.offsetLeft + lettertRef.current?.offsetWidth}px`;
			}
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

	let charTrack = -1;
	return (
		<TyperWrapper>
			<Caret ref={caretRef} className="animate-flicker" />
			<InputField onKeyDown={handleKeyDown} tabIndex={0}>
				{text.split(` `).map((word, i) => {
					const diff = wordDiff(
						input
							.replace(/\s{2,}/g, "")
							.trim()
							.split(` `)[i] || ``,
						word
					);

					return (
						<span key={i}>
							{diff.map((char, j) => {
								let color = themeContext.correct;
								if (char.untyped) color = themeContext.untyped;
								if (char.correct === false) color = themeContext.wrong;
								if (char.extra) color = themeContext.extra;
								charTrack++;
								return (
									<span
										id={`${charTrack}`}
										key={`${i}-${j}`}
										style={{ color }}
										ref={charTrack === input.replace(/\s/g, "").length - 1 ? lettertRef : null}
									>
										{char.char}
									</span>
								);
							})}
						</span>
					);
				})}
			</InputField>
		</TyperWrapper>
	);
};
