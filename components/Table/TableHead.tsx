import type { ComponentProps, FC, PropsWithChildren } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import type { SamsUITableHeadCellTheme } from "./TableHeadCell";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";
export interface SamsUITableHeadTheme {
  base: string;
  cell: SamsUITableHeadCellTheme;
}
export interface TableHeadProps
  extends PropsWithChildren,
    ComponentProps<"thead"> {
  theme?: DeepPartial<SamsUITableHeadTheme>;
}
export const TableHead: FC<TableHeadProps> = ({
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.table, customTheme);

  return (
    <thead className={twMerge(theme.head.base, className)} {...props} >{ children }</thead>
  );
};
