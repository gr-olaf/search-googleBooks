import { Spinner } from 'react-bootstrap';
import styles from './Loader.module.scss';

export const Loader = () => {
	return (
		<Spinner animation="border" role="status" className={styles.spinner}>
			<span className="visually-hidden">Loading...</span>
		</Spinner>
	);
};
