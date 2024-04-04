import type { ComponentProps, FC, PropsWithChildren } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { useTableContext } from "./TableContext";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
export interface SamsUITableRowTheme {
  base: string;
  hovered: string;
  striped: string;
}
export interface TableRowProps extends PropsWithChildren, ComponentProps<"tr"> {
  theme?: DeepPartial<SamsUITableRowTheme>;
}
export const TableRow: FC<TableRowProps> = ({
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const { hoverable, striped } = useTableContext();
  const theme = mergeDeep(useTheme().theme.table.row, customTheme);

  return (
    <tr
      className={twMerge(
        theme.base,
        striped && theme.striped,
        hoverable && theme.hovered,
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
};
