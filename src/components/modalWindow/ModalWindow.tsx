import { Modal, Card } from 'react-bootstrap';
import styles from './modal.module.scss';

interface ModalWindowProps {
	show: boolean;
	handleClose: any;
	img: string;
	category: string[];
	title: string;
	author: string;
	description: string;
}

const ModalWindow = ({
	show,
	handleClose,
	img,
	category,
	title,
	author,
	description,
}: ModalWindowProps) => {
	return (
		<>
			<Modal show={show} onHide={handleClose} centered size="xl">
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<Card className={styles.modalCard}>
						<Card.Img src={img} className={styles.modalImage} />
						<Card.Body className={styles.modalBody}>
							<Card.Text>{category.join(', ')}</Card.Text>
							<Card.Title>{title}</Card.Title>
							<Card.Text>{author}</Card.Text>
							<Card.Text>{description}</Card.Text>
						</Card.Body>
					</Card>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ModalWindow;
