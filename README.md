# UIXTRA

## Overview

This prohect is a UI library for some majorly used scenarios in React based projects. It contains some reusable components and utility functions to help in development for any projects

## Documentation

- ### Components

  - [ShowIf](#show)
  - [ShowIfElse](#showifelse)
  - [FadeIn](#fadein)
  - [Repeat](#repeat)

- ### [Utility Functions](#utils-module)

## License

This project is licensed under the [MIT License](LICENSE).

## Using the Project

To use the UI Library, follow these steps:

1. Ensure that you have Node.js v20.15.0 and yarn or npm installed on your machine.
2. Open a terminal and navigate to the project's root directory.
3. Run the following command to install the project dependencies:
   ```
   yarn install uixtra / npm i uixtra
   ```
4. Once the dependencies are installed, you can use the library as given in the documentation:

That's it! You can now start using and exploring the UIXTRA.

---

### Docs with Example

## Show

A component which can be used to replace conditional rendering using &&.

#### ShowProps

#### `if`: `boolean`

If condition which will decide to render the children or not

### Example Usage

```jsx
import React from 'react';
import { Show } from 'uixtra/components';
//OR
import Show from 'uixtra/components/Show';

const App = () => (
  <div>
    <Show if={true}>
      <div>Content to show if the condition is true</div>
    </Show>
  </div>
);

export default App;
```

## ShowIfElse

A component which can be used instead of ternary operator to render components. Its a necessity to have only 2 sibling children to the component as its used to consider the components for If and Else

#### ShowProps

#### `if`: `boolean`

If condition which will decide to render the children or not

### Example Usage

```jsx
import React from 'react';
import { ShowIfElse } from 'uixtra/components';
//OR
import ShowIfElse from 'uixtra/components/Show';

const App = () => (
  <div>
    <ShowIfElse if={true}>
      <div>Content to show if the condition is true</div>
      <div>Content to show if the condition is false</div>
    </ShowIfElse>
  </div>
);

export default App;
```

## FadeIn

This component just adds a FadeIn animation to any component on which this wrapper is used

#### FadeInProps

#### `duration`: `number`

Duration for the fadein transition (You can use waterfall duration for multiple components in a single page)

#### `className`: `string`

Classname for the fade in wrapper

### Example Usage

```jsx
import React from 'react';
import { FadeIn } from 'uixtra/components';
//OR
import FadeIn from 'uixtra/components/FadeIn';

const App = () => (
  <div>
    <FadeIn duration={100}>
      <div>Content</div>
    </FadeIn>
  </div>
);

export default App;
```

## Repeat

This component can be used instead of .map while rendering a list of components

#### RepeatProps

#### `for`: `Array<any>`

Array of items for which the rendering should happen

#### `element`: `React Component`

The Component which should be rendered multiple times

#### `key`: `Function` (Optional)

Function to generate unique key for each render. Default is item's id with the index

#### `passItem`: `boolean` (Optional)

Decides whether to pass the array item to the element as a prop

#### `passIndex`: `boolean` (Optional)

Decides whether to pass the index to the element as a prop

#### `restProps`: (Internal Handled)

Any other props passed to the Repeat Component will be passed on to the element on each render

### Example Usage

```jsx
import React from 'react';
import { Repeat } from 'uixtra/components';
//OR
import Repeat from 'uixtra/components/Repeat';

const SampleComponent = (props) => {
  const { item, index, className } = props;

  return (
    <div className={className}>
      <div>{item.name}</div>
    </div>
  );
}

const App = () => (
  <div>
    <Repeat
      for={[
        { name: 'John Doe', age: 35 }.
        { name: 'Jane Doe', age: 30 }
      ]}
      element={SampleComponent}
      key={(item) => item.name}
      passItem
      passIndex
      className="sample-item"
    >
  </div>
)
```

---

## Utils Module

The `utils` module provides a set of utility functions that can be used throughout the application. Below is the detailed documentation for each function available in `utils/index.ts`.

### `isNullOrUndefined`

Checks whether the given item is null or undefined.

**Parameters:**

- `item`: `any` - Any value to be checked.

**Returns:**

- `Boolean` - `true` if the item is null or undefined, otherwise `false`.

**Example:**

```typescript
import { isNullOrUndefined } from 'uixtra/utils';

console.log(isNullOrUndefined(null)); // Output: true
console.log(isNullOrUndefined(undefined)); // Output: true
console.log(isNullOrUndefined(0)); // Output: false
```

### `ifElse`

The `ifElse` function is used to replace the ternary operator.

**Parameters:**

- `condition`: `boolean | Boolean` - The condition to be evaluated.
- `ifReturn`: `any` - Value to be returned if the condition is true or a function to be executed when the condition is true.
- `elseReturn`: `any` - Value to be returned if the condition is false or a function to be executed when the condition is false.

**Returns:**

- `any` - The value of `ifReturn` if the condition is true, the value of `elseReturn` if the condition is false, or `void` if both `ifReturn` and `elseReturn` are functions.

**Example:**

```typescript
import { ifElse } from 'uixtra/utils';

const result = ifElse(true, 'Yes', 'No');
console.log(result); // Output: Yes
```

### `isEmpty`

Checks whether the given item is empty.

**Parameters:**

- `item`: `any` - Any value to be checked.

**Returns:**

- `Boolean` - `true` if the item is empty, otherwise `false`.

**Example:**

```typescript
import { isEmpty } from 'uixtra/utils';

console.log(isEmpty(null)); // Output: true
console.log(isEmpty({})); // Output: true
console.log(isEmpty([])); // Output: true
console.log(isEmpty('')); // Output: true
console.log(isEmpty({ a: 1 })); // Output: false
```

### `and`

Performs a logical AND operation on conditions provided.

**Parameters:**

- `conditions`: `Array<any>` - List of Conditions to Check

**Returns:**

- `any` - The result of the logical AND operation when the length of the conditions are 2.
- `boolean` - The result of logical AND on all conditions provided

**Example:**

```typescript
import { and } from 'uixtra/utils';

const result = and(true, false);
console.log(result); // Output: false

const result = and(true, true, true);
console.log(result); // Output: true
```

### `or`

Performs a logical OR operation between conditions provided.

**Parameters:**

- `conditions`: `Array<any>` - List of Conditions to Check

**Returns:**

- `any` - The result of the logical OR operation when the length of the conditions are 2.
- `boolean` - The result of logical OR on all conditions provided

**Example:**

```typescript
import { or } from 'uixtra/utils';

const result = or(true, false);
console.log(result); // Output: true
```

### `classNames`

classNames
Function to generate class names based on input arguments.

**Parameters:**

- `args`: `any[]` - Arguments to be processed. Can be a string or an object with keys as class names and values as booleans. If the value is true, the class name will be appended to the string, otherwise it will be ignored.

**Returns:**

- `string` - String of class names.

**Example:**

```typescript
import { classNames } from 'uixtra/utils';

const classes = classNames('btn', {
  'btn-primary': true,
  'btn-disabled': false,
});
console.log(classes); // Output: "btn btn-primary"
```

### `getProperty`

getProperty
Retrieves the value of a nested property from an object.
If the object is empty or the property is not found, it returns the default value.

**Parameters:**

- `obj`: `Object` - The object to retrieve the property from.
- `property`: `Array<string>` - An array of strings representing the nested property path.
- `defaultValue`: `any` - The default value to return if the property is not found.

**Returns:**

- `any` - The value of the nested property or the default value.

**Example:**

```typescript
import { getProperty } from 'uixtra/utils';

const obj = {
  property1: {
    property2: {
      property2: 100,
    },
  },
};

const res1 = getProperty(obj, ['property1', 'property2', 'property3'], 0);
const res2 = getProperty(obj, ['property1', 'property2', 'property4'], 99);
console.log(res1); // Output: 100
console.log(res2); // Output: 99
```

### Exports

The `utils/index.ts` file exports the following functions:

- `isNullOrUndefined`
- `ifElse`
- `isEmpty`
- `and`
- `or`
- `classNames`
- `getProperty`

These functions can be imported and used in other parts of the application as needed.

**Example:**

```typescript
import {
  isNullOrUndefined,
  ifElse,
  isEmpty,
  and,
  or,
  classNames,
  getProperty,
} from 'uixtra/utils';
```
