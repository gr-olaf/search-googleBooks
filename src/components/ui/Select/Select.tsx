import { Col, Form } from 'react-bootstrap';
import { FilterType, SortType } from '../../../types/types';
import { ChangeEvent } from 'react';

interface SelectProps {
	value: FilterType | SortType;
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
	list: string[];
}

export const Select = (props: SelectProps) => {
	const { value, onChange, list } = props;

	return (
		<Form.Group as={Col}>
			<Form.Label>Categories</Form.Label>
			<Form.Select value={value} onChange={onChange}>
				{list.map((item) => (
					<option key={item}>{item}</option>
				))}
			</Form.Select>
		</Form.Group>
	);
};
