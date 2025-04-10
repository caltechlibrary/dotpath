
# Tutorial: Using the `dotpath` Module in Python

The `dotpath` module in Python provides a convenient way to access nested data structures using dot-notated paths. This is particularly useful when working with JSON-like data or complex nested dictionaries and lists. This tutorial will guide you through using the `dotpath` module, including example code and usage scenarios.

## Introduction

The `dotpath` module includes two primary functions:
- `getDotpath(obj, path)`: Retrieves a value from a nested structure using a dot-notated path.
- `hasDotpath(obj, path)`: Checks if a given path exists in a nested structure.

These functions allow you to easily navigate and query complex data structures.

## Setup

To use the `dotpath` module, you need to have it in your Python environment. For this tutorial, we'll assume you have the `dotpath` module is available in your Python development environment via `vu` or other means.

## Example Data Structure

Let's consider the following nested data structure, which we'll use in our examples:

```python
data = {
    "user": {
        "profile": {
            "name": "Alice",
            "hobbies": ["reading", "hiking", "coding"]
        },
        "settings": {
            "notifications": ["email", "sms"],
            "theme": "dark"
        }
    },
    "stats": [
        {"metric": "visits", "value": 1000},
        {"metric": "signups", "value": 250}
    ]
}
```

## Using `getDotpath`

The `getDotpath` function allows you to retrieve values from a nested dictionary or list using a dot-notated path. Here's how you can use it:

```python
from dotpath import getDotpath

data = {
    "user": {
        "profile": {
            "name": "Alice",
            "hobbies": ["reading", "hiking", "coding"]
        },
        "settings": {
            "notifications": ["email", "sms"],
            "theme": "dark"
        }
    },
    "stats": [
        {"metric": "visits", "value": 1000},
        {"metric": "signups", "value": 250}
    ]
}

# Retrieve the user's name
result, ok = getDotpath(data, "user.profile.name")
if ok:
    print("User's name:", result)
else:
    print("Path not found")

# Retrieve the second hobby
result, ok = getDotpath(data, "user.profile.hobbies[1]")
if ok:
    print("Second hobby:", result)
else:
    print("Path not found")

# Retrieve the value of signups
result, ok = getDotpath(data, "stats[1].value")
if ok:
    print("Signups value:", result)
else:
    print("Path not found")
```

### Explanation

- **Path Notation**: Use dot notation to specify the path. For lists, use bracket notation with zero-based indices (e.g., `hobbies[1]`).
- **Return Values**: `getDotpath` returns the value at the specified path and a boolean indicating success.

## Using `hasDotpath`

The `hasDotpath` function checks if a given path exists in the nested structure. This is useful for validating paths before attempting to retrieve values.

```python
from dotpath import hasDotpath

data = {
    "user": {
        "profile": {
            "name": "Alice",
            "hobbies": ["reading", "hiking", "coding"]
        },
        "settings": {
            "notifications": ["email", "sms"],
            "theme": "dark"
        }
    },
    "stats": [
        {"metric": "visits", "value": 1000},
        {"metric": "signups", "value": 250}
    ]
}

# Check if the path to the user's name exists
if hasDotpath(data, "user.profile.name"):
    print("Path 'user.profile.name' exists")
else:
    print("Path 'user.profile.name' does not exist")

# Check if the path to a non-existent key exists
if hasDotpath(data, "user.profile.age"):
    print("Path 'user.profile.age' exists")
else:
    print("Path 'user.profile.age' does not exist")
```

### Explanation

- **Path Validation**: Use `hasDotpath` to check if a path exists before attempting to retrieve its value.
- **Return Value**: `hasDotpath` returns `True` if the path exists, `False` otherwise.

