import React from "react";
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
	return (
		<div>
			<button
				onClick={() =>
					setThemes({
						background: "#323437",
						foreground: "#292a2d",
						main: "#e2b71a",
						untyped: "#646669",
						correct: "#d1d0c5",
						wrong: "#ca4754",
						extra: "#7e2a33",
					})
				}
			>
				Change
			</button>
		</div>
	);
};
