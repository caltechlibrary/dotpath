
# Tutorial: Using the `dotpath` Module in Go

The `dotpath` module in Go provides a convenient way to access nested data structures using dot-notated paths. This is particularly useful when working with JSON-like data or complex nested maps and slices. This tutorial will guide you through using the `dotpath` module, including example code and usage scenarios.

## Introduction

The `dotpath` module includes two primary functions:
- `GetDotpath(obj interface{}, path string) (interface{}, bool)`: Retrieves a value from a nested structure using a dot-notated path.
- `HasDotpath(obj interface{}, path string) bool`: Checks if a given path exists in a nested structure.

These functions allow you to easily navigate and query complex data structures.

## Setup

To use the `dotpath` module, you need to have it in your Go workspace.

~~~shell
go get github.com/caltechlibrary/dotpath
~~~

You import the `dotpath` module with

~~~go
import "github.com/caltechlibrary/dotpath"
~~~

For this tutorial, we'll assume you have the `dotpath` package available in your project directory.

## Example Data Structure

Let's consider the following nested data structure, which we'll use in our examples:

```go
data := map[string]interface{}{
    "user": map[string]interface{}{
        "profile": map[string]interface{}{
            "name":    "Alice",
            "hobbies": []interface{}{"reading", "hiking", "coding"},
        },
        "settings": map[string]interface{}{
            "notifications": []interface{}{"email", "sms"},
            "theme":         "dark",
        },
    },
    "stats": []interface{}{
        map[string]interface{}{"metric": "visits", "value": 1000},
        map[string]interface{}{"metric": "signups", "value": 250},
    },
}
```

## Using `GetDotpath`

The `GetDotpath` function allows you to retrieve values from a nested map or slice using a dot-notated path. Here's how you can use it:

```go
package main

import (
    "fmt"
    "github.com/caltechlibrary/dotpath"
)

func main() {
    data := map[string]interface{}{
        "user": map[string]interface{}{
            "profile": map[string]interface{}{
                "name":    "Alice",
                "hobbies": []interface{}{"reading", "hiking", "coding"},
            },
            "settings": map[string]interface{}{
                "notifications": []interface{}{"email", "sms"},
                "theme":         "dark",
            },
        },
        "stats": []interface{}{
            map[string]interface{}{"metric": "visits", "value": 1000},
            map[string]interface{}{"metric": "signups", "value": 250},
        },
    }

    // Retrieve the user's name
    if value, ok := dotpath.GetDotpath(data, "user.profile.name"); ok {
        fmt.Println("User's name:", value)
    } else {
        fmt.Println("Path not found")
    }

    // Retrieve the second hobby
    if value, ok := dotpath.GetDotpath(data, "user.profile.hobbies[1]"); ok {
        fmt.Println("Second hobby:", value)
    } else {
        fmt.Println("Path not found")
    }

    // Retrieve the value of signups
    if value, ok := dotpath.GetDotpath(data, "stats[1].value"); ok {
        fmt.Println("Signups value:", value)
    } else {
        fmt.Println("Path not found")
    }
}
```

### Explanation

- **Path Notation**: Use dot notation to specify the path. For lists, use bracket notation with zero-based indices (e.g., `hobbies[1]`).
- **Return Values**: `GetDotpath` returns the value at the specified path and a boolean indicating success.

## Using `HasDotpath`

The `HasDotpath` function checks if a given path exists in the nested structure. This is useful for validating paths before attempting to retrieve values.

```go
package main

import (
    "fmt"
    "github.com/caltechlibrary/dotpath" // Adjust the import path as needed
)

func main() {
    data := map[string]interface{}{
        "user": map[string]interface{}{
            "profile": map[string]interface{}{
                "name":    "Alice",
                "hobbies": []interface{}{"reading", "hiking", "coding"},
            },
            "settings": map[string]interface{}{
                "notifications": []interface{}{"email", "sms"},
                "theme":         "dark",
            },
        },
        "stats": []interface{}{
            map[string]interface{}{"metric": "visits", "value": 1000},
            map[string]interface{}{"metric": "signups", "value": 250},
        },
    }

    // Check if the path to the user's name exists
    if dotpath.HasDotpath(data, "user.profile.name") {
        fmt.Println("Path 'user.profile.name' exists")
    } else {
        fmt.Println("Path 'user.profile.name' does not exist")
    }

    // Check if the path to a non-existent key exists
    if dotpath.HasDotpath(data, "user.profile.age") {
        fmt.Println("Path 'user.profile.age' exists")
    } else {
        fmt.Println("Path 'user.profile.age' does not exist")
    }
}
```

### Explanation

- **Path Validation**: Use `HasDotpath` to check if a path exists before attempting to retrieve its value.
- **Return Value**: `HasDotpath` returns `true` if the path exists, `false` otherwise.
