import { screen } from '@testing-library/react';
import App from '../App';
import { componentRender } from '../lib/tests/componentRender';

describe('App', () => {
	test('Test render', () => {
		componentRender(<App />);
		expect(screen.getByTestId('app')).toBeInTheDocument();
	});
});
