import type { ComponentProps, FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import type { DeepPartial } from "../../helpers/deep-partial";
import type { SamsUIColors } from "../../SamsUITheme";
import { useSidebarContext } from "./SidebarContext";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";

export interface SamsUISidebarCTATheme {
  base: string;
  color: SamsUISidebarCTAColors;
}
export interface SidebarCTAProps
  extends PropsWithChildren,
    Omit<ComponentProps<"div">, "color"> {
  color?: keyof SamsUISidebarCTAColors;
  theme?: DeepPartial<SamsUISidebarCTATheme>;
}
export interface SamsUISidebarCTAColors
  extends Pick<
    SamsUIColors,
    | "blue"
    | "dark"
    | "failure"
    | "gray"
    | "green"
    | "light"
    | "purple"
    | "red"
    | "success"
    | "warning"
    | "yellow"
  > {
  [key: string]: string;
}

// Sidebar Container
export const SidebarCTA: FC<SidebarCTAProps> = ({
  children,
  color = "info",
  className,
  theme: customTheme = {},
  ...props
}) => {
  const { isCollapsed } = useSidebarContext();
  const theme = mergeDeep(useTheme().theme.sidebar.cta, customTheme);

  return (
    <div
      hidden={isCollapsed}
      className={twMerge(theme.base, theme.color[color], className)}
      {...props}
    >
      {children}
    </div>
  );
};
