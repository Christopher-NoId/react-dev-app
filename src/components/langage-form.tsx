import React, { FunctionComponent, useState } from "react";
import { useHistory } from "react-router-dom";
import Langage from "../models/language";
import formatType from "../helpers/format-type";
import LangageService from "../services/langage-service";

type Props = {
	langage: Langage;
	isEditForm: boolean;
};

type Field = {
	//on modélise un champ dans notre formulaire:
	// chaque champ a une valeur
	//un message d'erreur potentiel
	//et une propriété indiquant si la donnée saisie est valide ou non
	value?: any;
	error?: string;
	isValid?: boolean;
};

type Form = {
	//liste des champs disponible dans notre formulaire
	//en combinant Field et Forme on va structurer notre State
	picture: Field;
	name: Field;
	description: Field;
	types: Field;
};
const LangageForm: FunctionComponent<Props> = ({ langage, isEditForm }) => {
	const history = useHistory();

	const [ form, setForm ] = useState<Form>({
		picture: { value: langage.picture },
		name: { value: langage.name, isValid: true },
		description: { value: langage.description, isValid: true },
		types: { value: langage.types, isValid: true }
	});

	const types: string[] = [ "Orienté objet", "Librairie", "Mobile" ];

	const hasType = (type: string): boolean => {
		return form.types.value.includes(type);
	};

	const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
		const checked = e.target.checked;
		let newField: Field;

		if (checked) {
			//Si l'user coche un type, on l'ajoute à la liste des types du pokémon
			const newTypes: string[] = form.types.value.concat([ type ]);
			newField = { value: newTypes };
		}
		else {
			//Si l'user décoche un type, on le retire de la liste des types du pokémon
			const newTypes: string[] = form.types.value.filter((currentType: string) => currentType !== type);
			newField = { value: newTypes };
		}

		setForm({ ...form, ...{ types: newField } });
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fieldName: string = e.target.name; //nom du champ modifié
		const fieldValue: string = e.target.value; //nouvelle valeur saisie par l'utilisateur
		const newField: Field = { [fieldName]: { value: fieldValue } }; //on regroupe fieldName et fieldValue

		setForm({ ...form, ...newField });
	};

	const validateForm = () => {
		let newForm: Form = form;

		//Validator url
		if (isAddForm()) {
			const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
			const end = ".png";

			if (!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)) {
				const errorMsg: string = "L'url n'est pas valide.";
				const newField: Field = { value: form.picture.value, error: errorMsg, isValid: false };
				newForm = { ...newForm, ...{ picture: newField } };
			}
			else {
				const newField: Field = { value: form.picture.value, error: "", isValid: true };
				newForm = { ...newForm, ...{ picture: newField } };
			}
		}

		//Name validator
		if (!/^[a-zA-Zàéè]{3,25}$/.test(form.name.value)) {
			const errorMsg: string = "Le nom du langage doit avoir entre 1 et 25 caractères.";
			const newField: Field = { value: form.name.value, error: errorMsg, isValid: false };
			newForm = { ...newForm, ...{ name: newField } };
		}
		else {
			const newField: Field = { value: form.name.value, error: "", isValid: true };
			newForm = { ...newForm, ...{ name: newField } };
		}

		setForm(newForm);
		return newForm.name.isValid;
	};

	const isTypesValid = (type: string): boolean => {
		if (form.types.value.length === 1 && hasType(type)) {
			return false;
		}

		if (form.types.value.length >= 3 && !hasType(type)) {
			return false;
		}

		return true;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isFormValid = validateForm();

		if (isFormValid) {
			langage.picture = form.picture.value;
			langage.name = form.name.value;
			langage.description = form.description.value;
			langage.types = form.types.value;
			//on indique tous les champs du formulaire modifiés

			isEditForm ? updateLangage() : addLangage();
		}
	};

	const isAddForm = () => {
		return !isEditForm;
	};

	const addLangage = () => {
		LangageService.addLangage(langage).then(() => history.push("/langages"));
	};

	const updateLangage = () => {
		LangageService.updateLangage(langage).then(() => history.push(`/langages/${langage.id}`));
	};
	const deleteLangage = () => {
		LangageService.deleteLangage(langage).then(() => history.push(`/langages`));
	};

	return (
		<form onSubmit={e => handleSubmit(e)}>
			<div className='row'>
				<div className='col s12 m8 offset-m2'>
					<div className='card hoverable'>
						{isEditForm && (
							<div className='card-image'>
								<img
									src={langage.picture}
									alt={langage.name}
									style={{ width: "250px", margin: "0 auto" }}
								/>
								<span className='btn-floating indigo darken-4 halfway-fab waves-effect waves-light '>
									<i onClick={deleteLangage} className='material-icons'>
										delete
									</i>
								</span>
							</div>
						)}
						<div className='card-stacked'>
							<div className='card-content'>
								{/*  photo du  langage */}
								{isAddForm() && (
									<div className='form-group'>
										<label htmlFor='name'>Image</label>
										<input
											id='picture'
											name='picture'
											type='text'
											className='form-control'
											value={form.picture.value}
											onChange={e => handleInputChange(e)}
										/>
										{form.picture.error && (
											<div className='card-panel red accent-1'>{form.picture.error}</div>
										)}
									</div>
								)}

								{/*  Nom du langage */}
								<div className='form-group'>
									<label htmlFor='name'>Nom</label>
									<input
										id='name'
										name='name'
										type='text'
										className='form-control'
										value={form.name.value}
										onChange={e => handleInputChange(e)}
									/>
									{form.name.error && (
										<div className='card-panel red accent-1'>{form.name.error}</div>
									)}
								</div>
								{/*  description */}
								<div className='form-group'>
									<label htmlFor='description'>Description</label>
									<input
										id='description'
										name='description'
										type='text'
										className='form-control'
										value={form.description.value}
										onChange={e => handleInputChange(e)}
									/>
								</div>
								{/* Langage types */}
								<div className='form-group'>
									<label>Types</label>
									{types.map(type => (
										<div key={type} style={{ marginBottom: "10px" }}>
											<label>
												<input
													id={type}
													type='checkbox'
													className='filled-in'
													value={type}
													disabled={!isTypesValid(type)}
													checked={hasType(type)}
													onChange={e => selectType(type, e)}
												/>
												<span>
													<p className={formatType(type)}>{type}</p>
												</span>
											</label>
										</div>
									))}
								</div>
							</div>
							<div className='card-action center'>
								{/* Submit button */}
								<button type='submit' className='btn'>
									Valider
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};

export default LangageForm;
