export default class Langage {
	// 1. Typage des propriétés d'un langage.
	id: number;
	hp: number;
	cp: number;
	name: string;
	picture: string;
	types: Array<string>;
	created: Date;
	description: string;

	// 2. Définition des valeurs par défaut des propriétés d'un langage.
	constructor (
		id: number,
		hp: number = 100,
		cp: number = 10,
		name: string = "...",
		picture: string = "XXX.png",
		types: Array<string> = [ "Normal" ],
		created: Date = new Date(),
		description: string = "description"
	) {
		// 3. Initialisation des propiétés d'un langage.
		this.id = id;
		this.hp = hp;
		this.cp = cp;
		this.name = name;
		this.picture = picture;
		this.types = types;
		this.created = created;
		this.description = description;
	}
}
