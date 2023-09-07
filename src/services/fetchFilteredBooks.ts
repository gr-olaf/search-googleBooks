import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, KEY_API } from '../consts/consts';
import { FetchArgs, IResponse, ThunkConfig } from '../types/types';

export const fetchFilteredBooks = createAsyncThunk<
	IResponse,
	FetchArgs,
	ThunkConfig
>('books/fetchFilteredBooks', async (args, thunkApi) => {
	const { rejectWithValue, getState } = thunkApi;
	const filter = getState().books.filter;
	try {
		let response;

		if (filter === 'all') {
			response = await axios.get<IResponse>(
				`${API_URL}?q=${args.name}&maxResults=${args.maxResults}&startIndex=${args.startIndex}&key=${KEY_API}`
			);
		} else {
			response = await axios.get<IResponse>(
				`${API_URL}?q=${args.name}+subject:${filter}&maxResults=${args.maxResults}&startIndex=${args.startIndex}&key=${KEY_API}`
			);
		}

		if (response.status !== 200) {
			throw new Error('Server Error!');
		}

		return response.data;
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});
