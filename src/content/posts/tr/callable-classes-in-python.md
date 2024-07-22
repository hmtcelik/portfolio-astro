---
publishDate: 2024-06-29T02:00:00Z
title: Python'da Çağrılabilir Sınıflar
excerpt: Bu makalede, Python'da çağrılabilir sınıfların nasıl oluşturulacağını açıklayacağım. Bir sınıfı bir fonksiyon gibi çağıraracağız.
image: /images/blog/programming/callable-python.jpg
author: Abdulhamit Celik
category: Programming
tags: []
---

## What is Callable Class?

Python'da çağrılabilir olan her şey çağrılabilir olarak adlandırılır. Örneğin, fonksiyonlar, metotlar, sınıflar ve nesneler çağrılabilir olarak adlandırılır. Onları bir fonksiyon gibi çağırabilirsiniz. Bu makalede, Python'da çağrılabilir sınıflar nasıl oluşturulur açıklayacağım. Bir sınıfın örneğini bir fonksiyon gibi çağırabilirsiniz. Bir sınıf oluşturmak istediğinizde oldukça yararlıdır.

## Çağrılabilir Sınıf Nasıl Oluşturulur?

Bir çağrılabilir sınıf oluşturmak için, sınıfta `__call__` yöntemini tanımlamanız gerekir. Bu yöntem, sınıfın bir örneğini çağırdığınızda çağrılacaktır. İşte bir örnek:

```python
class Adder:
    def __init__(self, x):
        self.x = x

    def __call__(self, y):
        return self.x + y

adder = Adder(10)
result = adder(20)
print(result) # 30
```

Bu örnekte, `Adder` sınıfını `__call__` yöntemiyle tanımladık. Bu yöntem bir `y` parametresi alır ve `x` ve `y`'nin toplamını döndürür. Bir `Adder` sınıfının örneğini oluşturduğumuzda ve bir parametre ile çağırdığımızda, `__call__` yöntemi çağrılacaktır.

## Sonuç

Bu makalede, Python'da çağrılabilir sınıfların nasıl oluşturulacağını açıkladım. Bir sınıfın örneğini bir fonksiyon gibi çağırarak, sınıfta `__call__` yöntemini tanımlayarak yapabilirsiniz. Bir fonksiyon gibi davranan bir sınıf oluşturmak istediğinizde oldukça yararlıdır. Herhangi bir sorunuz varsa, sormaktan çekinmeyin.

Kolay gelsin! 🐍
