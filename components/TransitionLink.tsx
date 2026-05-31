"use client";

import Link, { type LinkProps } from "next/link";
import { type MouseEvent, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./PageTransition";

type Props = LinkProps & {
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  ariaLabel?: string;
  target?: string;
};

/**
 * Drop-in replacement for next/link that plays a brief archetype-color
 * panel-wipe page transition. Falls back to a plain navigation when:
 *  - the user is targeting the same path
 *  - the link opens in a new tab
 *  - the user holds a modifier key (cmd/ctrl/shift)
 */
export function TransitionLink({
  href,
  children,
  className,
  onClick,
  ariaLabel,
  target,
  ...rest
}: Props) {
  const { navigate } = usePageTransition();
  const pathname = usePathname();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Honor modifier keys + new-tab requests
    if (
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      target === "_blank"
    ) {
      return;
    }

    const targetHref = typeof href === "string" ? href : href.pathname || "";
    if (targetHref === pathname) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    navigate(targetHref);
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
      target={target}
      {...rest}
    >
      {children}
    </Link>
  );
}
