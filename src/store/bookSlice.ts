import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface BookState {
	name: string;
	filter: string;
	sort: string;
	books: any;
	status: any;
	error: any;
}

interface fetchArgs {
	name: string;
	maxResults: number;
	startIndex: number;
}

const initialState: BookState = {
	name: '',
	filter: '',
	sort: '',
	books: [],
	status: null,
	error: null,
};

const keyApi = 'AIzaSyBuc0-k3tYorVv9FZXoqnVPwyPE3uuslds';

export const fetchBooks = createAsyncThunk(
	'books/fetchBooks',
	async (args: fetchArgs, thunkAPI) => {
		try {
			const response = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=${args.name}&maxResults=${args.maxResults}&startIndex=${args.startIndex}&key=${keyApi}`
			);

			if (response.status !== 200) {
				throw new Error('Server Error!');
			}

			return response.data.items;
		} catch (error: any) {
			return thunkAPI.rejectWithValue(error.message);
		}
	}
);

export const fetchFilteredBooks = createAsyncThunk(
	'books/fetchFilteredBooks',
	async (args: fetchArgs, { rejectWithValue, getState }: any) => {
		const filter = getState().books.filter;
		try {
			let response;

			if (filter === 'all') {
				response = await axios.get(
					`https://www.googleapis.com/books/v1/volumes?q=${args.name}&maxResults=${args.maxResults}&startIndex=${args.startIndex}&key=${keyApi}`
				);
			} else {
				response = await axios.get(
					`https://www.googleapis.com/books/v1/volumes?q=${args.name}+subject:${filter}&maxResults=${args.maxResults}&startIndex=${args.startIndex}&key=${keyApi}`
				);
			}

			if (response.status !== 200) {
				throw new Error('Server Error!');
			}

			return response.data.items;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

export const fetchSortedBooks = createAsyncThunk(
	'books/fetchSortedBooks',
	async (args: fetchArgs, { rejectWithValue, getState }: any) => {
		const sort = getState().books.sort;
		try {
			const response = await axios.get(
				`https://www.googleapis.com/books/v1/volumes?q=${args.name}&orderBy=${sort}&maxResults=${args.maxResults}&startIndex=${args.startIndex}&key=${keyApi}`
			);

			if (response.status !== 200) {
				throw new Error('Server Error!');
			}

			return response.data.items;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);

const bookSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		searchBookByName(state, action: PayloadAction<string>) {
			state.name = action.payload;
		},
		filterBooks(state, action: PayloadAction<string>) {
			state.filter = action.payload;
		},
		sortBooks(state, action: PayloadAction<string>) {
			state.sort = action.payload;
		},
		clearBooks(state) {
			state.books = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBooks.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchBooks.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.books.push(...action.payload);
			})
			.addCase(fetchBooks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(fetchFilteredBooks.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchFilteredBooks.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.books.push(...action.payload);
			})
			.addCase(fetchFilteredBooks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(fetchSortedBooks.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchSortedBooks.fulfilled, (state, action) => {
				state.status = 'resolved';
				state.books.push(...action.payload);
			})
			.addCase(fetchSortedBooks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			});
	},
});

export const { searchBookByName, filterBooks, sortBooks, clearBooks } =
	bookSlice.actions;
export default bookSlice.reducer;
