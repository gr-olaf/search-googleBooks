import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookState, FilterType, IResponse, SortType } from '../types/types';
import { fetchBooks } from '../services/fetchBooks';
import { fetchFilteredBooks } from '../services/fetchFilteredBooks';
import { fetchSortedBooks } from '../services/fetchSortedBooks';

const initialState: BookState = {
	totalItems: 0,
	name: '',
	filter: 'all',
	sort: 'relevance',
	books: [],
	status: null,
	error: null,
};

const bookSlice = createSlice({
	name: 'books',
	initialState,
	reducers: {
		searchBookByName(state, action: PayloadAction<string>) {
			state.name = action.payload;
		},
		filterBooks(state, action: PayloadAction<FilterType>) {
			state.filter = action.payload;
		},
		sortBooks(state, action: PayloadAction<SortType>) {
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
			.addCase(
				fetchBooks.fulfilled,
				(state, action: PayloadAction<IResponse>) => {
					state.status = 'resolved';
					state.books.push(...action.payload.items);
					state.totalItems = action.payload.totalItems;
				}
			)
			.addCase(fetchBooks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(fetchFilteredBooks.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(
				fetchFilteredBooks.fulfilled,
				(state, action: PayloadAction<IResponse>) => {
					state.status = 'resolved';
					state.books.push(...action.payload.items);
					state.totalItems = action.payload.totalItems;
				}
			)
			.addCase(fetchFilteredBooks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			})
			.addCase(fetchSortedBooks.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(
				fetchSortedBooks.fulfilled,
				(state, action: PayloadAction<IResponse>) => {
					state.status = 'resolved';
					state.books.push(...action.payload.items);
					state.totalItems = action.payload.totalItems;
				}
			)
			.addCase(fetchSortedBooks.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload;
			});
	},
});

export const { searchBookByName, filterBooks, sortBooks, clearBooks } =
	bookSlice.actions;
export default bookSlice.reducer;
