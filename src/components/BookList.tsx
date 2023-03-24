import { useAppDispatch, useAppSelector } from '../store/hooks';
import BookItem from './BookItem';
import { Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { fetchBooks } from '../store/bookSlice';

interface Item {
	id: string;
	volumeInfo: {
		imageLinks: {
			smallThumbnail: string;
		};
		categories: string[];
		title: string;
		authors: string[];
	};
}

const BookList = () => {
	const [index, setIndex] = useState(30);

	const name = useAppSelector((state) => state.books.name);
	const books = useAppSelector((state) => state.books.books);
	const { status, error } = useAppSelector((state) => state.books);
	const dispatch = useAppDispatch();

	function handleClick() {
		setIndex(index + 30);
		dispatch(fetchBooks({ name, maxResults: 30, startIndex: index }));
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
			}}
		>
			{!books.length && !name.trim().length && (
				<h4 style={{ textAlign: 'center', marginTop: '2rem' }}>
					Search your book
				</h4>
			)}
			{status === 'loading' && (
				<Spinner
					animation="border"
					role="status"
					style={{ marginInline: 'auto', marginTop: '2rem' }}
				>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}
			{status === 'rejected' && <h2>Error occured</h2>}
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, 250px)',
					gap: '0.5rem',
					marginBlock: '2rem',
					justifyContent: 'center',
				}}
			>
				{books.map((item: Item) => {
					const { id } = item;
					const { imageLinks, categories, title, authors } = item.volumeInfo;
					return (
						<BookItem
							key={id}
							img={imageLinks ? imageLinks.smallThumbnail : ''}
							category={categories ? categories[0] : ''}
							title={title}
							author={authors ? authors.join(', ') : ''}
						/>
					);
				})}
			</div>
			{books.length ? (
				status === 'loading' ? (
					<Spinner
						animation="border"
						role="status"
						style={{ marginInline: 'auto', marginBottom: '1rem' }}
					>
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				) : (
					<Button
						variant="secondary"
						style={{ marginInline: 'auto', marginBottom: '1rem' }}
						onClick={handleClick}
					>
						Load more
					</Button>
				)
			) : (
				''
			)}
		</div>
	);
};

export default BookList;
