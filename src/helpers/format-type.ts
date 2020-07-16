const formatType = (type: string): string => {
	let color: string;

	switch (type) {
		case "Orienté objet":
			color = "red darken-3";
			break;
		case "Librairie":
			color = "teal darken-1";
			break;
		case "Mobile":
			color = " blue darken-3";
			break;

		case "Paradigme":
			color = " yellow darken-2";
			break;

		case "Framework":
			color = "green accent-2";
			break;

		default:
			color = "grey";
			break;
	}

	return `chip ${color}`;
};

export default formatType;
