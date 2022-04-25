export interface Genre {
	id: string;
	name: string;
	open?: boolean;
}

export interface GenresProperties {
	genres: Genre[];
	editAction: any;
	saveAction: any;
	updateGenre: any;
	deleteGenre: any;
	dropdown: boolean;
	disabled?: boolean;
}

export interface GenreControls {
	genreInput: any;
}
