import { Card } from 'react-bootstrap';
import styles from './bookItem.module.css';

interface BookItemProps {
	img: string;
	category: string;
	title: string;
	author: string;
}

const BookItem = ({ img, category, title, author }: BookItemProps) => {
	return (
		<Card border="secondary" className={styles.card}>
			<Card.Img src={img} className={styles.cardImage} />
			<Card.Body className={styles.cardBody}>
				<Card.Text className={styles.cardBodyCategory}>{category}</Card.Text>
				<Card.Title className={styles.cardBodyTitle}>{title}</Card.Title>
				<Card.Text className={styles.cardBodyAuthor}>{author}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default BookItem;
