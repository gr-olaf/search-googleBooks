import { DeepPartial } from '@reduxjs/toolkit';
import { BookState } from '../types/types';
import { searchBookByName } from './bookSlice';
import bookReducer from './bookSlice';

describe('bookSlice', () => {
	test('test searchBookByName', () => {
		const state: DeepPartial<BookState> = { name: 'test' };
		expect(bookReducer(state as BookState, searchBookByName('123'))).toEqual({
			name: '123',
		});
	});
});
