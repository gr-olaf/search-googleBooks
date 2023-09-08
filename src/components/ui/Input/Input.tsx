import { ChangeEvent } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';

interface InputProps {
	name: string;
	handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
	searchBook: (e: any) => void;
}

export const Input = (props: InputProps) => {
	const { name, handleSearch, searchBook } = props;

	return (
		<InputGroup style={{ width: '50%' }}>
			<Form.Control
				type="text"
				placeholder="Enter name of the book"
				value={name}
				onChange={handleSearch}
				onKeyDown={searchBook}
				data-testid="Input"
			/>
			<Button
				variant="outline-secondary"
				onMouseDown={searchBook}
				data-testid="InputButton"
			>
				<AiOutlineSearch />
			</Button>
		</InputGroup>
	);
};
