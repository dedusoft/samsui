import type { ComponentProps, FC, PropsWithChildren } from 'react';
import type { DeepPartial } from '../../helpers/deep-partial';
import { TableBody, type SamsUITableBodyTheme } from './TableBody';
import { TableContext, type TableContextType } from './TableContext';
import { TableHead, type SamsUITableHeadTheme } from './TableHead';
import { TableRow, type SamsUITableRowTheme } from './TableRow';
import { TableCell } from './TableCell';
import { TableHeadCell } from './TableHeadCell';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTheme } from '../../SamsUIThemeContext';
import { twMerge } from 'tailwind-merge';
export interface SamsUITableTheme {
    root: SamsUITableRootTheme;
    head: SamsUITableHeadTheme;
    row: SamsUITableRowTheme;
    body: SamsUITableBodyTheme;
}
export interface SamsUITableRootTheme {
    base: string;
    shadow: string;
    wrapper: string;
}
export interface TableProps extends PropsWithChildren, ComponentProps<'table'>, TableContextType {
    theme?: DeepPartial<SamsUITableTheme>;
}
export const Table: FC<TableProps> & {
    Head: FC<import("./TableHead").TableHeadProps>;
    Body: FC<import("./TableBody").TableBodyProps>;
    Row: FC<import("./TableRow").TableRowProps>;
    Cell: FC<import("./TableCell").TableCellProps>;
    HeadCell: FC<import("./TableHeadCell").TableHeadCellProps>;
} = ({
    children,
    className,
    hoverable,
    striped,
    theme: customTheme = {},
    ...props
  }) => {
    const theme = mergeDeep(useTheme().theme.table, customTheme);

    return (
        <div className={twMerge(theme.root.wrapper)}>
            <TableContext.Provider value={{ striped, hoverable }}>
                <div className={twMerge(theme.root.shadow, className)}></div>
                <table {...props} className={twMerge(theme.root.base, className)}  >{children}</table>
            </TableContext.Provider>
        </div>
    );
};

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.HeadCell = TableHeadCell;