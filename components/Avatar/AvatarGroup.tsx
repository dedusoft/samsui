import type { FC, ComponentProps, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { DeepPartial } from "../../helpers/deep-partial";
import { useTheme } from "../../SamsUIThemeContext";
import { mergeDeep } from "../../helpers/merge-deep";
export interface SamsUIAvatarGroupTheme {
  base: string;
}
export interface AvatarGroupProps
  extends PropsWithChildren<ComponentProps<"div">> {
  theme?: DeepPartial<SamsUIAvatarGroupTheme>;
}
export const AvatarGroup: FC<AvatarGroupProps> = ({
  children,
  className,
  theme: customTheme = {},
  ...props
}) => {
  const theme = mergeDeep(useTheme().theme.avatar.group, customTheme);

  return (
    <div {...props} className={twMerge(theme.base, className)}>
      {children}
    </div>
  );
};
