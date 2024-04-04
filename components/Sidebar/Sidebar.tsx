import type { ComponentProps, ElementType, FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import type { DeepPartial } from "../../helpers/deep-partial";
import type { SamsUIBoolean } from "../../SamsUITheme";
import { SidebarCTA, type SamsUISidebarCTATheme } from "./SidebarCTA";
import {
  SidebarCollapse,
  type SamsUISidebarCollapseTheme,
} from "./SidebarCollapse";
import { SidebarItem, type SamsUISidebarItemTheme } from "./SidebarItem";
import type { SamsUISidebarLogoTheme } from "./SidebarLogo";
import { SidebarItems } from "./SidebarItems";
import { SidebarItemGroup } from "./SidebarItemGroup";
import SidebarLogo from "./SidebarLogo";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { SidebarContext } from "./SidebarContext";

export interface SamsUISidebarTheme {
  root: {
    base: string;
    collapsed: SamsUIBoolean;
    inner: string;
  };
  collapse: SamsUISidebarCollapseTheme;
  cta: SamsUISidebarCTATheme;
  item: SamsUISidebarItemTheme;
  items: string;
  itemGroup: string;
  logo: SamsUISidebarLogoTheme;
}
export interface SidebarProps extends PropsWithChildren, ComponentProps<"div"> {
  as?: ElementType;
  collapseBehavior?: "collapse" | "hide";
  collapsed?: boolean;
  theme?: DeepPartial<SamsUISidebarTheme>;
}
export const Sidebar: FC<SidebarProps> & {
  Collapse: FC<import("./SidebarCollapse").SidebarCollapseProps>;
  CTA: FC<import("./SidebarCTA").SidebarCTAProps>;
  Item: import("react").ForwardRefExoticComponent<
    Omit<import("./SidebarItem").SidebarItemProps, "ref"> &
      import("react").RefAttributes<Element>
  >;
  Items: FC<import("./SidebarItems").SidebarItemsProps>;
  ItemGroup: FC<import("./SidebarItemGroup").SidebarItemGroupProps>;
  Logo: FC<import("./SidebarLogo").SidebarLogoProps>;
} = ({
  children,
  as: Component = "nav",
  collapseBehavior = "collapse",
  collapsed: isCollapsed = false,
  theme: customTheme = {},
  className,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.sidebar, customTheme);
  return (
    <SidebarContext.Provider value={{ isCollapsed }}>
      <Component
        aria-label="Sidebar"
        hidden={isCollapsed && collapseBehavior === "hide"}
        className={twMerge(
          theme.root.base,
          theme.root.collapsed[isCollapsed ? "on" : "off"],
          className
        )}
        {...props}
      >
        <div className={theme.root.inner}>{children}</div>
      </Component>
    </SidebarContext.Provider>
  );
};

Sidebar.Collapse = SidebarCollapse;
Sidebar.CTA = SidebarCTA;
Sidebar.Item = SidebarItem;
Sidebar.Items = SidebarItems;
Sidebar.ItemGroup = SidebarItemGroup;
Sidebar.Logo = SidebarLogo;
