import { useState } from 'react';
import { Card } from 'react-bootstrap';
import ModalWindow from '../ModalWindow/ModalWindow';
import styles from './BookItem.module.scss';

interface BookItemProps {
	img: string;
	category: string[];
	title: string;
	author: string;
	description: string;
}

const BookItem = (props: BookItemProps) => {
	const { img, category, title, author, description } = props;
	const [show, setShow] = useState(false);

	const handleShow = () => {
		setShow(true);
	};
	const handleClose = () => {
		setShow(false);
	};

	return (
		<>
			<Card border="secondary" className={styles.card} onClick={handleShow}>
				<Card.Img src={img} className={styles.cardImage} />
				<Card.Body className={styles.cardBody}>
					<Card.Text className={styles.cardBodyCategory}>
						{category[0]}
					</Card.Text>
					<Card.Title className={styles.cardBodyTitle}>{title}</Card.Title>
					<Card.Text className={styles.cardBodyAuthor}>{author}</Card.Text>
				</Card.Body>
			</Card>
			<ModalWindow
				show={show}
				handleClose={handleClose}
				img={img}
				category={category}
				title={title}
				author={author}
				description={description}
			/>
		</>
	);
};

export default BookItem;
