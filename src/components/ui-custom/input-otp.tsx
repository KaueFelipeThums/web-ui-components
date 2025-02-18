import React, { forwardRef, ReactElement } from 'react';
import { BaseInputOTP, BaseInputOTPGroup, BaseInputOTPSlot } from '@/components/ui';

type InputOTPProps = Omit<React.ComponentPropsWithoutRef<typeof BaseInputOTP>, 'render'>;

/**
 * Componente de input de OTP personalizado.
 *
 * @param {InputOTPProps}
 * @returns {ReactElement}
 */
const InputOTP = forwardRef<React.ComponentRef<typeof BaseInputOTP>, InputOTPProps>(
  ({ maxLength, ...props }, ref): ReactElement => {
    return (
      <BaseInputOTP ref={ref} maxLength={maxLength} {...props}>
        <BaseInputOTPGroup>
          {Array.from({ length: maxLength }, (_, index) => (
            <BaseInputOTPSlot key={index} index={index} />
          ))}
        </BaseInputOTPGroup>
      </BaseInputOTP>
    );
  },
);

InputOTP.displayName = 'InputOTP';

export { InputOTP };
