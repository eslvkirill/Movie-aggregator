import { createAsyncThunk } from '@reduxjs/toolkit';
import { PERSON_CREATOR } from 'redux/types/actionCreators';
import PersonService from 'components/features/Person/person.service';

const service = PersonService;

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

export { getPersonCreator, deletePersonCreator };
