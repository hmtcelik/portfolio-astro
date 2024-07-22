---
publishDate: 2024-06-29T02:00:00Z
title: Callable Classes in Python
excerpt: In this article, I will explain how to create callable classes in Python. You can call an instance of a class like a function. It is really useful when you want to create a class that behaves like a function.
image: /images/blog/programming/callable-python.jpg
author: Abdulhamit Celik
category: Programming
tags: []
---

## What is Callable Class?

In Python, a callable is anything that can be called. For example, functions, methods, classes, and objects are callable. You can call them like a function. In this article, I will explain how to create callable classes in Python. You can call an instance of a class like a function. It is really useful when you want to create a class that behaves like a function.

## How to Create Callable Class?

To create a callable class, you need to define the `__call__` method in the class. This method will be called when you call an instance of the class. Here is an example:

```python
class Adder:
    def __init__(self, x):
        self.x = x

    def __call__(self, y):
        return self.x + y

adder = Adder(10)
result = adder(20)
print(result) # Output: 30
```

In this example, we defined the `Adder` class with the `__call__` method. This method takes a parameter `y` and returns the sum of `x` and `y`. When we create an instance of the `Adder` class and call it with a parameter, the `__call__` method will be called.

## Conclusion

In this article, I explained how to create callable classes in Python. You can call an instance of a class like a function by defining the `__call__` method in the class. It is really useful when you want to create a class that behaves like a function. If you have any questions, feel free to ask.

Happy coding! 🐍
