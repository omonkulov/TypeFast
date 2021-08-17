import React from "react";
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { NavBar } from "./components/NavBar";
import { NotesList } from "./components/NotesList";
import { Typer } from "./components/Typer";
import { BrowserRouter, Route } from "react-router-dom";
import { Settings } from "./pages/Settings";

type themeObj = {
	background: string;
	foreground: string;
	main: string;
	untyped: string;
	correct: string;
	wrong: string;
};

const defaultTheme = {
	background: "#323437",
	foreground: "#292a2d",
	main: "#e2b71a",
	untyped: "#646669",
	correct: "#d1d0c5",
	wrong: "#ca4754",
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
	overflow: hidden;
`;

const NavDiv = styled.div`
	grid-area: nav;
`;

const NotesDiv = styled.div`
	gird-area: noteslist;
`;

const MainDiv = styled.div`
	grid-area: typer;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-x: hidden;
	overflow-y: auto;
`;

type noteObj = {
	title: string;
	body: string;
};

function App() {
	const [theme, setTheme] = useState<themeObj>(defaultTheme);
	const [note, setNote] = useState<noteObj>({ title: "Default", body: "This is a default text" });
	const [test, setTest] = useState<boolean>(false);

	useEffect(() => {
		if (test) {
			setTest(false);
		}
	}, [test]);

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<AppDiv>
					<NavDiv>
						<NavBar />
					</NavDiv>
					<NotesDiv>
						<NotesList setNote={setNote} setTest={setTest} />
					</NotesDiv>
					<MainDiv>
						<Route path="/" exact>
							{!test ? <Typer note={note} /> : null}
						</Route>
						<Route path="/settings">
							<Settings setThemes={setTheme} />
						</Route>
						<Route path="/collection"></Route>
						<Route path="/quiz"></Route>
					</MainDiv>
				</AppDiv>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
