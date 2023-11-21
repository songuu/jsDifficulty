// true
type Case1 = never extends never ? true : false;

type isNever<T> = T extends never ? true : false;

// false
type Case2 = isNever<never>;

// false
type Case3 = isNever<[]>;

// false
type Case4 = isNever<0>;

// false
type Case5 = isNever<''>;


type IsNever<T> = [T] extends [never] ? true : false;