import React from "react";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Typer } from "./components/Typer";
import { Settings } from "./pages/Settings";

type themeObj = {
	background: string;
	foreground: string;
	main: string;
	untyped: string;
	correct: string;
	wrong: string;
	extra: string;
};

const defaultTheme = {
	background: "white",
	foreground: "white",
	main: "yellow",
	untyped: "gray",
	correct: "black",
	wrong: "red",
	extra: "dark-red",
};

const AppDiv = styled.div`
	margin: 0px;
	height: 100vh;
	background-color: ${(props) => props.theme.background};
`;

function App() {
	const [theme, setTheme] = useState<themeObj>(defaultTheme);

	return (
		<ThemeProvider theme={theme}>
			<AppDiv>
				<Settings setThemes={setTheme} />
				<Typer text="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without" />
			</AppDiv>
		</ThemeProvider>
	);
}

export default App;
