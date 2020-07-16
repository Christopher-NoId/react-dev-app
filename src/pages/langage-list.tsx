import React, { FunctionComponent, useState, useEffect } from "react";
import Langage from "../models/language";
import LangageCard from "../components/langage-card";
import LangageSearch from "../components/langage-search";
import LangageService from "../services/langage-service";
import { Link } from "react-router-dom";

const LangageList: FunctionComponent = () => {
	const [ langages, setLangages ] = useState<Langage[]>([]);

	useEffect(() => {
		//fetch("http://localhost:3001/langages").then(response => response.json()).then(langages => {
		//	setLangages(langages);
		//});
		LangageService.getLangages().then(langages => setLangages(langages));
		//on récupère la liste des langages depuis l'Api rest
		//puis on met à jour l'état de notre composant avec les langages frâichement reçu
	}, []);

	return (
		<div>
			<h1 className='center'>Liste des langages</h1>
			<div className='container'>
				<div className='row'>
					<LangageSearch />
					{langages.map(langage => <LangageCard key={langage.id} langage={langage} />)}
				</div>
				<Link
					className='btn-floating btn-large waves-effect waves-light indigo darken-4 z-depth-3'
					style={{ position: "fixed", bottom: "25px", right: "25px" }}
					to='/langages/add'
				>
					<i className='material-icons'>add</i>
				</Link>
			</div>
		</div>
	);
};

export default LangageList;
