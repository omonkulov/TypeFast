import React from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";

type themeObj = {
	background: string;
	foreground: string;
	main: string;
	untyped: string;
	correct: string;
	wrong: string;
	extra: string;
};

interface Props {
	setThemes: React.Dispatch<React.SetStateAction<themeObj>>;
}

export const Settings: React.FC<Props> = ({ setThemes }) => {
	const [previewTheme, setPreviewTheme] = useState<themeObj>({
		background: "#323437",
		foreground: "#292a2d",
		main: "#e2b71a",
		untyped: "#646669",
		correct: "#d1d0c5",
		wrong: "#ca4754",
		extra: "#7e2a33",
	});

	return (
		<div>
			<input
				className="color-picker"
				type="color"
				defaultValue="#646669"
				onChange={(e) => {
					setPreviewTheme((prev: themeObj) => {
						return { ...prev, background: e.target.value };
					});
				}}
			/>

			<input
				className="color-picker"
				type="color"
				defaultValue="#646669"
				onChange={(e) => {
					setPreviewTheme((prev: themeObj) => {
						return { ...prev, foreground: e.target.value };
					});
				}}
			/>
			<input
				className="color-picker"
				type="color"
				defaultValue="#646669"
				onChange={(e) => {
					setPreviewTheme((prev: themeObj) => {
						return { ...prev, main: e.target.value };
					});
				}}
			/>
			<input
				className="color-picker"
				type="color"
				defaultValue="#646669"
				onChange={(e) => {
					setPreviewTheme((prev: themeObj) => {
						return { ...prev, untyped: e.target.value };
					});
				}}
			/>
			<input
				className="color-picker"
				type="color"
				defaultValue="#646669"
				onChange={(e) => {
					setPreviewTheme((prev: themeObj) => {
						return { ...prev, correct: e.target.value };
					});
				}}
			/>

			<input
				className="color-picker"
				type="color"
				defaultValue="#646669"
				onChange={(e) => {
					setPreviewTheme((prev: themeObj) => {
						return { ...prev, wrong: e.target.value };
					});
				}}
			/>

			<input
				className="color-picker"
				type="color"
				defaultValue="#646669"
				onChange={(e) => {
					setPreviewTheme((prev: themeObj) => {
						return { ...prev, extra: e.target.value };
					});
				}}
			/>
			<button onClick={() => setThemes(previewTheme)}>Try</button>
		</div>
	);
};
