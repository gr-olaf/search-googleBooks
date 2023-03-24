import { ChangeEvent, useState } from 'react';
import { Form, Button, InputGroup, Row, Col } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import {
	clearBooks,
	fetchBooks,
	fetchFilteredBooks,
	fetchSortedBooks,
	filterBooks,
	searchBookByName,
	sortBooks,
} from '../store/bookSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const filterList = [
	'all',
	'art',
	'biography',
	'computers',
	'history',
	'medical',
	'poetry',
];
const sortList = ['relevance', 'newest'];

const SearchBar = () => {
	const name = useAppSelector((state) => state.books.name);
	const filter = useAppSelector((state) => state.books.filter);
	const sort = useAppSelector((state) => state.books.sort);
	const dispatch = useAppDispatch();

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		dispatch(searchBookByName(e.target.value));
	}

	function handleFilter(e: ChangeEvent<HTMLSelectElement>) {
		dispatch(filterBooks(e.target.value));
		dispatch(clearBooks());
		dispatch(fetchFilteredBooks({ name, maxResults: 30, startIndex: 0 }));
	}

	function handleSort(e: ChangeEvent<HTMLSelectElement>) {
		dispatch(sortBooks(e.target.value));
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
		<div
			style={{
				margin: '0 auto',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h1>Search for Book</h1>
			<InputGroup style={{ width: '50%' }}>
				<Form.Control
					type="text"
					placeholder="Enter name of the book"
					value={name}
					onChange={handleSearch}
					onKeyDown={searchBook}
				/>
				<Button variant="outline-secondary" onMouseDown={searchBook}>
					<AiOutlineSearch />
				</Button>
			</InputGroup>
			<Row className="mt-3">
				<Form.Group as={Col}>
					<Form.Label>Categories</Form.Label>
					<Form.Select value={filter} onChange={handleFilter}>
						{filterList.map((item) => (
							<option key={item}>{item}</option>
						))}
					</Form.Select>
				</Form.Group>
				<Form.Group as={Col}>
					<Form.Label>Sorting by</Form.Label>
					<Form.Select value={sort} onChange={handleSort}>
						{sortList.map((item) => (
							<option key={item}>{item}</option>
						))}
					</Form.Select>
				</Form.Group>
			</Row>
		</div>
	);
};

export default SearchBar;
