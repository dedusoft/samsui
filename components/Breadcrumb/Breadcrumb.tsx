import type { ComponentProps, FC } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import {
  BreadcrumbItem,
  type SamsUIBreadcrumbItemTheme,
} from "./BreadcrumbItem";
import { useTheme } from "../../SamsUIThemeContext";
import { mergeDeep } from "../../helpers/merge-deep";
import { twMerge } from "tailwind-merge";

export interface SamsUIBreadcrumbTheme {
  root: SamsUIBreadcrumbRootTheme;
  item: SamsUIBreadcrumbItemTheme;
}
export interface SamsUIBreadcrumbRootTheme {
  base: string;
  list: string;
}
export interface BreadcrumbComponentProps extends ComponentProps<"nav"> {
  theme?: DeepPartial<SamsUIBreadcrumbRootTheme>;
}
export const Breadcrumb: FC<BreadcrumbComponentProps> & {
  Item: import("react").ForwardRefExoticComponent<
    import("./BreadcrumbItem").BreadcrumbItemProps &
      import("react").RefAttributes<HTMLAnchorElement | HTMLSpanElement>
  >;
} = ({
    children,
    className,
    theme: customTheme = {},
    ...props
}) => {
  const theme = mergeDeep(useTheme().theme.breadcrumb.root, customTheme);
  return (
    <nav aria-label="Breadcrumb" {...props} className={twMerge(theme.base, className)}>
        <ol className={theme.list} >{children}</ol>
    </nav>
  );
};

Breadcrumb.Item = BreadcrumbItem;
