import type { ComponentProps, FC, PropsWithChildren } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import type { SamsUIBoolean } from "../../SamsUITheme";
import { useNavbarContext } from "./NavbarContext";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { twMerge } from "tailwind-merge";

export interface SamsUINavbarCollapseTheme {
  base: string;
  list: string;
  hidden: SamsUIBoolean;
}
export interface NavbarCollapseProps
  extends PropsWithChildren<ComponentProps<"div">> {
  theme?: DeepPartial<SamsUINavbarCollapseTheme>;
}
export const NavbarCollapse: FC<NavbarCollapseProps> = ({
    children,
    className,
    theme: customTheme = {},
    ...props
  }) => {
    const { isOpen } = useNavbarContext();
    const theme = mergeDeep(useTheme().theme.navbar.collapse, customTheme);
    return (
        <div className={twMerge(theme.base, theme.hidden[!isOpen ? "on" : "off"], className)} {...props} >
            <ul className={theme.list}>{children}</ul>
        </div>
    );
};
