import { icons, LucideProps } from 'lucide-react';
import { forwardRef, ReactElement } from 'react';

type IconName = keyof typeof icons;

type IconProps = LucideProps & {
  /** Nome da chave do ícone. */
  name: IconName;
};

/**
 * Componente de ícone.
 *
 * @param {IconProps}
 * @returns {ReactElement}
 */
const Icon = forwardRef<SVGSVGElement, IconProps>(({ name, ...props }, ref): ReactElement => {
  const LucideIcon = icons[name];
  return <LucideIcon ref={ref} {...props} />;
});

Icon.displayName = 'Icon';

export { Icon, type IconName };
