/**
 * Checks whether item is null or undefined
 * @param item Any value to be checked
 * @returns Boolean
 */
export const isNullOrUndefined = (item: any): Boolean => {
  if (typeof item === 'undefined' || item === null) {
    return true;
  }
  return false;
};

/**
 * Function to Replace Ternary Operator
 * @param condition Boolean
 * @param ifReturn Value to be returned if condition is true / Function to be executed when condition is true
 * @param elseReturn Value to be returned if condition is false / Function to be executed when condition is false
  @returns ifReturn or elseReturn based on Condition or function return value if the passed values are functions
 */
export const ifElse = (
  condition: boolean | Boolean,
  ifReturn: any,
  elseReturn: any,
): any => {
  const returnFuncOrValue = (arg: any) => {
    if (typeof arg === 'function') {
      return arg();
    }
    return arg;
  };
  return condition
    ? returnFuncOrValue(ifReturn)
    : returnFuncOrValue(elseReturn);
};

/**
 * Checks whether item is empty
 * @param item Any value to be checked
 * @returns Boolean
 */
export const isEmpty = (item: any): Boolean => {
  if (isNullOrUndefined(item)) {
    return true;
  }
  const type: string = item.constructor.name as string;
  switch (type) {
    case 'Number':
      return item === -1;
    case 'String':
      return item === '';
    case 'Array':
      return item.length === 0;
    case 'Object':
      return Object.keys(item).length === 0;
    default:
      return false;
  }
};

/**
 * Performs a logical AND operation on two conditions.
 * @param conditions N number of conditions
 * If conditions passed are 2 then returns && between them
 * If conditions passed are more than 2 then returns boolean value && with all of them
 * @returns The result of the logical AND operation.
 */
export const and = (...conditions: Array<any>): any | boolean => {
  if (conditions.length === 2) {
    return conditions[0] && conditions[1];
  } else {
    return conditions.every(Boolean);
  }
};

/**
 * Performs logical OR operation between two conditions
 *@param conditions N number of conditions
 * If conditions passed are 2 then returns || between them
 * If conditions passed are more than 2 then returns boolean value || with all of them
 * @returns Result of the logical OR operation
 */
export const or = (...conditions: Array<any>): any | boolean => {
  if (conditions.length === 2) {
    return conditions[0] || conditions[1];
  } else {
    return conditions.some(Boolean);
  }
};

/**
 * Retrieves the value of a nested property from an object.
 * If the object is empty or the property is not found, it returns the default value.
 *
 * @param obj - The object to retrieve the property from.
 * @param property - An array of strings representing the nested property path.
 * @param defaultValue - The default value to return if the property is not found.
 * @returns The value of the nested property or the default value.
 */
export const getProperty = (
  obj: { [key: string]: any } = {},
  property: string[] = [],
  defaultValue: any = undefined,
) => {
  if (isEmpty(obj)) {
    return defaultValue;
  }
  let info: any = obj;
  for (const prop of property) {
    if (isNullOrUndefined(info)) {
      return defaultValue;
    } else {
      info = info[prop];
    }
  }
  if (isNullOrUndefined(info)) {
    return defaultValue;
  }
  return info;
};

//Functions for ClassNames utility
function appendClass(value: any, newClass: any) {
  if (!newClass) {
    return value;
  }

  return value ? value + ' ' + newClass : newClass;
}

function parseValue(arg: any) {
  const hasOwn = {}.hasOwnProperty;
  if (typeof arg === 'string') {
    return arg;
  }

  if (typeof arg !== 'object') {
    return '';
  }

  if (Array.isArray(arg)) {
    return classNames(arg);
  }

  if (
    arg.toString !== Object.prototype.toString &&
    !arg.toString.toString().includes('[native code]')
  ) {
    return arg.toString();
  }

  let classes = '';

  for (const key in arg) {
    if (hasOwn.call(arg, key) && arg[key]) {
      classes = appendClass(classes, key);
    }
  }

  return classes;
}

/**
 * Function to generate class names based on input arguments
 * @param args - Arguments to be processed. Can be a string or an object with keys as class names and values as booleans.
 *              If the value is true, the class name will be appended to the string, otherwise it will be ignored.
 * @returns String of class names
 */
export function classNames(...args: any[]): string {
  let classes = '';

  for (let i = 0; i < args.length; i++) {
    const arg: any = args[i];
    if (arg) {
      classes = appendClass(classes, parseValue(arg));
    }
  }

  return classes;
}
//Functions for ClassNames utility ends here
