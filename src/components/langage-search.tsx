import React, { FunctionComponent, useState } from "react";
import { Link } from "react-router-dom";
import Langage from "../models/language";
import LangageService from "../services/langage-service";

const LangageSearch: FunctionComponent = () => {
	const [ term, setTerm ] = useState<string>("");
	const [ langages, setLangages ] = useState<Langage[]>([]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const term = e.target.value;
		setTerm(term);

		if (term.length <= 1) {
			setLangages([]);
			return;
		}

		LangageService.searchLangage(term).then(langages => setLangages(langages));
	};

	return (
		<div className='row'>
			<div className='col s12 m6 offset-m3'>
				<div className='card'>
					<div className='card-content'>
						<div className='input-field'>
							<input
								type='text'
								placeholder='Rechercher un langage'
								value={term}
								onChange={e => handleInputChange(e)}
							/>
						</div>
						<div className='collection'>
							{langages.map(langage => (
								<Link key={langage.id} to={`/langages/${langage.id}`} className='collection-item'>
									{langage.name}
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LangageSearch;
