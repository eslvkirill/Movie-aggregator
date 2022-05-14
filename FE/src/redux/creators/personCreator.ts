import { createAsyncThunk } from '@reduxjs/toolkit';
import { PERSON_CREATOR } from 'redux/types/actionCreators';
import PersonService from 'components/features/Person/person.service';
import {
	onChangeFileInputEvent,
	onChangeInputEvent,
	prefillPersonForm,
	updatePerson,
} from 'redux/reducers/personReducer';
import { getImageFileByUrl } from 'shared/utils/common';

const service = PersonService;

const onChangeEventCreator = (payload: any) => (dispatch: any) => {
	payload.isInputFileField
		? dispatch(onChangeFileInputEvent(payload))
		: dispatch(onChangeInputEvent(payload));
};

const addPersonCreator = createAsyncThunk(
	PERSON_CREATOR.ADD,
	async (_, thunkAPI) => {
		try {
			const { person } = (thunkAPI.getState() as any).personReducer;

			const formData = Object.keys(person).reduce((formData, name) => {
				formData.append(name, person[name]);
				return formData;
			}, new FormData());

			return await service.addPerson(formData);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось добавить человека');
		}
	}
);

const updatePersonCreator = createAsyncThunk(
	PERSON_CREATOR.UPDATE,
	async (personId: string, thunkAPI) => {
		try {
			const { person } = (thunkAPI.getState() as any).personReducer;

			const formData = Object.keys(person).reduce((formData, name) => {
				if (name !== 'id') {
					formData.append(name, person[name]);
				}
				return formData;
			}, new FormData());

			return await service.updatePerson(personId, formData);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось обновить данные о человеке');
		}
	}
);

const getPersonCreator = createAsyncThunk(
	PERSON_CREATOR.GET,
	async (personId: string, thunkAPI) => {
		try {
			return await service.getPerson(personId);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось загрузить данные');
		}
	}
);

const deletePersonCreator = createAsyncThunk(
	PERSON_CREATOR.DELETE,
	async (personId: string, thunkAPI) => {
		try {
			return await service.deletePerson(personId);
		} catch (e) {
			return thunkAPI.rejectWithValue('Не удалось загрузить данные');
		}
	}
);

const setImageFilesCreator = createAsyncThunk(
	PERSON_CREATOR.SET_IMAGES,
	async (_, thunkAPI) => {
		try {
			const { person } = (thunkAPI.getState() as any).personReducer;
			const url = `data:image/*;base64,${person.image}`;

			return await getImageFileByUrl(url);
		} catch (e) {
			return thunkAPI.rejectWithValue(
				'Не удалось подгрузить изображение человека'
			);
		}
	}
);

const prefillPersonFormCreator = () => (dispatch: any) => {
	dispatch(prefillPersonForm());
	dispatch(updatePerson());
	dispatch(setImageFilesCreator());
};

export {
	onChangeEventCreator,
	addPersonCreator,
	updatePersonCreator,
	getPersonCreator,
	deletePersonCreator,
	setImageFilesCreator,
	prefillPersonFormCreator,
};
