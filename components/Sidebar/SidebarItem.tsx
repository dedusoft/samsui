import {
  type ComponentProps,
  type ForwardRefExoticComponent,
  type ElementType,
  type FC,
  type PropsWithChildren,
  type RefAttributes,
  forwardRef,
  useId,
  ReactNode,
} from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { twMerge } from "tailwind-merge";

import type { SamsUIColors } from "../../SamsUITheme";
import { useSidebarContext } from "./SidebarContext";
import { useSidebarItemContext } from "./SidebarItemContext";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { Tooltip } from "../Tooltip";
import { Badge } from "../Badge";
export interface SamsUISidebarItemTheme {
  active: string;
  base: string;
  collapsed: {
    insideCollapse: string;
    noIcon: string;
  };
  content: {
    base: string;
  };
  icon: {
    base: string;
    active: string;
  };
  label: string;
  listItem: string;
}
export interface SidebarItemProps
  extends PropsWithChildren,
    Omit<ComponentProps<"div">, "ref">,
    Record<string, unknown> {
  active?: boolean;
  as?: ElementType;
  href?: string;
  children: ReactNode | string;
  icon?: FC<ComponentProps<"svg">>;
  label?: string;
  labelColor?: keyof SidebarItemLabelColors;
  theme?: DeepPartial<SamsUISidebarItemTheme>;
}
export interface SidebarItemLabelColors extends Pick<SamsUIColors, "gray"> {
  [key: string]: string;
}

export const SidebarItem: ForwardRefExoticComponent<
  Omit<SidebarItemProps, "ref"> & RefAttributes<Element>
> = forwardRef(
  (
    {
      active: isActive,
      as: Component = "a",
      children,
      className,
      icon: Icon,
      label,
      labelColor = "info",
      theme: customTheme = {},
      ...props
    }: SidebarItemProps,
    ref
  ) => {
    const id = useId();
    const { isCollapsed } = useSidebarContext();
    const { isInsideCollapse } = useSidebarItemContext();
    const theme = mergeDeep(useTheme().theme.sidebar.item, customTheme);

    return (
      <ListItem
        className={theme.listItem}
        id={id}
        isCollapsed={isCollapsed}
        tooltipChildren={children}
      >
        <Component
          aria-labelledby={`samsui-sidebar-item-${id}`}
          ref={ref}
          className={twMerge(
            theme.base,
            isActive && theme.active,
            !isCollapsed && isInsideCollapse && theme.collapsed?.insideCollapse,
            className
          )}
          {...props}
        >
          {Icon && (
            <Icon
              aria-hidden={true}
              className={twMerge(
                theme.icon?.base,
                isActive && theme.icon?.active
              )}
            />
          )}

          {isCollapsed && !Icon && (
            <span className={theme.collapsed?.noIcon}>
              {typeof children === "string" &&
                children?.charAt(0).toLocaleUpperCase()}
            </span>
          )}
          {!isCollapsed && <Children id={id}>{children}</Children>}
          {!isCollapsed && label && (
            <Badge
              color={labelColor}
              hidden={isCollapsed}
              className={theme.label}
            >
              {label}
            </Badge>
          )}
        </Component>
      </ListItem>
    );
  }
);

interface ListItemProps
  extends PropsWithChildren,
    Omit<ComponentProps<"li">, "ref"> {
  isCollapsed?: boolean;
  tooltipChildren?: ReactNode;
}

const ListItem: FC<ListItemProps> = ({
  id,
  isCollapsed,
  tooltipChildren,
  children: wrapperChildren,
  ...props
}) => {
  return (
    <li {...props}>
      {isCollapsed ? (
        <Tooltip
          content={<TooltipContent id={id}>{tooltipChildren}</TooltipContent>}
          placement="right"
        >
          {wrapperChildren}
        </Tooltip>
      ) : (
        wrapperChildren
      )}
    </li>
  );
};

const TooltipContent: FC<any> = ({ id, children }) => {
  return <Children id={id}>{children}</Children>;
};

const Children: FC<any> = ({ id, children }) => {
  const theme = useTheme().theme.sidebar.item;
  return (
    <span
      id={`samsui-sidebar-item-${id}`}
      className={twMerge(theme.content.base)}
    >
      {children}
    </span>
  );
};
