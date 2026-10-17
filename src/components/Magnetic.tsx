import React, { cloneElement, isValidElement } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

interface MagneticProps {
  children: React.ReactElement;
  radius?: number;
  strength?: number;
  disabled?: boolean;
}

export const Magnetic: React.FC<MagneticProps> = ({
  children,
  radius = 60,
  strength = 0.28,
  disabled = false,
}) => {
  const ref = useMagnetic<HTMLElement>({ radius, strength, disabled });

  if (!isValidElement(children)) {
    return children;
  }

  return cloneElement(children as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>, {
    ref,
  });
};
