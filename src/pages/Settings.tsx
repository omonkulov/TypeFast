import React from "react";
import { useContext } from "react";
import { useRef, useMemo, useCallback } from "react";
import { ThemeContext } from "styled-components";
import DefaultThemes from "../styles/DefaultThemes";
import styled from "styled-components";
import { throttle } from "lodash";

const ColorDiv = styled.div`
	height: 30px;
	padding: 5px;
	margin: auto 2px;
	border: 1px solid grey;
`;

const TableHeaderTH = styled.th`
	font-size: 1.2rem;
	color: ${(props) => props.theme.correct};
`;

const TitleP = styled.p`
	width: fit-content;
	block-size: fit-content;
	font-size: 2.2rem;
	margin: 6rem auto 20px auto;
	text-align: center;
	color: ${(props) => props.theme.correct};
	border-bottom: 0.6rem solid ${(props) => props.theme.foreground};
	border-radius: 2px;
`;

const OptionLabel = styled.label`
	font-size: 1.2rem;
	text-align: center;
	margin-right: 5px;
	color: ${(props) => props.theme.correct};
`;

const ColorRowTR = styled.tr`
	&:hover {
		background-color: ${(props) => props.theme.foreground};
		outline: 0.5px solid ${(props) => props.theme.main};
	}
`;

const CaretSpan = styled.span`
	border-left: 0.2rem solid ${(props) => props.theme.main};
`;
const InputFieldDiv = styled.div`
	background-color: ${(props) => props.theme.background};
	margin: 2rem auto;
	padding: 1rem;
	transition: all 0.3s;
	font-size: 2rem;
	font-family: Consolas;
	outline: none;
	position: relative;
	overflow-x: hidden;
	overflow-y: auto;
	text-align: center;
	&:hover {
		outline: none;
		background-color: ${(props) => props.theme.foreground};
	}
`;

type themeObj = {
	background: string;
	foreground: string;
	main: string;
	untyped: string;
	correct: string;
	wrong: string;
};

type typingPrefObj = {
	skipWordsOnSpace: boolean;
	pauseOnError: boolean;
};

interface Props {
	setThemes: React.Dispatch<React.SetStateAction<themeObj>>;
	setPref: React.Dispatch<React.SetStateAction<typingPrefObj>>;
	pref: typingPrefObj;
}

