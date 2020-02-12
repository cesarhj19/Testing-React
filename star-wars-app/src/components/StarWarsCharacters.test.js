import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api');

test('renders characters and buttons functional', async () => {
	mockGetData.mockResolvedValue({
		id: 1,
		next: 'https://swapi.co/a[i/people',
		previous: 'https://swapi.co/api/people',
		results: [
			{
				name: 'Luke Skywalker',
				url: 'Test1'
			},
			{
				name: 'Han Solo',
				url: 'Test2'
			}
		]
	});

	const { getByText } = render(<StarWarsCharacters />);
	fireEvent.click(getByText('Next'), getByText('Previous'));
	expect(mockGetData).toHaveBeenCalledTimes(1);
	await wait(() => {
		getByText(/Next/i);
		getByText(/Previous/i);
	});
});
