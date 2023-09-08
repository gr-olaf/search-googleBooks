import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { componentRender } from '../../lib/tests/componentRender';
import SearchBar from './SearchBar';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SearchBar', () => {
	test('Has been rendered', () => {
		componentRender(<SearchBar />);
		expect(screen.getByTestId('SearchBar')).toBeInTheDocument();
	});

	test('Value changes in input', async () => {
		componentRender(<SearchBar />);

		const input = screen.getByTestId('Input');

		await userEvent.clear(input);
		await userEvent.type(input, '123');
		expect(input).toHaveValue('123');
	});

	test('Request should be send', async () => {
		mockedAxios.get.mockImplementation(() => Promise.resolve({ data: {} }));
		componentRender(<SearchBar />);
		await userEvent.click(screen.getByTestId('InputButton'));
		expect(mockedAxios.get).toHaveBeenCalled();
	});
});
