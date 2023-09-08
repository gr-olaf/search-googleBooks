import { ChangeEvent } from 'react';
import { Row } from 'react-bootstrap';
import { filterList, sortList } from '../../consts/consts';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { fetchBooks } from '../../services/fetchBooks';
import { fetchFilteredBooks } from '../../services/fetchFilteredBooks';
import { fetchSortedBooks } from '../../services/fetchSortedBooks';
import {
	clearBooks,
	filterBooks,
	searchBookByName,
	sortBooks,
} from '../../store/bookSlice';
import { FilterType, SortType } from '../../types/types';
import { Input } from '../ui/Input/Input';
import { Select } from '../ui/Select/Select';
import styles from './SearchBar.module.scss';

const SearchBar = () => {
	const name = useAppSelector((state) => state.books.name);
	const filter = useAppSelector((state) => state.books.filter);
	const sort = useAppSelector((state) => state.books.sort);
	const dispatch = useAppDispatch();

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		dispatch(searchBookByName(e.target.value));
	}

	function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
		dispatch(filterBooks(e.target.value as FilterType));
		dispatch(clearBooks());
		dispatch(fetchFilteredBooks({ name, maxResults: 30, startIndex: 0 }));
	}

	function handleSort(e: ChangeEvent<HTMLSelectElement>) {
		dispatch(sortBooks(e.target.value as SortType));
		dispatch(clearBooks());
		dispatch(fetchSortedBooks({ name, maxResults: 30, startIndex: 0 }));
	}

	const searchBook = (e: any) => {
		if (name.trim().length && (e.key === 'Enter' || e.button == 0)) {
			dispatch(clearBooks());
			dispatch(fetchBooks({ name, maxResults: 30, startIndex: 0 }));
		}
	};

	return (
		<div className={styles.searchBar} data-testid="SearchBar">
			<h1>Search for Book</h1>
			<Input name={name} handleSearch={handleSearch} searchBook={searchBook} />
			<Row className="mt-3">
				<Select value={filter} onChange={handleFilter} list={filterList} />
				<Select value={sort} onChange={handleSort} list={sortList} />
			</Row>
		</div>
	);
};

export default SearchBar;
