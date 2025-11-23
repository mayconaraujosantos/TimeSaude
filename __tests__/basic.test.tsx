import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

// Simple component for testing
const CustomText = ({ children }: { children: string }) => <Text>{children}</Text>;

describe('Jest Expo Configuration', () => {
  test('should render text correctly', () => {
    const { getByText } = render(<CustomText>Welcome!</CustomText>);

    expect(getByText('Welcome!')).toBeTruthy();
  });

  test('basic math should work', () => {
    expect(2 + 2).toBe(4);
  });
});
