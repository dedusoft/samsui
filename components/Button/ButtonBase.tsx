import {
  type ComponentPropsWithoutRef,
  type ElementType,
  createElement,
  FC,
  RefAttributes,
} from "react";
// import { genericForwardRef } from "../../helpers/generic-forward-ref";
// import {GenericComponent, GenericComponentProps, GenericComponentRef, genericForwardRef,} from "../../helpers/generic-forward-ref";

// function ButtonBaseComponent<T extends ElementType = "button">(
//   component: (
//     {
//       as:Component,
//       href,
//       ...rest
//     }: GenericComponentProps<ButtonBaseProps<T>, T>,
//     ref: GenericComponentRef<T>
//   ) => ReactNode
// ) {
//   const BaseComponent = Component || ()
//   return createElement();
// }

// export const ButtonBase = genericForwardRef(ButtonBaseComponent);

// export const ButtonBase = genericForwardRef(ButtonBaseComponent);

// export declare const ButtonBase: <T extends ElementType = "button">(
//   props: {
//     as?: T | undefined;
//     href?: string | undefined;
//   } & import("react").PropsWithoutRef<import("react").ComponentProps<T>> &
//     import("react").RefAttributes<T>
// ) => JSX.Element;

// ========================================================================
// export type ButtonBaseProps<T extends ElementType = "button"> = {
//   as?: T;
//   href?: string;
// } & ComponentPropsWithoutRef<T>;

// export declare const ButtonBase: <T extends ElementType = "button">(
//   props: {
//     as?: T | undefined;
//     href?: string | undefined;
//   } & import("react").PropsWithoutRef<import("react").ComponentProps<T>> &
//     import("react").RefAttributes<T>
// ) => JSX.Element;

// export type ButtonBaseProps<T extends ElementType = "button"> = {
//   as?: T;
//   href?: string;
// } & ComponentPropsWithoutRef<T>;

// export  const ButtonBase: <T extends ElementType = "button">(
//   props: {
//     as?: T | undefined;
//     href?: string | undefined;
//   } & import("react").PropsWithoutRef<import("react").ComponentProps<T>> &
//     import("react").RefAttributes<T>
// ) => JSX.Element = () => genericForwardRef(ButtonBaseComponent);

// ========================================================================
// export type ButtonBaseProps<T extends ElementType = "button"> = {
//   as?: T;
//   href?: string;
// } & ComponentPropsWithoutRef<T>;

// type ButtonBaseComponentProps = {
//   children?: ReactNode;
//   as?: string;
//   href?: string;
//   type?: string;
// };

// const BaseComponent = (
//   {
//     children,
//     as: Component,
//     href,
//     type = "button",
//     ...props
//   }: ButtonBaseComponentProps,
//   ref:any
// ) => {
//   const RenderComponent = Component || (href ? "a" : "button");
//   return createElement(RenderComponent, { ref, href, type, ...props }, children);
// };

// export const ButtonBase = genericForwardRef(BaseComponent);

// ========================================================================
export type ButtonBaseProps<T extends ElementType = "button"> = {
  as?: T;
  href?: string;
} & ComponentPropsWithoutRef<T> &
  RefAttributes<T>;

export const ButtonBase: FC<ButtonBaseProps> = ({
  children,
  as: Component,
  href,
  type = "button",
  ref,
  ...props
}) => {
  const BaseComponent = Component || (href ? "a" : "button");
  return createElement(BaseComponent, { ref, href, type, ...props }, children);
};
