import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
			<Link className="navLink" to="/">
				<p>NoteType</p>
			</Link>
			<Link className="navLink" to="/collection">
				<p>Collections</p>
			</Link>
			<Link className="navLink" to="/quiz">
				<p>Quiz</p>
			</Link>
			<Link className="navLink" to="/settings">
				<p>Settings</p>
			</Link>
		</NavWrap>
	);
};
