import React from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
	padding: 5px;
	min-width: 200px;
`;

const SearchInput = styled.input`
	background-color: rgba(0, 0, 0, 0);
	color: white;
`;
export const NotesList: React.FC = () => {
	return (
		<WrapperDiv>
			<div>
				<p>All</p>
				<p>History</p>
			</div>
			<SearchInput type="text" />
			<div></div>
		</WrapperDiv>
	);
};
