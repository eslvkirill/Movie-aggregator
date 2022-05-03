import { MovieFormFileds } from 'components/feature/Movie/movie.enum';

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

const setDefaultFieldsAppearanceAction = (movie: any) => {
	const customFieldNames: string[] = [
		MovieFormFileds.genres,
		MovieFormFileds.actors,
		MovieFormFileds.directors,
	];

	Object.keys(movie).map((name) => {
		if (
			Array.isArray(movie[name]) &&
			name !== MovieFormFileds.externalAggregatorsInfo
		) {
			movie[name] = movie[name]
				.map((field: any) =>
					customFieldNames.includes(name) ? field.name : field
				)
				.join(', ');
			if ([customFieldNames[1], customFieldNames[2]].includes(name)) {
				movie[name] = movie[name].split(', ').sort().join(', ');
			}
		} else if (name === MovieFormFileds.duration) {
			movie[name] = `${movie[name].hour}ч ${movie[name].minute}м`;
		}
		// else if (name === 'userRating' && movie[name] !== null) {
		// 	movie[name] = movie[name].value;
		// }
		return movie[name];
	});
};

const setBackgroundAction = (movieBackground: string) => {
	let style = {};

	if (movieBackground) {
		style = {
			backgroundImage: `linear-gradient(rgba(250, 250, 250, 0.1), rgba(0, 0, 0, 0.7)), 
        url("data:image/*;base64,${movieBackground}")`,
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
