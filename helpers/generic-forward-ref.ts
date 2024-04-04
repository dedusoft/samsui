import {
  forwardRef,
  ForwardedRef,
  ReactNode,
  ForwardRefExoticComponent,
  Ref,
  RefAttributes,
  ForwardRefRenderFunction,
  PropsWithoutRef,
} from "react";

export type GenericComponentProps<T, P = {}> = T & {
  children?: ReactNode;
};
export type GenericComponentRef<T> = ForwardedRef<T>;
export type GenericComponent<T, P = {}> = ForwardRefExoticComponent<
  GenericComponentProps<T, P> & GenericComponentRef<T>
>;
// export function genericForwardRef<T, P>(
//   component: (
//     props: GenericComponentProps<T, P>,
//     ref: GenericComponentRef<T>
//   ) => ReactNode
// ): GenericComponent<T, P> {
//   return forwardRef(component) as GenericComponent<T, P>;
// }

// ====================================================================

export const genericForwardRef = <T, P>(
  component: ForwardRefRenderFunction<Ref<T>,P>
):ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<Ref<T>>> => {
  return forwardRef(component);
}

// ====================================================================

// export const genericForwardRef = <T, P>(
//   component: (
//     props: P,
//     ref: T
//   ) => ForwardRefRenderFunction<Ref<T>, P>
// ): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<Ref<T>>> => {
//   return forwardRef(component);
// };
