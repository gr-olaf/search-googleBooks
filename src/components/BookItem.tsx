import { Card } from 'react-bootstrap';

interface BookItemProps {
	img: string;
	category: string;
	title: string;
	author: string;
}

const BookItem = ({ img, category, title, author }: BookItemProps) => {
	return (
		<Card
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}
			border="secondary"
		>
			<Card.Img
				src={img}
				style={{
					height: '200px',
					width: 'auto',
					marginTop: '1rem',
					boxShadow: '10px 10px 10px grey',
				}}
			/>
			<Card.Body style={{ width: '230px', marginTop: '1rem' }}>
				<Card.Text style={{ textDecoration: 'underline', opacity: '50%' }}>
					{category}
				</Card.Text>
				<Card.Title style={{ fontSize: '1.1rem' }}>{title}</Card.Title>
				<Card.Text style={{ fontSize: '0.8rem', opacity: '50%' }}>
					{author}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default BookItem;
