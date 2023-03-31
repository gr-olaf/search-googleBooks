import { useAppDispatch, useAppSelector } from '../../store/hooks';
import BookItem from '../bookItem/BookItem';
import { Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { fetchBooks } from '../../store/bookSlice';
import styles from './bookList.module.css';

interface Item {
	id: string;
	volumeInfo: {
		imageLinks: {
			smallThumbnail: string;
		};
		categories: string[];
		title: string;
		authors: string[];
		description: string;
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
		<div className={styles.listWrapper}>
			{!books.length && !name.trim().length && (
				<h4 className={styles.prompt}>Search your book</h4>
			)}
			{status === 'loading' && (
				<Spinner animation="border" role="status" className={styles.spinner}>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			)}
			{status === 'rejected' && <h2>Error occured</h2>}
			<div className={styles.list}>
				{books.map((item: Item) => {
					const { id } = item;
					const { imageLinks, categories, title, authors, description } =
						item.volumeInfo;
					return (
						<BookItem
							key={id}
							img={imageLinks ? imageLinks.smallThumbnail : ''}
							category={categories ? categories : []}
							title={title}
							author={authors ? authors.join(', ') : ''}
							description={description ? description : ''}
						/>
					);
				})}
			</div>
			{books.length ? (
				status === 'loading' ? (
					<Spinner animation="border" role="status" className={styles.spinner}>
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				) : (
					<Button
						variant="secondary"
						className={styles.button}
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
