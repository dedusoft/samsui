import {
  useId,
  type ComponentProps,
  type FC,
  type PropsWithChildren,
} from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import type { SamsUIBoolean } from "../../SamsUITheme";
import { useSidebarContext } from "./SidebarContext";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
export interface SamsUISidebarLogoTheme {
  base: string;
  collapsed: SamsUIBoolean;
  img: string;
}
export interface SidebarLogoProps
  extends PropsWithChildren,
    ComponentProps<"a"> {
  href: string;
  img: string;
  imgAlt?: string;
  theme?: DeepPartial<SamsUISidebarLogoTheme>;
}
const SidebarLogo: FC<SidebarLogoProps> = ({
  children,
  className,
  href,
  img,
  imgAlt = "",
  theme: customTheme = {},
  ...props
}) => {
  const id = useId();
  const { isCollapsed } = useSidebarContext();
  const theme = mergeDeep(useTheme().theme.sidebar.logo, customTheme);
  return (
    <a
      href={href}
      aria-labelledby={`samsui-sidebar-logo-${id}`}
      className={twMerge(theme.base, className)}
      {...props}
    >
      <img src={img} alt={imgAlt} className={theme.img} />
      <span
        className={theme.collapsed[isCollapsed ? "on" : "off"]}
        id={`samsui-sidebar-logo-${id}`}
      >
        {children}
      </span>
    </a>
  );
};
export default SidebarLogo;
