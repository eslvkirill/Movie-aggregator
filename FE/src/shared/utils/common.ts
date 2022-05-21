const isUserLoggIn = (user: any) => Object.keys(user).length;

const movieConstructor = (data: any) => {
	return [
		...data.map((movie: any) => {
			Object.keys(movie).map((name) => {
				if (Array.isArray(movie[name]) && movie[name] !== 'poster') {
					movie[name] =
						name !== 'directors'
							? movie[name].map((value: any) => value.name).join(', ')
							: movie[name];
				} else if (name === 'duration') {
					const durationParts = movie[name].split(':');

					movie[name] = `${durationParts[0]}ч ${durationParts[1]}м`;
				}

				return movie[name];
			});

			return movie;
		}),
	];
};

const getImageFileByUrl = async (url: string) => {
	const res: Response = await fetch(url);
	const blob: Blob = await res.blob();

	return new File([blob], 'fileName', {
		type: 'image/png',
	});
};

const getAllMovieYears = (year: number) => {
	const years = [];

	for (let i = 1888; i <= year; ++i) {
		years.push(i);
	}

	return years.sort((a, b) => b - a);
};

export { isUserLoggIn, movieConstructor, getImageFileByUrl, getAllMovieYears };
