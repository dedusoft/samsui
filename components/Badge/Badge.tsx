import type { ComponentProps, FC, PropsWithChildren } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import type {
  SamsUIBoolean,
  SamsUIColors,
  SamsUISizes,
} from "../../SamsUITheme";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";

export interface SamsUIBadgeTheme {
  root: SamsUIBadgeRootTheme;
  icon: SamsUIBadgeIconTheme;
}
export interface SamsUIBadgeRootTheme {
  base: string;
  color: SamsUIColors;
  href: string;
  size: BadgeSizes;
}
export interface SamsUIBadgeIconTheme extends SamsUIBoolean {
  size: BadgeSizes;
}
export interface BadgeSizes extends Pick<SamsUISizes, "xs" | "sm"> {
  [key: string]: string;
}
export interface BadgeProps
  extends PropsWithChildren<Omit<ComponentProps<"span">, "color">> {
  color?: keyof SamsUIColors;
  href?: string;
  icon?: FC<ComponentProps<"svg">>;
  size?: keyof BadgeSizes;
  theme?: DeepPartial<SamsUIBadgeTheme>;
}
export const Badge: FC<BadgeProps> = ({
  children,
  color = "info",
  href,
  icon: Icon,
  size = "xs",
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.badge, customTheme);
  const Content = () => (
    <span
      className={twMerge(
        theme.root.base,
        theme.root.color[color],
        theme.root.size[size],
        theme.icon[Icon ? "on" : "off"],
        className
      )}
      {...props}
    >
      {Icon && <Icon aria-hidden="true" className={theme.icon.size[size]} />}
      {children && <span>{children}</span>}
    </span>
  );
  return (
    <a className={theme.root.href} href={href}>
      {<Content />}
    </a>
  );
};
