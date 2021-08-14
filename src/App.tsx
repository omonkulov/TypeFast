import React from "react";
import { UserTextBox } from "./components/UserTextBox";
import { useState } from "react";
import { TypingComponent } from "./components/TypingComponent";

function App() {
	const [wordsArr, setWordsArr] = useState<Array<Array<string>>>([]);
	const [numOfChars, setNumbOfChars] = useState<number>(0)
	return (
		<div className="App">
			<UserTextBox setWordsArr={setWordsArr} setNumOfChars={setNumbOfChars} />
			<TypingComponent wordsArr={wordsArr} numOfChars={numOfChars} />
		</div>
	);
}

export default App;
