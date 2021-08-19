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

const TyperWrapper = styled.div`\
	width: 100%;
	display: grid;
	grid-template-columns: 200px 1fr;
`;
const AppDiv = styled.div`
	width: 100%;
	background-color: ${(props) => props.theme.background};
	display: flex;
	flex-direction: column;
	padding: 10px;
`;

const MainDiv = styled.div`
	grid-area: typer;
	display: flex;
	justify-content: center;
	padding-top: 15px;
	overflow-x: hidden;
	overflow-y: auto;
	/* width */
	::-webkit-scrollbar {
		width: 4px;
	}

	/* Track */
	::-webkit-scrollbar-track {
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: ${(props) => props.theme.main};
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: ${(props) => props.theme.wrong};
	}
`;

type noteObj = {
	title: string;
	body: string;
};

type typingPrefObj = {
	skipWordsOnSpace: boolean;
	pauseOnError: boolean;
};

function App() {
	const [theme, setTheme] = useState<themeObj>(DefaultThemes[0]);
	const [note, setNote] = useState<noteObj>({ title: "Default", body: "This is a default text" });
	const [pref, setPref] = useState<typingPrefObj>({ skipWordsOnSpace: false, pauseOnError: false });
	//Re-render the typer
	const [test, setTest] = useState<boolean>(false);

	useEffect(() => {
		let currectThemeLocal = localStorage.getItem("currentTheme");
		let skipOnSpaceLocal = localStorage.getItem("skipOnSpace");
		let pauseOnErrorLocal = localStorage.getItem("pauseOnError");
		if (currectThemeLocal) {
			setTheme({ ...JSON.parse(currectThemeLocal) });
		}
		if (skipOnSpaceLocal !== undefined) {
			setPref((prev) => {
				return {
					...prev,
					skipWordsOnSpace: skipOnSpaceLocal === "true" ? true : false,
				};
			});
		}
		if (pauseOnErrorLocal !== undefined) {
			setPref((prev) => {
				return {
					...prev,
					pauseOnError: pauseOnErrorLocal === "true" ? true : false,
				};
			});
		}
	}, []);

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
