import type { ComponentProps, FC, PropsWithChildren } from "react";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
import { SidebarItemContext } from "./SidebarItemContext";
export interface SidebarItemGroupProps
  extends PropsWithChildren,
    ComponentProps<"ul"> {}
export const SidebarItemGroup: FC<SidebarItemGroupProps> = ({
  children,
  className,
  ...props
}) => {
  const theme = useTheme().theme.sidebar.itemGroup;

  return (
    <ul className={twMerge(theme, className)} {...props}>
      <SidebarItemContext.Provider value={{ isInsideCollapse: false }}>
        {children}
      </SidebarItemContext.Provider>
    </ul> 
    
  );
};
