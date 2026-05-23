'use client';

import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import clsx from 'clsx';

type Variant = 'primary' | 'gold' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type CommonProps = {
  variant?: Variant;
  size?: Size;
  pill?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
  className?: string;
};

const base =
  'inline-flex items-center justify-center gap-2.5 font-sans font-semibold tracking-[0.01em] transition-all duration-200 active:scale-[0.97] disabled:opacity-55 disabled:pointer-events-none select-none';

const sizes: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-12 px-[22px] text-[15px]',
  lg: 'h-14 px-7 text-base',
};

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-primary-fg shadow-[0_8px_24px_rgba(31,138,85,0.35)] hover:bg-primary/90 hover:shadow-[0_10px_28px_rgba(31,138,85,0.45)]',
  gold:
    'text-accent-fg bg-[linear-gradient(120deg,#F2C95C_0%,#E8B84A_50%,#B8842A_100%)] bg-[length:200%_100%] hover:bg-[position:100%_0] shadow-[0_8px_24px_rgba(232,184,74,0.3)]',
  outline:
    'bg-transparent text-foreground border border-border-strong hover:border-accent/60 hover:bg-surface-elevated/40',
  ghost: 'bg-transparent text-foreground hover:bg-surface-elevated/60',
};

function buildClass(props: CommonProps) {
  const { variant = 'primary', size = 'md', pill = true, fullWidth, className } = props;
  return clsx(
    base,
    sizes[size],
    variants[variant],
    pill ? 'rounded-full' : 'rounded-md',
    fullWidth && 'w-full',
    className,
  );
}

export const Button = forwardRef<
  HTMLButtonElement,
  CommonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(
  { leftIcon, rightIcon, children, variant, size, pill, fullWidth, className, ...rest },
  ref,
) {
  const cls = buildClass({ variant, size, pill, fullWidth, className });
  return (
    <button ref={ref} {...rest} className={cls}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
});

type LinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export const ButtonLink = forwardRef<HTMLAnchorElement, LinkProps>(function ButtonLink(
  { leftIcon, rightIcon, children, variant, size, pill, fullWidth, className, ...rest },
  ref,
) {
  const cls = buildClass({ variant, size, pill, fullWidth, className });
  return (
    <a ref={ref} {...rest} className={cls}>
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  );
});
