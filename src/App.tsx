import React from "react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Typer } from "./components/Typer";

type themeObj = {
	background: string;
	foreground: string;
	main: string;
	untyped: string;
	correct: string;
	wrong: string;
	extra: string;
};
function App() {
	const [theme, setTheme] = useState<themeObj>({
		background: "white",
		foreground: "white",
		main: "yellow",
		untyped: "gray",
		correct: "black",
		wrong: "red",
		extra: "dark-red",
	});

	return (
		<ThemeProvider theme={theme}>
			<div className="App">
				<Typer text="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without" />
			</div>
		</ThemeProvider>
	);
}

export default App;
