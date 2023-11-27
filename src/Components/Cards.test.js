import { fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Cards from './Cards';

 describe('Cards Component', () => {
 test('Sort button should not be visable in intial load', () => {
    render(<Cards />);
    const sortButton = screen.getByText("Sort");
    expect(sortButton).toBeInTheDocument();
  }); 

  test('Should accept only number as input', () => {
    render(<Cards />);

    const input = screen.getByPlaceholderText('Number')
    const value = 4
     fireEvent.change(input, {
        target: {value}
    })
    expect(input).toHaveValue(4) 
  });

  test('After Draw button clicked Sort button should be visable', async () => {
    render(<Cards />);

    const input = screen.getByPlaceholderText('Number')
    const value = 4
     fireEvent.change(input, {
        target: {value}
    })

    const drawButtonElement = screen.getByTestId("drawButton");
    act(() => fireEvent.click(drawButtonElement));
    //userEvent.click(drawButtonElement)

    const sortButton = await screen.getByText("Sort");
    expect(sortButton).toBeInTheDocument();
  });
});
