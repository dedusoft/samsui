import type { JSX, ComponentProps, FC, PropsWithChildren } from "react";
import type { DeepPartial } from "../../helpers/deep-partial";
import type { SamsUIBoolean } from "../../SamsUITheme";
import { useTheme } from "../../SamsUIThemeContext";
import { mergeDeep } from "../../helpers/merge-deep";
import { omit } from "../../helpers/omit";
import { twMerge } from "tailwind-merge";

export interface SamsUICardTheme {
  root: SamsUICardRootTheme;
  img: SamsUICardImageTheme;
}

export interface SamsUICardRootTheme {
  base: string;
  children: string;
  horizontal: SamsUIBoolean;
  href: string;
}

export interface SamsUICardImageTheme {
  base: string;
  horizontal: SamsUIBoolean;
}

interface CommonCardProps extends PropsWithChildren<ComponentProps<"div">> {
  horizontal?: boolean;
  href?: string;
  /** Overwrites the theme. Will be merged with the context theme.
   * @default {}
   */
  theme?: DeepPartial<SamsUICardTheme>;
}

export type CardProps = (
  | {
      imgAlt?: string;
      imgSrc?: string;
      renderImage?: never;
    }
  | {
      /** Allows to provide a custom render function for the image component. Useful in Next.JS and Gatsby. **Setting this will disable `imgSrc` and `imgAlt`**.
       */
      renderImage?: (
        theme: DeepPartial<SamsUICardTheme>,
        horizontal: boolean
      ) => JSX.Element;
      imgAlt?: never;
      imgSrc?: never;
    }
) &
  CommonCardProps;

const Image = ({ theme: customTheme = {}, ...props }) => {
  const theme = mergeDeep(useTheme().theme.card, customTheme);
  if (props.renderImage) {
    return props.renderImage(theme, props.horizontal ?? false);
  }

  if (props.imgSrc) {
    return (
      <img
        src={props.imgSrc}
        alt={props.imgAlt ?? ""}
        className={twMerge(
          theme.img.base,
          theme.img.horizontal[props.horizontal ? "on" : "off"]
        )}
      />
    );
  }
  return null;
};

export const Card: FC<CardProps> = (props) => {
  const {
    children,
    className,
    horizontal,
    href,
    theme: customTheme = {},
  } = props;
  const Component = typeof href === "undefined" ? "div" : "a";
  const theirProps = omit<CardProps, keyof CardProps>([
    "renderImage",
    "imgSrc",
    "imgAlt",
    "children",
    "className",
    "horizontal",
    "href",
    "theme",
  ])(props);
  const theme = mergeDeep(useTheme().theme.card, customTheme);

  return (
    <Component
      href={href}
      className={twMerge(
        theme.root.base,
        theme.root.horizontal[horizontal ? "on" : "off"],
        href && theme.root.href,
        className
      )}
      {...theirProps}
    >
      <Image {...props} />
      <div className={theme.root.children}>{children}</div>
    </Component>
  );
};
export {};
