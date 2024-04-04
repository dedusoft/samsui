import type { ComponentProps, ElementType, FC, PropsWithChildren } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import type { SamsUIBoolean } from "../../SamsUITheme";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";

export interface SamsUINavbarLinkTheme {
  base: string;
  active: SamsUIBoolean;
  disabled: SamsUIBoolean;
}
export interface NavbarLinkProps
  extends PropsWithChildren,
    ComponentProps<"a">,
    Record<string, unknown> {
  active?: boolean;
  as?: ElementType;
  disabled?: boolean;
  href?: string;
  theme?: DeepPartial<SamsUINavbarLinkTheme>;
}
export const NavbarLink: FC<NavbarLinkProps> = ({
  active,
  as: Component = "a",
  disabled,
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.navbar.link, customTheme);

  return (
    <li>
      <Component
      {...props}
        className={twMerge(
          theme.base,
          active && theme.active.on,
          !active && !disabled && theme.active.off,
          theme.disabled[disabled ? "on": "off"],
          className
        )}
      >
        {children}
      </Component>
    </li>
  );
};
