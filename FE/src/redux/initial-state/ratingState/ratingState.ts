import { RATING } from './rating.enum';

const ratingState = [
	{
		id: '',
		type: RATING.TOTAL,
		score: 0,
		averageScore: 0,
		name: 'Общее впечатление ',
		description: '',
	},
	{
		id: '',
		type: RATING.SCREENPLAY,
		score: 0,
		averageScore: 0,
		name: 'Сценарий',
		description: 'Сюжет, диалоги, неожиданные повороты',
	},
	{
		id: '',
		type: RATING.ACTING,
		score: 0,
		averageScore: 0,
		name: 'Актёрская игра',
		description: 'Актёрское мастерство',
	},
	{
		id: '',
		type: RATING.SHOOTING,
		score: 0,
		averageScore: 0,
		name: 'Съёмка',
		description: 'Операторская работа, монтаж',
	},
	{
		id: '',
		type: RATING.DECORATION,
		score: 0,
		averageScore: 0,
		name: 'Художественное оформление',
		description:
			'Оформление фильма, сочетание цветов, декорации, костюмы, грим',
	},
	{
		id: '',
		type: RATING.SOUNDTRACK,
		score: 0,
		averageScore: 0,
		name: 'Звуковое сопровождение',
		description: 'Музыка, звуковые эффекты',
	},
	{
		id: '',
		type: RATING.SPECIAL_EFFECTS,
		score: 0,
		averageScore: 0,
		name: 'Спецэффекты',
		description: 'Визуальные графические и механические эффекты',
	},
	{
		id: '',
		type: RATING.ATMOSPHERE,
		score: 0,
		averageScore: 0,
		name: 'Атмосферность',
		description: 'Погружение/вовлечение в фильм, обстановка, настроение',
	},
	// { id: '', type: RATING.EMOTIONAL_EFFECT, score: 0, averageScore: 0, name: 'Эмоциональный эффект', description: '' },
];

export { ratingState };
