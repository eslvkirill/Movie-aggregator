const prefillRatingScoreAction = (ratings: any, movie: any) => {
	const { userRatings } = movie;

	userRatings &&
		userRatings.map((rating: any) => {
			ratings.map((stateRating: any) => {
				if (stateRating.type === rating.ratingType) {
					stateRating.score = rating.score;
					stateRating.id = rating.id;
				}

				return stateRating;
			});

			return ratings;
		});
};

const prefillAverageRatingScoreAction = (ratings: any, movie: any) => {
	const { averageRatings } = movie;

	averageRatings &&
		averageRatings.map((rating: any) => {
			ratings.map((stateRating: any) => {
				if (stateRating.type === rating.ratingType) {
					stateRating.averageScore = rating.averageScore;
				}

				return stateRating;
			});

			return ratings;
		});
};

export { prefillRatingScoreAction, prefillAverageRatingScoreAction };
