import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, ReactElement } from 'react';
import { Icon, IconName } from './icon';
import { BaseButton } from '@/components/ui';
import { cn } from '@/lib/utils';

const buttonIconVariants = cva('', {
  variants: {
    size: {
      default: '!h-4 !w-4',
      sm: '!h-3 !w-3',
      lg: '!h-4 !w-4',
      icon: '!h-4 !w-4',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type ButtonProps = React.ComponentProps<typeof BaseButton> &
  VariantProps<typeof buttonIconVariants> & {
    /** Ícone a ser exibido no botão. */
    icon?: IconName;

    /** Indica se o botão está em estado de carregamento. */
    loading?: boolean;

    /** Define a posição do ícone, pode ser 'left' ou 'right'. Padrão: 'left'. */
    iconPlacement?: 'left' | 'right';
  };

/**
 * Componente de botão customizado com suporte a ícones e carregamento.
 *
 * @param {ButtonProps}
 * @returns {ReactElement}
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, loading = false, disabled = false, size = 'default', icon, iconPlacement = 'left', ...props },
    ref,
  ): ReactElement => {
    const isIconSize = size === 'icon';

    const iconElement = loading ? (
      <Icon
        name="LoaderCircle"
        className={cn(
          'animate-spin',
          buttonIconVariants({ size }),
          isIconSize ? '' : iconPlacement === 'left' ? 'mr-2' : 'ml-2',
        )}
      />
    ) : (
      icon && (
        <Icon
          name={icon}
          className={cn(buttonIconVariants({ size }), isIconSize ? '' : iconPlacement === 'left' ? 'mr-2' : 'ml-2')}
        />
      )
    );

    return (
      <BaseButton {...props} disabled={disabled || loading} ref={ref} size={size}>
        {iconPlacement === 'left' && iconElement}
        {children}
        {iconPlacement === 'right' && iconElement}
      </BaseButton>
    );
  },
);

Button.displayName = 'Button';

export { Button };
