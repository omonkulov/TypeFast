import React from "react";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { Typer } from "./components/Typer";
import { Settings } from "./pages/Settings";
import { NavBar } from "./components/NavBar";
import { NotesList } from "./components/NotesList";

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
	background: "#323437",
	foreground: "#292a2d",
	main: "#e2b71a",
	untyped: "#646669",
	correct: "#d1d0c5",
	wrong: "#ca4754",
	extra: "#7e2a33",
};

const AppDiv = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: ${(props) => props.theme.background};
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template:
		"nav nav" auto
		"noteslist typer" 1fr / auto 1fr;
`;

const NavDiv = styled.div`
	grid-area: nav;
`;

const NotesDiv = styled.div`
	gird-area: noteslist;
	background: red;
`;
const TyperDiv = styled.div`
	grid-area: typer;
	display: flex;
	justify-content: center;
	align-items: center;
`;
function App() {
	const [theme, setTheme] = useState<themeObj>(defaultTheme);

	return (
		<ThemeProvider theme={theme}>
			<AppDiv>
				<NavDiv>
					<NavBar />
				</NavDiv>
				<NotesDiv>
					<NotesList />
				</NotesDiv>
				<TyperDiv>
					<Typer text="In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without" />
				</TyperDiv>
			</AppDiv>
		</ThemeProvider>
	);
}

export default App;
