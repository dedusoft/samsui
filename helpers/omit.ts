// type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export  const omit = <T extends object, K extends keyof T>(keys: readonly K[]) => (obj: T): Omit<T, K> => {
   const newObj = {...obj};
   for(const key of keys){
    delete newObj[key];
   }
   return newObj;
}
