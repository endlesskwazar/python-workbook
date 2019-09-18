# Зміст

${toc}

# Функції

Функція в python - об'єкт, який приймає аргументи і повертає значення. Зазвичай функція визначається за допомогою інструкції def.

```py
def [identifier](param1,param2,....paramN):
    [func body]
```

Наприклад:

```py
def sum(a, b):
    return a + b
```

**Якщо, Ви стикалися іщ функціями в такій мові прогрмування як C/C++, яка є статисно типізованою ось деякі ключові моменти, які потрібно знати:**

- **Типи параметрів функції**

Оскільки python динамічно - типізована мова програмування і нам не потрібно вказувати тип параметра, туди передати ми можемо будь-що: Напиклад функція, яка, начебто повинна додавати 2 числа, немподівано може опинитися функцією конкатенації:

```py
def add_two_numbers(a, b):
  return a + b

print(add_two_numbers(5,8))
print(add_two_numbers("Hello", " World!!!"))
```

![](../resources/img/2/1.png)

Або і взагалі виконатися із помилкою:

```py
def add_two_numbers(a, b):
  return a + b

print(add_two_numbers(5, "Word"))
```

![](../resources/img/2/2.png)

В даному випадку додати число із строкою не можна, оскільки в еас відсутній статичний етп компіляції, то підсказок не буде ніяких про помилку.

Боротися із такими ситуаціями можна, наприклад, використавши функцію isinstance(яка перевірить чи переданий в неї об'єкт є екземпляром вказаного типу) і умовний оператор:

```py
def add_two_numbers(a, b):
  if not isinstance(a, int):
    print("a must be int")
    return
  if not isinstance(b , int):
    print("b must be int")
    return
  return a + b

print(add_two_numbers(5, "Word"))
```

![](../resources/img/2/3.png)

- **Результат виконання функції**

Оператор return, який зустрічається в тілі функції завершує її виконання, якщо поряд з оператором return буде об'єкт, його буде повернуто, в іншому випадку буде повернуто None. Давайте це продумонмтруємо:

```py
def some_func(a):
  if a < 5:
    return 5
  elif 10 < a > 5:
    return

res1 = some_func(1)
res2 = some_func(8)
res3 = some_func(22)
print("res1", res1)
print("res2", res2)
print("res3", res3)
```

![](../resources/img/2/4.png)

## immutable і mutable параметри

## Параметри за замовчуванням

## Rest - оператор

# Функції "as first class citizens"

# Документація функцій

## Коментарі і doc-string

## Перевірка типів параметрів

# Модульність

Модулем в Python називається будь-який файл python - файл. Кожна програма може імпортувати модуль і отримати доступ до його класів, функцій і об'єктів.

У Python є ключові слова для імпорту модулів. Спробуйте ось цей:

```py
import this
```

![](../resources/img/2/5.png)

Вітаємо, ви знайшли «пасхальне яйце» в Python, також відоме як «Дзен». Це одна з кращих неофіційних частин роботи в Python. Сам по собі модуль this не робить нічого особливого, тільки показує оригінальний спосіб імпорту чогось. Тепер давайте імпортуємо що-небудь, чим ми зможемо скористатися в майбутньому, наприклад, модуль math:

```py
import math
 
print(math.sqrt(4)) # 2.0
```

Ми імпортували модуль math і використали функцію sqrt, - це не єдина функція в цьому модулі і нам доступні вони всі використовуючи лише ``` import math ```

Ви можете імпортувати з модуля тільки ті функції, які вам потрібні. Уявімо, що нам потрібно імпортувати тільки функцію sqrt:

```py
from math import sqrt
 
print( sqrt(16) ) # 4.0
```

Таким чином нам буде доступна лише функція sqrt із модуля math. Але, уявімо наступну ситуацію:

```py
from math import sqrt

def sqrt(x):
  pass

print(sqrt(9))
```

Як результат ми отримаємо попередження "redefinition of unused 'sqrt'" і неможливість використання імпортованої функції із модуля math. В Python і для такої ситуації є рішення, використовуючи alias(ключове слово as):

```py
from math import sqrt as sq

def sqrt(x):
  pass

print(sq(9)) # 3.0
```

Покищо ми імпортували лише вбудовані модулі в Python. Давайте напишемо власні. Нехай в нас буде така структура проекту:

![](../resources/img/2/6.png)

Із наступним всістом файлів:

helpers/helper.py:
```py
MAGICNUMBER = 44

def helper_func(a):
  print('i`m a helper function')
```

helpers/lib/my_lib.db:
```py
def db_connect(con):
  is_connected = True
  return is_connected
```

Імпортувати ці модулі в main.py можна наступним чином:

```py
from helpers.helper import MAGICNUMBER
from helpers.helper import helper_func
from helpers.lib.my_lib import db_connect

print(MAGICNUMBER)
helper_func(3)
print(db_connect(1))
```

??? here is explanation of path

???????????????? here is example of import all with like default syntax modules

# Модуль datetime

Модуль datetime містить наступні класи:
- datetime.date
- datetime.time
- datetime.datetime
- datetime.timedelta

## datetime.date

Конструктор класа:
```py
datetime.date(year, month, day)
```

Ініціалізація об'єкта:
```py
import datetime

some_date = datetime.date(2019, 9, 1)
print(some_date)
```

Об'єкт datetime.date є три поля (year, day, month) які ми можемо прочитати і змінити:
```py
import datetime

some_date = datetime.date(2019, 9, 1)
print("Year: ", some_date.year) # 2019
print("Month: ", some_date.month) # 9
print("Day: ", some_date.day) # 1
```

**Зверніть увагу**. Поля year, day, month не можна модифікувати - це призведе до помилки.

```py
import datetime

some_date = datetime.date(2019, 9, 1)
some_date.year = 2018
```

![](../resources/img/2/7.png)

???? heres info about comparing date

???? heres info about internal max/min dates

## datetime.time

Часовий об'єкт, datetime.time, представляє місцевий час.

Є декілька варіантів створення об'єкта time:

Пустий конструктор:
```py
from datetime import time

some_time = time()
print(some_time)
```

hour, minutes, seconds:
```py
from datetime import time

some_time = time(12, 30, 55)
print(some_time) # 12:30:55
```

hour, minute, second, microsecond:
```py
from datetime import time

some_time = time(12, 30, 55, 234566)
print(some_time) # 12:30:55.234566
```

Після створення об’єкта time ви можете легко надрукувати його атрибути, такі як година, хвилина тощо:

```py
from datetime import time

some_time = time(12, 30, 55, 234566)
print("Hour: ", some_time.hour)
print("Minutes: ", some_time.minute)
print("Second: ", some_time.second)
print("Microsecond: ", some_time.microsecond)
```

## datetime.datetime

## datetime.timdelta

## now

# Домашнє завдання

# Варіанти

# Контрольні запитання

1. віапвіа
2. ів аів
3. іваіва
4. іваіва
5. іваі
6. іваів
7. іваів
8. іваіва