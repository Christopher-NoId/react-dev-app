import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import LangageForm from "../components/langage-form";
import Langage from "../models/language";
import LangageService from "../services/langage-service";
import Loader from "../components/loader";

type Params = { id: string }; //Nous déclarons un type pour la Prop id correspond à l'identifiant du langage à éditer

const LangageEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
	//on passe le prop au composant
	const [ langage, setLangage ] = useState<Langage | null>(null);

	useEffect(
		() => {
			//fetch(`http://localhost:3001/langages/${match.params.id}`)
			//	.then(response => response.json())
			//	.then(langage => {
			//		if (langage.id) setLangage(langage);
			//	});
			LangageService.getLangage(+match.params.id).then(langage => setLangage(langage));
		},
		[ match.params.id ]
	);

	return (
		<div>
			{langage ? (
				<div className='row'>
					<h2 className='header center'>Éditer {langage.name}</h2>
					<LangageForm langage={langage} isEditForm={true} />
				</div>
			) : (
				<h4 className='center'>
					<Loader />
				</h4>
			)}
		</div>
	);
};

export default LangageEdit;
