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
	margin: auto 0px;
	margin-top: 2px;
	border: 1px solid grey;
`;

const TableHeaderTH = styled.th`
	font-size: 1.2rem;
	color: ${(props) => props.theme.correct};
`;

const TitleP = styled.p`
	font-size: 2.2rem;
	margin: 10px 0px;
	text-align: center;
	color: ${(props) => props.theme.correct};
`;

const ColorRowTR = styled.tr`
	&:hover {
		background-color: ${(props) => props.theme.foreground};
		outline: 0.5px solid ${(props) => props.theme.main};
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

interface Props {
	setThemes: React.Dispatch<React.SetStateAction<themeObj>>;
}

export const Settings: React.FC<Props> = ({ setThemes }) => {
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
		<div>
			<div>
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
		</div>
	);
};
