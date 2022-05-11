enum RATINGS {
	TOTAL = 'TOTAL',
	SCREENPLAY = 'SCREENPLAY',
	ACTING = 'ACTING',
	SHOOTING = 'SHOOTING',
	DECORATION = 'DECORATION',
	SOUNDTRACK = 'SOUNDTRACK',
	SPECIAL_EFFECTS = 'SPECIAL_EFFECTS',
	ATMOSPHERE = 'ATMOSPHERE',
	EMOTIONAL_EFFECT = 'EMOTIONAL_EFFECT',
}

const ratingListCategories = [
	// { type: RATINGS.TOTAL, name: 'Общее впечатление ', description: '' },
	{
		type: RATINGS.SCREENPLAY,
		name: 'Сценарий',
		description: 'Сюжет, диалоги, неожиданные повороты',
	},
	{
		type: RATINGS.ACTING,
		name: 'Актёрская игра',
		description: 'Актёрское мастерство',
	},
	{
		type: RATINGS.SHOOTING,
		name: 'Съёмка',
		description: 'Операторская работа, монтаж ',
	},
	{
		type: RATINGS.DECORATION,
		name: 'Художественное оформление',
		description:
			'Оформление фильма, сочетание цветов, декорации, костюмы, грим',
	},
	{
		type: RATINGS.SOUNDTRACK,
		name: 'Звуковое сопровождение',
		description: 'Музыка, звуковые эффекты',
	},
	{
		type: RATINGS.SPECIAL_EFFECTS,
		name: 'Спецэффекты',
		description: 'Визуальные графические и механические эффекты',
	},
	{
		type: RATINGS.ATMOSPHERE,
		name: 'Атмосферность',
		description: 'Погружение/вовлечение в фильм, обстановка, настроение',
	},
	// { type: RATINGS.EMOTIONAL_EFFECT, name: 'Эмоциональный эффект', description: '' },
];

export { RATINGS, ratingListCategories };
