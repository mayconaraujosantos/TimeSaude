import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';

describe('Button Component', () => {
  it('should render with title', () => {
    const { getByText } = render(<Button title='Test Button' />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('should render with primary variant by default', () => {
    const { getByText } = render(<Button title='Primary' />);
    const button = getByText('Primary').parent?.parent;

    // Verifica se tem as classes de primary
    expect(button?.props.className).toContain('bg-primary');
  });

  it('should render with secondary variant', () => {
    const { getByText } = render(<Button title='Secondary' variant='secondary' />);
    const button = getByText('Secondary').parent?.parent;

    // Verifica se tem as classes de secondary
    expect(button?.props.className).toContain('bg-surface-variant');
  });

  it('should call onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title='Click Me' onPress={onPressMock} />);

    fireEvent.press(getByText('Click Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('should not call onPress when disabled', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title='Disabled' onPress={onPressMock} disabled />);

    fireEvent.press(getByText('Disabled'));
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('should have correct base classes', () => {
    const { getByText } = render(<Button title='Test' />);
    const button = getByText('Test').parent?.parent;

    expect(button?.props.className).toContain('rounded-lg');
    expect(button?.props.className).toContain('py-3');
    expect(button?.props.className).toContain('px-4');
    expect(button?.props.className).toContain('items-center');
  });

  it('should pass additional props to Pressable', () => {
    const testID = 'custom-button';
    const { getByTestId } = render(<Button title='Test' testID={testID} />);

    expect(getByTestId(testID)).toBeTruthy();
  });

  it('should have accessible text', () => {
    const { getByText } = render(<Button title='Accessible Button' />);
    const text = getByText('Accessible Button');

    expect(text.props.className).toContain('font-medium');
  });
});
