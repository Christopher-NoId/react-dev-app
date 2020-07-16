import React, { FunctionComponent, useState, useEffect } from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import Langage from "../models/language";
//import formatDate from "../helpers/format-date";
import formatType from "../helpers/format-type";
import LangageService from "../services/langage-service";
import Loader from "../components/loader";

type Params = { id: string }; //on définit un type nommé Params pour l'id que nous allon récupéré dans l'url

const LangagesDetail: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
	//on utilise RouteComponent pour typé le paramètré reçu depuis le router
	const [ langage, setLangage ] = useState<Langage | null>(null); //on définit un state pour sauvegarder le langage à afficher

	useEffect(
		//hook d'effet permettant de retrouver le langage avec l'id passé en paramètre
		//dés que le paramètre de l'url correspond à un langage on l'affecte au composant
		//avec setLangage
		() => {
			//fetch(`http://localhost:3001/langages/${match.params.id}`)
			//	.then(response => response.json())
			//	.then(langage => {
			//		if (langage.id) setLangage(langage);
			//	});
			LangageService.getLangage(+match.params.id).then(langage => setLangage(langage));
			// le + permet de convertir une string en number
			//le router React transmet l'identifiant d'un langage en string
			//la méthode getLangage attend un nombre en paramètre
			//on convertit à la volée avec le +
		},
		[ match.params.id ]
	);

	return (
		<div>
			{langage ? ( //opérateur ternaire pour vérifier qu'on a bien trouver un langage correspondant
				//au paramètre id de l'url
				<div className='row'>
					<div className='col s12 m8 offset-m2'>
						<h2 className='header center'>{langage.name}</h2>
						<div className='card hoverable'>
							<div className='card-image'>
								<img
									src={langage.picture}
									alt={langage.name}
									style={{ width: "250px", margin: "0 auto" }}
								/>
								<Link
									to={`/langages/edit/${langage.id}`}
									className='btn btn-floating halfway-fab waves-effect waves-light '
								>
									<i className='material-icons'>editer</i>
								</Link>
							</div>
							<div className='card-stacked'>
								<div className='card-content'>
									<table className='bordered striped'>
										<tbody>
											<tr>
												<td>Nom</td>
												<td>
													<strong>{langage.name}</strong>
												</td>
											</tr>

											<tr>
												<td>Types</td>
												<td>
													{langage.types.map(type => (
														<span key={type} className={formatType(type)}>
															{type}
														</span>
													))}
												</td>
											</tr>
											<tr>
												<td>Description</td>
												<td>
													<strong>{langage.description}</strong>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<div className='card-action'>
									<Link to='/'>Retour</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<h4 className='center'>
					<Loader />
				</h4>
			)}
		</div>
	);
};

export default LangagesDetail;
