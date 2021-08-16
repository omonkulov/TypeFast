import React from "react";
import styled from "styled-components";

const NavWrap = styled.div`
	display: flex;
	padding: 5px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.correct};
	font-size: 1.4rem;
	gap: 10vw;
`;
export const NavBar: React.FC = () => {
	return (
		<NavWrap>
			<p>NoteType</p>
			<p>Collections</p>
			<p>Quiz</p>
			<p>Settings</p>
		</NavWrap>
	);
};
