import { FilmFormFileds } from 'components/feature/Film/FilmForm/filmForm.enum';

const setAggregatorsRatingsOnGeneralViewAction = (aggregators: any) => {
	aggregators.map((aggregator: any) => {
		const name = aggregator.url.split('.')[1];

		aggregator.name = name.charAt(0).toUpperCase() + name.slice(1);

		if (aggregator.name === 'Metacritic') {
			aggregator.rating /= 10;
		}

		return aggregator;
	});
};

const sortAggregatorsAction = (aggregators: any) => {
	aggregators.sort((present: any, next: any) =>
		present.name > next.name ? 1 : -1
	);

	[aggregators[0], aggregators[1]] = [aggregators[1], aggregators[0]];
};

const setDefaultFieldsAppearanceAction = (film: any) => {
	const customFieldNames: string[] = [
		FilmFormFileds.genres,
		FilmFormFileds.actors,
		FilmFormFileds.directors,
	];

	Object.keys(film).map((name) => {
		if (
			Array.isArray(film[name]) &&
			name !== FilmFormFileds.externalAggregatorsInfo
		) {
			film[name] = film[name]
				.map((field: any) =>
					customFieldNames.includes(name) ? field.name : field
				)
				.join(', ');
			if ([customFieldNames[1], customFieldNames[2]].includes(name)) {
				film[name] = film[name].split(', ').sort().join(', ');
			}
		} else if (name === FilmFormFileds.duration) {
			film[name] = `${film[name].hour}ч ${film[name].minute}м`;
		}
		// else if (name === 'userRating' && film[name] !== null) {
		// 	film[name] = film[name].value;
		// }
		return film[name];
	});
};

const setBackgroundAction = (filmBackground: string) => {
	let style = {};

	if (filmBackground) {
		style = {
			backgroundImage: `linear-gradient(rgba(250, 250, 250, 0.1), rgba(0, 0, 0, 0.7)), 
        url("data:image/*;base64,${filmBackground}")`,
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			backgroundRepeat: 'no-repeat',
		};
	}
	return style;
};

export {
	setAggregatorsRatingsOnGeneralViewAction,
	sortAggregatorsAction,
	setDefaultFieldsAppearanceAction,
	setBackgroundAction,
};
