import React from "react";
import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { NavBar } from "./components/NavBar";
import { NotesList } from "./components/NotesList";
import { Typer } from "./components/Typer";
import { BrowserRouter, Route } from "react-router-dom";
import { Settings } from "./pages/Settings";
import DefaultThemes from "./styles/DefaultThemes";

type themeObj = {
	background: string;
	foreground: string;
	main: string;
	untyped: string;
	correct: string;
	wrong: string;
};

const TyperWrapper = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 200px 1fr;
`;
const AppDiv = styled.div`
	height: 100vh;
	width: 100vw;
	background-color: ${(props) => props.theme.background};
	display: flex;
	flex-direction: column;
	overflow: hidden;
`;

const MainDiv = styled.div`
	height: 100%;
	width: 100%;
	grid-area: typer;
	display: flex;
	justify-content: center;
	padding-top: 50px;
	overflow-x: hidden;
	overflow-y: auto;
	&::-webkit-scrollbar {
		width: 10px;
		border: 1px solid ${(props) => props.theme.foreground};
	}
`;

type noteObj = {
	title: string;
	body: string;
};

type typingPrefObj = {
	skipWordsOnSpace: boolean;
	pauseOnEror: boolean;
};

function App() {
	const [theme, setTheme] = useState<themeObj>(DefaultThemes[0]);
	const [note, setNote] = useState<noteObj>({ title: "Default", body: "This is a default text" });
	const [pref, setPref] = useState<typingPrefObj>({ skipWordsOnSpace: false, pauseOnEror: false });
	//Re-render the typer
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
					<NavBar />
					<MainDiv>
						<Route path="/" exact>
							<TyperWrapper>
								<NotesList setNote={setNote} setTest={setTest} />
								{!test ? <Typer pref={pref} note={note} /> : null}
							</TyperWrapper>
						</Route>
						<Route path="/settings">
							<Settings setThemes={setTheme} setPref={setPref} pref={pref} />
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
