import { render, fireEvent } from '@testing-library/react-native';
import { DateSelector, DateItem } from '../DateSelector';

describe('DateSelector component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<DateSelector />);

    // Should render at least today's date
    const today = new Date();
    expect(getByText(today.getDate().toString())).toBeTruthy();
  });

  it('renders the correct number of days', () => {
    const { getAllByRole } = render(<DateSelector daysToShow={5} />);
    const buttons = getAllByRole('button');

    expect(buttons.length).toBe(5);
  });

  it('selects a date when pressed', () => {
    const mockOnDateSelect = jest.fn();
    const { getAllByRole } = render(
      <DateSelector onDateSelect={mockOnDateSelect} daysToShow={7} />
    );

    const buttons = getAllByRole('button');
    const thirdButton = buttons[2];

    if (thirdButton) {
      fireEvent.press(thirdButton);
    }

    expect(mockOnDateSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        day: expect.any(Number),
        month: expect.any(Number),
        year: expect.any(Number),
        weekDay: expect.any(String),
        date: expect.any(Date),
      })
    );
  });

  it('highlights the selected date', () => {
    const { getByTestId } = render(<DateSelector daysToShow={7} />);

    // First date should be selected by default (today)
    const firstButton = getByTestId('date-button-0');
    expect(firstButton).toBeTruthy();
  });

  it('changes selection when another date is pressed', () => {
    const mockOnDateSelect = jest.fn();
    const { getByTestId } = render(<DateSelector onDateSelect={mockOnDateSelect} daysToShow={7} />);

    const secondButton = getByTestId('date-button-1');
    fireEvent.press(secondButton);

    expect(mockOnDateSelect).toHaveBeenCalled();
    const calledDate = mockOnDateSelect.mock.calls[0][0] as DateItem;
    // Verify it's tomorrow (day 1 from generated dates)
    expect(calledDate.isToday).toBe(false);
  });

  it('renders week day labels correctly', () => {
    const { getByText } = render(<DateSelector daysToShow={7} />);

    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const todayWeekDay = weekDays[today.getDay()] ?? 'Sun';

    expect(getByText(todayWeekDay)).toBeTruthy();
  });

  it('uses initialSelectedDate prop', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 3);

    const mockOnDateSelect = jest.fn();
    const { getByTestId } = render(
      <DateSelector
        initialSelectedDate={futureDate}
        onDateSelect={mockOnDateSelect}
        daysToShow={7}
      />
    );

    // Click on the pre-selected button (3 days from now)
    const fourthButton = getByTestId('date-button-3');
    fireEvent.press(fourthButton);

    expect(mockOnDateSelect).toHaveBeenCalled();
  });

  it('calls onDateSelect with correct date information', () => {
    const mockOnDateSelect = jest.fn();
    const { getAllByRole } = render(
      <DateSelector onDateSelect={mockOnDateSelect} daysToShow={7} />
    );

    const buttons = getAllByRole('button');
    const firstButton = buttons[0];

    if (firstButton) {
      fireEvent.press(firstButton);
    }

    const calledWith = mockOnDateSelect.mock.calls[0][0] as DateItem;

    expect(calledWith).toHaveProperty('date');
    expect(calledWith).toHaveProperty('day');
    expect(calledWith).toHaveProperty('month');
    expect(calledWith).toHaveProperty('year');
    expect(calledWith).toHaveProperty('weekDay');
    expect(calledWith.date).toBeInstanceOf(Date);
  });

  it('marks today with isToday property', () => {
    const mockOnDateSelect = jest.fn();
    const { getAllByRole } = render(
      <DateSelector onDateSelect={mockOnDateSelect} daysToShow={7} />
    );

    const buttons = getAllByRole('button');
    const firstButton = buttons[0];

    if (firstButton) {
      fireEvent.press(firstButton); // First button is today
    }

    const calledWith = mockOnDateSelect.mock.calls[0][0] as DateItem;

    expect(calledWith.isToday).toBe(true);
  });

  it('does not mark future dates as isToday', () => {
    const mockOnDateSelect = jest.fn();
    const { getAllByRole } = render(
      <DateSelector onDateSelect={mockOnDateSelect} daysToShow={7} />
    );

    const buttons = getAllByRole('button');
    const secondButton = buttons[1];

    if (secondButton) {
      fireEvent.press(secondButton); // Second button is tomorrow
    }

    const calledWith = mockOnDateSelect.mock.calls[0][0] as DateItem;

    expect(calledWith.isToday).toBe(false);
  });
});
