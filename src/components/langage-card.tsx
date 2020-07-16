import React, { FunctionComponent, useState } from "react";
import Langage from "../models/language";
import "./langage-card.css";
import formatDate from "../helpers/format-date";
import formatType from "../helpers/format-type";
import { useHistory } from "react-router-dom";

type Props = {
	langage: Langage;
	borderColor?: string; //prop facultative
};

const LangageCard: FunctionComponent<Props> = ({ langage, borderColor = "#E4EAEE " }) => {
	//on passe le prop en paramètre de la fonction représentant ce composant
	//ici LangageCard, puis on fait appel au prop avec une de ces propriétés ligne 4

	const [ color, setColor ] = useState<string>();
	const history = useHistory();

	const showBorder = () => {
		setColor(borderColor);
	};

	const hideBorder = () => {
		setColor("#f5f5f5"); //on remet la bordure en gris
	};

	const goToLangage = (id: number) => {
		history.push(`/langages/${id}`);
	};

	return (
		<div
			className='col s6 m4'
			onClick={() => goToLangage(langage.id)}
			onMouseEnter={showBorder}
			onMouseLeave={hideBorder}
		>
			<div className='card horizontal' style={{ borderColor: color }}>
				<div className='card-image'>
					<img src={langage.picture} alt={langage.name} />
				</div>
				<div className='card-stacked'>
					<div className='card-content'>
						<p>{langage.name}</p>
						<p>
							{" "}
							<small>{formatDate(langage.created)}</small>
						</p>
						{langage.types.map(type => (
							<span key={type} className={formatType(type)}>
								{type}
							</span>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LangageCard;
