import Langage from "../models/language";
import LANGAGES from "../models/mock-language";

export default class LangageService {
	static langages: Langage[] = LANGAGES;

	static isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

	static getLangages (): Promise<Langage[]> {
		if (this.isDev) {
			return fetch("http://localhost:3001/langages")
				.then(response => response.json())
				.catch(error => this.handleError(error));
		}

		return new Promise(resolve => {
			resolve(this.langages);
		});
	}

	static getLangage (id: number): Promise<Langage | null> {
		if (this.isDev) {
			return fetch(`http://localhost:3001/langages/${id}`)
				.then(response => response.json())
				.then(data => (this.isEmpty(data) ? null : data))
				.catch(error => this.handleError(error));
		}

		return new Promise(resolve => {
			resolve(this.langages.find(langage => id === langage.id));
		});
	}

	static updateLangage (langage: Langage): Promise<Langage> {
		if (this.isDev) {
			return fetch(`http://localhost:3001/langages/${langage.id}`, {
				method: "PUT",
				body: JSON.stringify(langage),
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.catch(error => this.handleError(error));
		}

		return new Promise(resolve => {
			const { id } = langage;
			const index = this.langages.findIndex(langage => langage.id === id);
			this.langages[index] = langage;
			resolve(langage);
		});
	}

	static deleteLangage (langage: Langage): Promise<{}> {
		if (this.isDev) {
			return fetch(`http://localhost:3001/langages/${langage.id}`, {
				method: "DELETE",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.catch(error => this.handleError(error));
		}

		return new Promise(resolve => {
			const { id } = langage;
			this.langages = this.langages.filter(langage => langage.id !== id);
			resolve({});
		});
	}

	static addLangage (langage: Langage): Promise<Langage> {
		langage.created = new Date(langage.created);

		if (this.isDev) {
			return fetch(`http://localhost:3001/langages`, {
				method: "POST",
				body: JSON.stringify(langage),
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.catch(error => this.handleError(error));
		}

		return new Promise(resolve => {
			this.langages.push(langage);
			resolve(langage);
		});
	}

	static searchLangage (term: string): Promise<Langage[]> {
		if (this.isDev) {
			return fetch(`http://localhost:3001/langages?q=${term}`)
				.then(response => response.json())
				.catch(error => this.handleError(error));
		}

		return new Promise(resolve => {
			const results = this.langages.filter(langage => langage.name.includes(term));
			resolve(results);
		});
	}

	static isEmpty (data: Object): boolean {
		return Object.keys(data).length === 0;
	}

	static handleError (error: Error): void {
		console.error(error);
	}
}
