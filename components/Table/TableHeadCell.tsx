import type { ComponentProps, FC, PropsWithChildren } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
export interface SamsUITableHeadCellTheme {
  base: string;
}
export interface TableHeadCellProps
  extends PropsWithChildren,
    ComponentProps<"th"> {
  theme?: DeepPartial<SamsUITableHeadCellTheme>;
}
export const TableHeadCell: FC<TableHeadCellProps> = ({
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.table.head.cell, customTheme);

  return (
    <th className={twMerge(theme.base, className)} {...props}>
      {children}
    </th>
  );
};
