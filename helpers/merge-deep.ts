/**
 * Check if provided parameter is plain object
 * @param item
 * @returns boolean
 */
function isObject<T>(item: T): item is T {
    return typeof item === 'object' && item !== null;
  }
  


function cloneDeep<T>(source: T): T {
  if (isObject<T>(source)) {
    if (Array.isArray(source)) {
      return source.map((element) => cloneDeep(element)) as T;
    } else {
      const clonedObject = { ...source } as Record<string, any>;
      for (const key in clonedObject) {
        if (Object.prototype.hasOwnProperty.call(clonedObject, key)) {
          clonedObject[key] = cloneDeep(clonedObject[key]);
        }
      }
      return clonedObject as T;
    }
  }
  return source;
}

type Merge<T extends {[key:string]:any}, S extends {[key:string]:any}> = T & S;

/**
 * Merge and deep copy the values of all of the enumerable own properties of target object from source object to a new object
 * @param target The target object to get properties from.
 * @param source The source object from which to copy properties.
 * @return A new merged and deep copied object.
 */
export function mergeDeep<T extends {[key:string]:any}, S extends {[key:string]:any}>(target: T, source: S):Merge<T,S> {
    // const output = { ...target };
    // const output: Record<string, any> = { ...target } as Record<string, any>;
    if (isObject(source) && Object.keys(source).length === 0) {
        return cloneDeep({ ...target, ...source }) as T & S;
    }
    const output: Merge<typeof target,typeof source>= { ...target, ...source } ;
    if (isObject(source) && isObject(target)) {
        Object.keys(source).forEach((key) => {
            if (isObject(source[key]) && key in target && isObject(target[key])) {
                (output as any)[key] = mergeDeep(target[key], source[key]);
            }
            else {
               ( output as any)[key] = isObject(source[key]) ? cloneDeep(source[key]) : source[key];
            }
        });
    }
    return output;
  }

// ====================================================================================================
// type IsObject<T> = T extends object ? T : Record<string, T>;

// function isObject<T>(item: T): item is IsObject<T> {
//   return item !== null && typeof item === 'object' && !Array.isArray(item);
// }

// function cloneDeep<T>(source: T): T {
//   if (!isObject(source)) {
//     return source;
//   }

//   if (Array.isArray(source)) {
//     return source.map((item) => cloneDeep(item)) as any;
//   }

//   const output = { ...source } as Record<string, any>;
//   for (const key in source) {
//     if (Object.prototype.hasOwnProperty.call(source, key)) {
//       output[key] = cloneDeep(source[key]);
//     }
//   }
//   return output as T;
// }

// export function mergeDeep<T, S>(
//   target: T,
//   source: S
// ): T extends object ? S extends object ? T & S : S : S {
//   if (isObject(source) && Object.keys(source).length === 0) {
//     return cloneDeep({ ...target, ...source }) as any;
//   }

//   const output: Record<string, any> = { ...target, ...source } as any;
//   if (isObject(source) && isObject(target)) {
//     for (const key in source) {
//       if (Object.prototype.hasOwnProperty.call(source, key)) {
//         if (isObject(source[key]) && key in target && isObject(target[key])) {
//           output[key] = mergeDeep(target[key], source[key]);
//         } else {
//           output[key] = isObject(source[key]) ? cloneDeep(source[key]) : source[key];
//         }
//       }
//     }
//   }

//   return output as any;
// }

// ====================================================================================================
// export function mergeDeep<T extends object, S extends object>(target: T, source: S): T & S {
//     function isObject(item: any): item is object {
//       return item !== null && typeof item === 'object' && !Array.isArray(item);
//     }
  
//     function cloneDeep<U>(source: U): U {
//       if (!isObject(source)) {
//         return source;
//       }
  
//       if (Array.isArray(source)) {
//         return source.map((item) => cloneDeep(item)) as U;
//       }
  
//       const output: Record<string, any> = { ...source } as Record<string, any>;
//       for (const key in source) {
//         if (Object.prototype.hasOwnProperty.call(source, key)) {
//           output[key] = cloneDeep(source[key]);
//         }
//       }
//       return output as U;
//     }
  
//     if (isObject(source) && Object.keys(source).length === 0) {
//       return cloneDeep({ ...target, ...source }) as T & S;
//     }
  
//     const output = { ...target, ...source } as T & S;
//     if (isObject(source) && isObject(target)) {
//       for (const key in Object.keys(source)) {
//           if (source[key] && key in target && target[key]) {
//             output[key] = mergeDeep(target[key], source[key]);
//           } else {
//             output[key] = isObject(source[key]) ? cloneDeep(source[key]) : source[key];
//           }
//       }
//     }
  
//     return output as T & S;
//   }