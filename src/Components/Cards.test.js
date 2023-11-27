import { fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cards from './Cards';

 describe('Cards Component', () => {
 test('Sort button should not be visable in intial load', () => {
    render(<Cards />);
    const sortButton = screen.getByText("Shuffle");
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
});
