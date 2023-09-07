import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import BookItem from '../BookItem/BookItem';
import { Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { fetchBooks } from '../../services/fetchBooks';
import styles from './BookList.module.scss';
import { Loader } from '../Loader/Loader';

const BookList = () => {
	const [index, setIndex] = useState(30);
	const name = useAppSelector((state) => state.books.name);
	const books = useAppSelector((state) => state.books.books);
	const totalItems = useAppSelector((state) => state.books.totalItems);
	const status = useAppSelector((state) => state.books.status);
	const dispatch = useAppDispatch();

	function handleClick() {
		setIndex(index + 30);
		dispatch(fetchBooks({ name, maxResults: 30, startIndex: index }));
	}

	if (!books.length && !name.trim().length) {
		return <h4 className={styles.prompt}>Search your book</h4>;
	}

	if (status === 'rejected') {
		return <h2>Error occured</h2>;
	}

	return (
		<div className={styles.listWrapper}>
			{status === 'loading' && <Loader />}
			{Boolean(totalItems) && (
				<p className={styles.total}>Found: {totalItems}</p>
			)}
			<div className={styles.list}>
				{books.map((item) => {
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
					<Loader />
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
