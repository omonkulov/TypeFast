import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const NavWrap = styled.div`
	display: flex;
	padding: 5px;
	justify-content: center;
	align-items: center;
	margin: 12px 0px;
	color: ${(props) => props.theme.correct};
	font-size: 1.4rem;
	gap: 40px;
`;

const NavP = styled.p`
	&:hover {
		background-color: ${(props) => props.theme.foreground};
	}
`;
export const NavBar: React.FC = () => {
	return (
		<NavWrap>
			<Link className="navLink" to="/">
				<NavP>NoteType</NavP>
			</Link>
			<Link className="navLink" to="/collection">
				<NavP>Collections</NavP>
			</Link>
			<Link className="navLink" to="/quiz">
				<NavP>Quiz</NavP>
			</Link>
			<Link className="navLink" to="/settings">
				<NavP>Settings</NavP>
			</Link>
		</NavWrap>
	);
};