export const Settings: React.FC<Props> = ({ setThemes, setPref, pref }) => {
	const backGroundRef = useRef<HTMLInputElement>(null);
	const foreGroundRef = useRef<HTMLInputElement>(null);
	const mainRef = useRef<HTMLInputElement>(null);
	const untypedRef = useRef<HTMLInputElement>(null);
	const correctRef = useRef<HTMLInputElement>(null);
	const wrongRef = useRef<HTMLInputElement>(null);
	const themeContext = useContext(ThemeContext);

	function updateDefaultValue(params: themeObj) {
		if (
			backGroundRef.current &&
			foreGroundRef.current &&
			mainRef.current &&
			untypedRef.current &&
			correctRef.current &&
			wrongRef.current
		) {
			backGroundRef.current.value = params.background;
			foreGroundRef.current.value = params.foreground;
			mainRef.current.value = params.main;
			untypedRef.current.value = params.untyped;
			correctRef.current.value = params.correct;
			wrongRef.current.value = params.wrong;
		}
	}

	const LoadThemes = DefaultThemes.map((theme, i) => {
		return (
			<ColorRowTR
				key={i}
				onClick={() => {
					setThemes(theme);
					updateDefaultValue(theme);
					localStorage.setItem("currentTheme", JSON.stringify(theme));
				}}
			>
				<td>
					<ColorDiv style={{ backgroundColor: theme.background }} />
				</td>
				<td>
					<ColorDiv style={{ backgroundColor: theme.foreground }} />
				</td>
				<td>
					<ColorDiv style={{ backgroundColor: theme.main }} />
				</td>
				<td>
					<ColorDiv style={{ backgroundColor: theme.untyped }} />
				</td>
				<td>
					<ColorDiv style={{ backgroundColor: theme.correct }} />
				</td>
				<td>
					<ColorDiv style={{ backgroundColor: theme.wrong }} />
				</td>
			</ColorRowTR>
		);
	});

	const handleChange = useCallback(
		(color: string, part: number) => {
			switch (part) {
				case 0:
					setThemes((prev: themeObj) => {
						return { ...prev, background: color };
					});
					break;
				case 1:
					setThemes((prev: themeObj) => {
						return { ...prev, foreground: color };
					});
					break;
				case 2:
					setThemes((prev: themeObj) => {
						return { ...prev, main: color };
					});
					break;
				case 3:
					setThemes((prev: themeObj) => {
						return { ...prev, untyped: color };
					});
					break;
				case 4:
					setThemes((prev: themeObj) => {
						return { ...prev, correct: color };
					});
					break;
				case 5:
					setThemes((prev: themeObj) => {
						return { ...prev, wrong: color };
					});
					break;
				default:
					break;
			}
		},
		[setThemes]
	);

	const throttledEventHandler = useMemo(() => throttle(handleChange, 300), [handleChange]);

	return (
		<div className="scroll-enabled">
			<div>
				<InputFieldDiv>
					<CaretSpan
						style={{
							color: themeContext.correct,
							textDecorationColor: themeContext.main,
						}}
						className={"not-curr-letter"}
					>
						This is
					</CaretSpan>
					<CaretSpan
						style={{
							backgroundColor: themeContext.wrong,
							textDecorationColor: themeContext.main,
						}}
						className={"not-curr-letter"}
					>
						{" "}
					</CaretSpan>
					<CaretSpan
						style={{
							color: themeContext.correct,
							textDecorationColor: themeContext.main,
						}}
						className={"not-curr-letter"}
					>
						for t
					</CaretSpan>
					<CaretSpan
						style={{
							color: themeContext.wrong,
							textDecorationColor: themeContext.main,
						}}
						className={"not-curr-letter"}
					>
						est
					</CaretSpan>
					<CaretSpan
						style={{
							color: themeContext.correct,
							textDecorationColor: themeContext.main,
						}}
						className={"not-curr-letter"}
					>
						i
					</CaretSpan>
					<CaretSpan
						style={{
							color: themeContext.untyped,
							textDecorationColor: themeContext.main,
						}}
						className={"curr-letter"}
					>
						ng the theme!
					</CaretSpan>
				</InputFieldDiv>
			</div>
			<div className="center-columnDirection">
				<form className="center">
					<OptionLabel htmlFor="skipOnSpace">Skip words on space: </OptionLabel>
					<input
						id="skipOnSpace"
						name="skipOnSpace"
						type="checkbox"
						checked={pref.skipWordsOnSpace}
						onChange={() =>
							setPref((prev) => {
								localStorage.setItem("skipOnSpace", !pref.skipWordsOnSpace + "");
								return { ...prev, skipWordsOnSpace: !pref.skipWordsOnSpace };
							})
						}
					/>
				</form>
				<form className="center">
					<OptionLabel htmlFor="pauseOnError">Pause type on error: </OptionLabel>
					<input
						id="pauseOnError"
						name="pauseOnError"
						type="checkbox"
						checked={pref.pauseOnError}
						onChange={() =>
							setPref((prev) => {
								localStorage.setItem("pauseOnError", !pref.pauseOnError + "");
								return { ...prev, pauseOnError: !pref.pauseOnError };
							})
						}
					/>
				</form>
			</div>

			<div>
				<TitleP>Default Themes</TitleP>
				<table>
					<thead>
						<tr>
							<TableHeaderTH>Back</TableHeaderTH>
							<TableHeaderTH>Fore</TableHeaderTH>
							<TableHeaderTH>Main</TableHeaderTH>
							<TableHeaderTH>Untyped</TableHeaderTH>
							<TableHeaderTH>Correct</TableHeaderTH>
							<TableHeaderTH>Wrong</TableHeaderTH>
						</tr>
					</thead>
					<tbody>{LoadThemes}</tbody>
				</table>
			</div>
			<TitleP>Custom Themes</TitleP>
			<div className="center">
				<input
					className="color-picker"
					type="color"
					defaultValue={themeContext.background}
					ref={backGroundRef}
					onChange={(e) => throttledEventHandler(e.target.value, 0)}
				/>

				<input
					className="color-picker"
					type="color"
					defaultValue={themeContext.foreground}
					ref={foreGroundRef}
					onChange={(e) => throttledEventHandler(e.target.value, 1)}
				/>
				<input
					className="color-picker"
					type="color"
					defaultValue={themeContext.main}
					ref={mainRef}
					onChange={(e) => throttledEventHandler(e.target.value, 2)}
				/>
				<input
					className="color-picker"
					type="color"
					defaultValue={themeContext.untyped}
					ref={untypedRef}
					onChange={(e) => throttledEventHandler(e.target.value, 3)}
				/>
				<input
					className="color-picker"
					type="color"
					defaultValue={themeContext.correct}
					ref={correctRef}
					onChange={(e) => throttledEventHandler(e.target.value, 4)}
				/>

				<input
					className="color-picker"
					type="color"
					defaultValue={themeContext.wrong}
					ref={wrongRef}
					onChange={(e) => throttledEventHandler(e.target.value, 5)}
				/>
			</div>
		</div>
	);
};
