import { TextInput } from 'react-native';

export function Input({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  customSize,
  ...props
}: {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  customSize?: { padding: string; textSize: string };
} & React.ComponentProps<typeof TextInput>) {
  // Configurações de tamanho padrão
  const sizeConfig = {
    small: { padding: 'p-2', textSize: 'text-sm' },
    medium: { padding: 'p-3', textSize: 'text-base' },
    large: { padding: 'p-4', textSize: 'text-lg' },
  };

  // Usa customSize se fornecido, senão usa o preset médio
  const { padding, textSize } = customSize || sizeConfig['medium'];

  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      className={`border border-gray-300 rounded-lg bg-white ${padding} ${textSize}`}
      {...props}
    />
  );
}
