
# Tutorial: Using the `dotpath` Module in TypeScript

The `dotpath` module in TypeScript provides a convenient way to access nested data structures using dot-notated paths. This is particularly useful when working with JSON-like data or complex nested objects and arrays. This tutorial will guide you through using the `dotpath` module, including example code and usage scenarios.

## Introduction

The `dotpath` module includes two primary functions:
- `getDotpath(obj: any, path: string): [any, boolean]`: Retrieves a value from a nested structure using a dot-notated path.
- `hasDotpath(obj: any, path: string): boolean`: Checks if a given path exists in a nested structure.

These functions allow you to easily navigate and query complex data structures.

## Setup

To use the `dotpath` module, you need to have it in your TypeScript environment. For this tutorial, we'll assume you have the `dotpath.ts` file in your project directory or installed via an ES6 import.

~~~typescript
import * as dotpath from "https://caltechlibrary.github.io/dotpath/dotpath.ts";
~~~

## Example Data Structure

Let's consider the following nested data structure, which we'll use in our examples:

```typescript
const data = {
    user: {
        profile: {
            name: "Alice",
            hobbies: ["reading", "hiking", "coding"]
        },
        settings: {
            notifications: ["email", "sms"],
            theme: "dark"
        }
    },
    stats: [
        { metric: "visits", value: 1000 },
        { metric: "signups", value: 250 }
    ]
};
```

## Using `getDotpath`

The `getDotpath` function allows you to retrieve values from a nested object or array using a dot-notated path. Here's how you can use it:

```typescript
import * as dotpath from 'https://caltechlibrary.github.io/dotpath/dotpath.ts';

const data = {
    user: {
        profile: {
            name: "Alice",
            hobbies: ["reading", "hiking", "coding"]
        },
        settings: {
            notifications: ["email", "sms"],
            theme: "dark"
        }
    },
    stats: [
        { metric: "visits", value: 1000 },
        { metric: "signups", value: 250 }
    ]
};

// Retrieve the user's name
const [result, ok] = dotpath.getDotpath(data, "user.profile.name");
if (ok) {
    console.log("User's name:", result);
} else {
    console.log("Path not found");
}

// Retrieve the second hobby
const [hobbyResult, hobbyOk] = dotpath.getDotpath(data, "user.profile.hobbies[1]");
if (hobbyOk) {
    console.log("Second hobby:", hobbyResult);
} else {
    console.log("Path not found");
}

// Retrieve the value of signups
const [signupsResult, signupsOk] = dotpath.getDotpath(data, "stats[1].value");
if (signupsOk) {
    console.log("Signups value:", signupsResult);
} else {
    console.log("Path not found");
}
```

### Explanation

- **Path Notation**: Use dot notation to specify the path. For arrays, use bracket notation with zero-based indices (e.g., `hobbies[1]`).
- **Return Values**: `getDotpath` returns a tuple containing the value at the specified path and a boolean indicating success.

## Using `hasDotpath`

The `hasDotpath` function checks if a given path exists in the nested structure. This is useful for validating paths before attempting to retrieve values.

```typescript
import * as dotpath from 'https://caltechlibrary.github.io/dotpath/dotpath.ts';

const data = {
    user: {
        profile: {
            name: "Alice",
            hobbies: ["reading", "hiking", "coding"]
        },
        settings: {
            notifications: ["email", "sms"],
            theme: "dark"
        }
    },
    stats: [
        { metric: "visits", value: 1000 },
        { metric: "signups", value: 250 }
    ]
};

// Check if the path to the user's name exists
if (dotpath.hasDotpath(data, "user.profile.name")) {
    console.log("Path 'user.profile.name' exists");
} else {
    console.log("Path 'user.profile.name' does not exist");
}

// Check if the path to a non-existent key exists
if (dotpath.hasDotpath(data, "user.profile.age")) {
    console.log("Path 'user.profile.age' exists");
} else {
    console.log("Path 'user.profile.age' does not exist");
}
```

### Explanation

- **Path Validation**: Use `hasDotpath` to check if a path exists before attempting to retrieve its value.
- **Return Value**: `hasDotpath` returns `true` if the path exists, `false` otherwise.

