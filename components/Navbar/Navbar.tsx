import {
  useState,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
} from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { NavbarBrand, type SamsUINavbarBrandTheme } from "./NavbarBrand";
import {
  NavbarCollapse,
  type SamsUINavbarCollapseTheme,
} from "./NavbarCollapse";
import { NavbarLink, type SamsUINavbarLinkTheme } from "./NavbarLink";
import { NavbarToggle, type SamsUINavbarToggleTheme } from "./NavbarToggle";
import { SamsUIBoolean } from "../../SamsUITheme";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { NavbarContext } from "./NavbarContext";
import { twMerge } from "tailwind-merge";
export interface SamsUINavbarTheme {
  root: SamsUINavbarRootTheme;
  brand: SamsUINavbarBrandTheme;
  collapse: SamsUINavbarCollapseTheme;
  link: SamsUINavbarLinkTheme;
  toggle: SamsUINavbarToggleTheme;
}
export interface SamsUINavbarRootTheme {
  base: string;
  rounded: SamsUIBoolean;
  bordered: SamsUIBoolean;
  inner: {
    base: string;
    fluid: SamsUIBoolean;
  };
}
export interface NavbarComponentProps
  extends PropsWithChildren,
    ComponentProps<"nav"> {
  menuOpen?: boolean;
  fluid?: boolean;
  rounded?: boolean;
  border?: boolean;
  theme?: DeepPartial<SamsUINavbarRootTheme>;
}
export const Navbar: FC<NavbarComponentProps> & {
  Brand: FC<import("./NavbarBrand").NavbarBrandProps>;
  Collapse: FC<import("./NavbarCollapse").NavbarCollapseProps>;
  Link: FC<import("./NavbarLink").NavbarLinkProps>;
  Toggle: FC<import("./NavbarToggle").NavbarToggleProps>;
} = ({
  border,
  children,
  className,
  fluid = false,
  menuOpen,
  rounded,
  theme: customTheme = {},
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(menuOpen);
  const theme = mergeDeep(useTheme().theme.navbar.root, customTheme);

  return (
    <NavbarContext.Provider value={{ isOpen, setIsOpen }}>
      <nav
        className={twMerge(
          theme.base,
          theme.bordered[border ? "on" : "off"],
          theme.rounded[rounded ? "on" : "off"],
          className
        )}
        {...props}
      >
        <div
          className={twMerge(
            theme.inner.base,
            theme.inner.fluid[fluid ? "on" : "off"]
          )}
        >
          {children}
        </div>
      </nav>
    </NavbarContext.Provider>
  );
};

Navbar.Brand = NavbarBrand;
Navbar.Collapse = NavbarCollapse;
Navbar.Link = NavbarLink;
Navbar.Toggle = NavbarToggle;
