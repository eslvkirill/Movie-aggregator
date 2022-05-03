import { Genre } from 'components/features/Genre/genre.interface';

export interface GenreState {
	genres: Genre[];
	isLoading: boolean;
	error: string;
}
