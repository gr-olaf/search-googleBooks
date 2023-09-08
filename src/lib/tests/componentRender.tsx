import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { ReactNode } from 'react';

export function componentRender(component: ReactNode) {
	return render(<Provider store={store}>{component}</Provider>);
}
