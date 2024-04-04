import type { ComponentProps, FC } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import { mergeDeep } from "../../helpers/merge-deep";
import { useTheme } from "../../SamsUIThemeContext";
import { HiMoon, HiSun } from "react-icons/hi";
import { twMerge } from "tailwind-merge";
export interface SamsUIDarkThemeToggleTheme {
  root: SamsUIDarkThemeToggleRootTheme;
}
export interface SamsUIDarkThemeToggleRootTheme {
  base: string;
  icon: string;
}
export interface DarkThemeToggleProps extends ComponentProps<"button"> {
  iconDark?: string;
  iconLight?: string;
  theme?: DeepPartial<SamsUIDarkThemeToggleTheme>;
}
export const DarkThemeToggle: FC<DarkThemeToggleProps> = ({
  className,
  theme: customTheme = {},
  iconDark: IconDark = HiSun,
  iconLight: IconLight = HiMoon,
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.darkThemeToggle, customTheme);
  const { mode, toggleMode } = useTheme();
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => toggleMode?.()}
      type="button"
      className={twMerge(theme.root.base, className)}
      {...props}
    >
        {mode ==='dark' ? (
            <IconLight aria-label="Currently dark mode" className={theme.root.icon } />
        ): (
            <IconDark aria-label="Currently light mode" className={theme.root.icon } />
        )}
    </button>
  );
};
