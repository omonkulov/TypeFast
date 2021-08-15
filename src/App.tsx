import React from "react";
import { UserTextBox } from "./components/UserTextBox";
import { useState } from "react";
import { Typer } from "./components/Typer";

function App() {
	const [wordsArr, setWordsArr] = useState<Array<Array<string>>>([]);
	const [numOfChars, setNumbOfChars] = useState<number>(0);
	return (
		<div className="App">
			<UserTextBox setWordsArr={setWordsArr} setNumOfChars={setNumbOfChars} />
			<Typer wordsArr={wordsArr} numOfChars={numOfChars} />
		</div>
	);
}

export default App;
