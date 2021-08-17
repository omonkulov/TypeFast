import React from "react";
import styled from "styled-components";

const WrapperDiv = styled.div`
	padding: 5px;
	min-width: 200px;
	height: 99%;
	background: ${(props) => props.theme.foreground};
`;

const SearchInput = styled.input`
	background-color: rgba(0, 0, 0, 0);
	color: white;
`;

const NoteP = styled.p`
	color: ${(props) => props.theme.correct};
`;

type note = {
	title: string;
	body: string;
};

interface Props {
	setNote: React.Dispatch<React.SetStateAction<note>>;
	setTest: React.Dispatch<React.SetStateAction<boolean>>;
}
//Examples
const exmaple = [
	{
		title: "Dominican Restoration War",
		body: "The Dominican Restoration War or the Dominican War of Restoration was a guerrilla war between 1863 and 1865 in the Dominican Republic between nationalists and Spain, who had recolonized the country 17 years after its independence.",
	},
	{
		title: "Pedro Santana",
		body: "Santana was a lifelong supporter of the Dominican revolt against the Haitian occupation and a noted general during ",
	},
	{
		title: "Faustin Soulouque",
		body: "Soulouque was a general in the Haitian Army when he was appointed President of Haiti. He acquired autocratic powers, purged the army of the ruling elite, installed black loyalists in administrative positions and the nobility, and created a secret police and personal army. Soulouque was an enthusiastic vodouisant, maintaining a staff of bocors and mambos, and gave the stigmatized vodou religion semi-official status which was openly practiced in Port-au-Prince. Soulouque declared the Second Haitian Empire in 1849 after being proclaimed Emperor under the name Faustin I, and formally crowned in 1852. Several unsuccessful attempts to reconquer the Dominican Republic eroded his support and he abdicated in 1859 under pressure from General Fabre Geffrard and Dominican military victory.[2][3] Soulouque was temporarily exiled to Jamaica before returning to Haiti where he died in 1867.",
	},
];
export const NotesList: React.FC<Props> = ({ setNote, setTest }) => {
	return (
		<WrapperDiv>
			<div>
				<p>All</p>
				<p>History</p>
			</div>
			<SearchInput type="text" />
			<div>
				{exmaple.map((obj, i) => {
					return (
						<NoteP
							key={i}
							onClick={() => {
								setNote(obj);
								setTest(true);
							}}
						>
							{obj.title}
						</NoteP>
					);
				})}
			</div>
		</WrapperDiv>
	);
};
