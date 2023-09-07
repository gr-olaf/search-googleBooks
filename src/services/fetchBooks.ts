import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL, KEY_API } from '../consts/consts';
import { FetchArgs, IResponse, ThunkConfig } from '../types/types';

export const fetchBooks = createAsyncThunk<IResponse, FetchArgs, ThunkConfig>(
	'books/fetchBooks',
	async (args, thunkAPI) => {
		try {
			const response = await axios.get<IResponse>(
				`${API_URL}?q=${args.name}&maxResults=${args.maxResults}&startIndex=${args.startIndex}&key=${KEY_API}`
			);

			console.log(response);

			if (response.status !== 200) {
				throw new Error('Server Error!');
			}

			return response.data;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);
