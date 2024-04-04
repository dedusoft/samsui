import type { ComponentProps, FC, PropsWithChildren } from 'react';
import type { DeepPartial } from '../../helpers/deep-partial';
import type { SamsUITableCellTheme } from './TableCell';
import { mergeDeep } from '../../helpers/merge-deep';
import { useTheme } from '../../SamsUIThemeContext';
import { twMerge } from 'tailwind-merge';
export interface SamsUITableBodyTheme {
    base: string;
    cell: SamsUITableCellTheme;
}
export interface TableBodyProps extends PropsWithChildren, ComponentProps<'tbody'> {
    theme?: DeepPartial<SamsUITableCellTheme>;
}
export const TableBody: FC<TableBodyProps> = ({ children, className, theme: customTheme = {}, ...props }) => {
    const theme = mergeDeep(useTheme().theme.table.body, customTheme);

    return (
        <tbody className={twMerge(theme.base, className)}>{children}</tbody>
    );

};
