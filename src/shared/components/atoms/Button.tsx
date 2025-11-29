import { Pressable, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = React.ComponentProps<typeof Pressable> & {
  title?: string;
  variant?: 'primary' | 'secondary';
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconPosition?: 'left' | 'right';
  iconOnly?: boolean;
  size?: 'small' | 'medium' | 'large';
  textColor?: string;
  iconColor?: string;
  customSize?: {
    padding?: string;
    iconSize?: number;
    textSize?: string;
  };
};

const Button = ({
  title,
  variant = 'primary',
  icon,
  iconPosition = 'left',
  iconOnly = false,
  size = 'medium',
  textColor: customTextColor,
  iconColor: customIconColor,
  customSize,
  ...props
}: Props) => {
  // Configurações de tamanho padrão
  const sizeConfig = {
    small: { padding: 'p-2', iconSize: 18, textSize: 'text-sm' },
    medium: { padding: 'p-3', iconSize: 20, textSize: 'text-base' },
    large: { padding: 'p-4', iconSize: 24, textSize: 'text-lg' },
  };

  // Usa customSize se fornecido, senão usa o preset
  const { padding, iconSize, textSize } = customSize || sizeConfig[size];

  // Classes base
  const baseClasses = iconOnly
    ? `rounded-full ${padding} items-center justify-center active:opacity-80`
    : `rounded-lg py-3 px-4 items-center active:opacity-80`;

  const styles =
    variant === 'primary'
      ? `${baseClasses} bg-primary text-on-primary`
      : `${baseClasses} bg-surface-variant text-on-surface`;

  // Cores padrão baseadas na variante, ou customizadas
  const defaultTextColor = variant === 'primary' ? '#FFFFFF' : '#49454F';
  const textColor = customTextColor || defaultTextColor;
  const iconColor = customIconColor || textColor;

  // Botão só com ícone
  if (iconOnly && icon) {
    return (
      <Pressable {...props} className={styles}>
        <MaterialIcons name={icon} size={iconSize} color={iconColor} />
      </Pressable>
    );
  }

  // Botão com texto e opcionalmente ícone
  const content = (
    <>
      {icon && iconPosition === 'left' && (
        <MaterialIcons name={icon} size={iconSize} color={iconColor} />
      )}
      {title && (
        <Text className={`font-medium ${textSize || 'text-base'}`} style={{ color: textColor }}>
          {title}
        </Text>
      )}
      {icon && iconPosition === 'right' && (
        <MaterialIcons name={icon} size={iconSize} color={iconColor} />
      )}
    </>
  );

  return (
    <Pressable {...props} className={styles}>
      {icon && title ? <View className='flex-row items-center gap-2'>{content}</View> : content}
    </Pressable>
  );
};

export default Button;
