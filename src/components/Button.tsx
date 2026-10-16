import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 select-none disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-fg text-bg hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px_rgba(124,134,255,0.65)]',
  secondary:
    'border border-line-strong bg-white/[0.03] text-fg hover:-translate-y-0.5 hover:border-accent/60 hover:bg-white/[0.07]',
  ghost: 'text-muted hover:text-fg',
};

interface CommonProps {
  variant?: Variant;
  icon?: ReactNode;
  /** Show the small arrow that nudges on hover. */
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}

type AnchorProps = CommonProps & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>;

export function Button(props: AnchorProps | NativeButtonProps) {
  const { variant = 'primary', icon, arrow = false, children, className, ...rest } = props;
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {icon}
      <span>{children}</span>
      {arrow && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if ('href' in rest && rest.href !== undefined) {
    const { href, target, rel, ...anchorRest } = rest as Omit<AnchorProps, keyof CommonProps>;
    const external = /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        target={target ?? (external ? '_blank' : undefined)}
        rel={rel ?? (external ? 'noopener noreferrer' : undefined)}
        className={classes}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }
  const { type = 'button', ...buttonRest } = rest as Omit<NativeButtonProps, keyof CommonProps>;
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  );
}
