import React, { FunctionComponent, useState } from "react";
import LangageForm from "../components/langage-form";
import Langage from "../models/language";

const LangageAdd: FunctionComponent = () => {
	const [ id ] = useState<number>(new Date().getTime());
	const [ langage ] = useState<Langage>(new Langage(id));

	return (
		<div className='row'>
			<h2 className='header center'>Ajouter un langage</h2>
			<LangageForm langage={langage} isEditForm={false} />
		</div>
	);
};

export default LangageAdd;

//on crée un langage vierge, pour cela on génère un id unique ligne6
//avec la méthode getTime(timestamp) permet de renvoyer un chiffre unique
//nombre de miliseconde écoulée depuis 1972.
//on crée un langage vierge ligne 7 en passant cet identifiant
//ligne 12 mise en place du formulaire d'édition
