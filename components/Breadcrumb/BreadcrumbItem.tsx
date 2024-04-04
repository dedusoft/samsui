import {
  forwardRef,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
} from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import type { SamsUIBoolean } from "../../SamsUITheme";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
import { HiOutlineChevronRight } from "react-icons/hi";
export interface SamsUIBreadcrumbItemTheme {
  base: string;
  chevron: string;
  href: SamsUIBoolean;
  icon: string;
}
export interface BreadcrumbItemProps
  extends PropsWithChildren<Omit<ComponentProps<"li">, "ref">> {
  href?: string;
  icon?: FC<ComponentProps<"svg">>;
  theme?: DeepPartial<SamsUIBreadcrumbItemTheme>;
}
export const BreadcrumbItem: import("react").ForwardRefExoticComponent<
  BreadcrumbItemProps &
    import("react").RefAttributes<HTMLAnchorElement | HTMLSpanElement>
> = forwardRef(
  (
    {
      children,
      className,
      href,
      icon: Icon,
      theme: customTheme = {},
      ...props
    },
    ref
  ) => {
    const isLink = typeof href !== "undefined";
    // const Component = isLink ? "a" : "span";
    const theme = mergeDeep(useTheme().theme.breadcrumb.item, customTheme);
    return (
      <li className={twMerge(theme.base, className)}>
        <HiOutlineChevronRight aria-hidden="true" className={theme.chevron} />
        {isLink ? (
          <a href={href} className={theme.href["on"]}>
            {Icon && <Icon aria-hidden={true} className={theme.icon} />}
            {children}
          </a>
        ) : (
          <span ref={ref} className={theme.href["off"]}>
            {Icon && <Icon aria-hidden={true} className={theme.icon} />}
            {children}
          </span>
        )}
      </li>
    );
  }
);

