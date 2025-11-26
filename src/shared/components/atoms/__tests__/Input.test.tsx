import { render, fireEvent } from '@testing-library/react-native';
import { Input } from '../Input';

describe('Input component', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText } = render(<Input placeholder='Test Input' />);
    expect(getByPlaceholderText('Test Input')).toBeTruthy();
  });

  it('should render with initial value', () => {
    const { getByDisplayValue } = render(<Input value='Initial value' />);
    expect(getByDisplayValue('Initial value')).toBeTruthy();
  });

  it('should call onChangeText when text changes', () => {
    const onChangeTextMock = jest.fn();
    const { getByPlaceholderText } = render(
      <Input placeholder='Type here' onChangeText={onChangeTextMock} />
    );

    fireEvent.changeText(getByPlaceholderText('Type here'), 'New text');
    expect(onChangeTextMock).toHaveBeenCalledWith('New text');
  });

  it('should apply secureTextEntry for password fields', () => {
    const { getByPlaceholderText } = render(<Input placeholder='Password' secureTextEntry />);

    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('should apply correct keyboardType', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder='Email' keyboardType='email-address' />
    );

    const input = getByPlaceholderText('Email');
    expect(input.props.keyboardType).toBe('email-address');
  });

  it('should apply correct autoCapitalize', () => {
    const { getByPlaceholderText } = render(<Input placeholder='Name' autoCapitalize='words' />);

    const input = getByPlaceholderText('Name');
    expect(input.props.autoCapitalize).toBe('words');
  });

  it('should have default styling classes', () => {
    const { getByPlaceholderText } = render(<Input placeholder='Test' />);
    const input = getByPlaceholderText('Test');

    expect(input.props.className).toContain('border');
    expect(input.props.className).toContain('rounded-lg');
    expect(input.props.className).toContain('bg-white');
  });

  it('should use medium size by default', () => {
    const { getByPlaceholderText } = render(<Input placeholder='Test' />);
    const input = getByPlaceholderText('Test');

    expect(input.props.className).toContain('p-3');
    expect(input.props.className).toContain('text-base');
  });

  it('should apply custom size', () => {
    const { getByPlaceholderText } = render(
      <Input placeholder='Custom' customSize={{ padding: 'p-6', textSize: 'text-2xl' }} />
    );

    const input = getByPlaceholderText('Custom');
    expect(input.props.className).toContain('p-6');
    expect(input.props.className).toContain('text-2xl');
  });

  it('should pass additional props to TextInput', () => {
    const testID = 'custom-input';
    const { getByTestId } = render(<Input testID={testID} placeholder='Test' />);

    expect(getByTestId(testID)).toBeTruthy();
  });

  it('should handle editable prop', () => {
    const { getByPlaceholderText } = render(<Input placeholder='Readonly' editable={false} />);

    const input = getByPlaceholderText('Readonly');
    expect(input.props.editable).toBe(false);
  });

  it('should handle maxLength prop', () => {
    const { getByPlaceholderText } = render(<Input placeholder='Limited' maxLength={10} />);

    const input = getByPlaceholderText('Limited');
    expect(input.props.maxLength).toBe(10);
  });
});
