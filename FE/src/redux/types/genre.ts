import { Genre } from 'components/feature/Genre/genre.interface';

export interface GenreState {
	genres: Genre[];
	isLoading: boolean;
	error: string;
}
