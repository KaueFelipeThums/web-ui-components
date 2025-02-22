import { forwardRef, ReactElement, ReactNode } from 'react';
import { BaseAvatar, BaseAvatarImage, BaseAvatarFallback } from '@/components/ui';

type AvatarProps = React.ComponentProps<typeof BaseAvatar> & {
  /** URL da imagem do avatar.*/
  src?: string;

  /** Texto alternativo para a imagem.*/
  alt?: string;

  /** Fallback ou conteúdo alternativo quando a imagem não está disponível. */
  fallback?: ReactNode;

  /** Classe CSS personalizada para a imagem do avatar. */
  imageClassName?: string;

  /** Classe CSS personalizada para o fallback do avatar. */
  fallbackClassName?: string;
};

/**
 * Componente de avatar personalizado, utilizado para exibir imagens de perfil ou ícones em miniatura.
 *
 * @param {AvatarProps}
 * @returns {ReactElement}
 */
const Avatar = forwardRef<React.ComponentRef<typeof BaseAvatar>, AvatarProps>(
  ({ src, alt, fallback, imageClassName, fallbackClassName, ...props }, ref): ReactElement => {
    return (
      <BaseAvatar ref={ref} {...props}>
        {src && <BaseAvatarImage className={imageClassName} src={src} alt={alt} referrerPolicy="no-referrer" />}
        <BaseAvatarFallback className={fallbackClassName}>{fallback}</BaseAvatarFallback>
      </BaseAvatar>
    );
  },
);

Avatar.displayName = 'Avatar';

export { Avatar };
