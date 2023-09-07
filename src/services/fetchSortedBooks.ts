import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FetchArgs, IResponse, ThunkConfig } from '../types/types';
import { API_URL, KEY_API } from '../consts/consts';

export const fetchSortedBooks = createAsyncThunk<
	IResponse,
	FetchArgs,
	ThunkConfig
>('books/fetchSortedBooks', async (args, thunkApi) => {
	const { rejectWithValue, getState } = thunkApi;
	const sort = getState().books.sort;
	try {
		const response = await axios.get<IResponse>(
			`${API_URL}?q=${args.name}&orderBy=${sort}&maxResults=${args.maxResults}&startIndex=${args.startIndex}&key=${KEY_API}`
		);

		if (response.status !== 200) {
			throw new Error('Server Error!');
		}

		return response.data;
	} catch (error: any) {
		return rejectWithValue(error.message);
	}
});
