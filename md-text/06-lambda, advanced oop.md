# Зміст

${toc}

# Exceptions

Розгляньмо функцію:

```py
def div(a, b):
  return a / b
```

А тепер уявімо, що вона була викликана із наступними параметрами:

```py
div(1,0)
```

В результаті програма викинула так - званий "exception" і впала:

![](../resources/img/6/1.png)


У Python є багато вбудованих винятків, які змушують вашу програму виводити помилку, коли щось у ній йде не так.

Коли ці винятки трапляються, вони змушують поточний процес стати на паузу і передає керування в місце виклику, доки виняток не буде оброблений. Якщо вийняток не обробити, наша програма вийде з ладу.

Як раз у прикладі із функцією div стався виняток, який ми не обробили, тому програма впала.

Як обробляти вийняток в Python?

У Python винятки можна обробляти за допомогою оператора try.

Критична операція, яка може викликати виняток, розміщується всередині try, а код, який обробляє виняток, записується в exept:

```py
try:
  div(1,0)
except:
  print('Something goes wrong')
```

Тепер наша програма не падає, але бентежить не інформативне повідомлення. Це можна виправити, якщо except блок буде приймати об'єкт вийнятку. Якщо ми його матимемо, ми зможему вивести більш інформативне повідомлення:

```py
try:
  div(1,0)
except Exception as e:
  print(e)
```

![](../resources/img/6/2.png)

Уже краще, хоча Exception є батьківським класом для всіх можливих винятків, і виходить, що всі вийнятки ми будемо обробляти в одному контексті, що не дуже зручно. В execpt може вказуватися не лише Exception але і його дочірні класи:

```py
def div(a, b):
  return a / b

try:
  div(1,0)
except ZeroDivisionError as e:
  print(e)
```

І блок try може мати багато блоків exept, кожен із яких може обробляти конкретне виключення або їх групу:

```py
    try:
       # Критичний код
       pass
    except ValueError:
       # Обробляємо ValueError
       pass
    except (TypeError, ZeroDivisionError):
       # Обробляємо групу виключень
       # TypeError і ZeroDivisionError
       pass
    except:
       # Обробляємо інші виключення
       pass
```

У Python винятки виникають, коли під час виконання виникають відповідні помилки, але ми можемо самостійно їх викликати за допомогою ключового слова raise.

Ми також можемо передати допоміжній параметр для того, щоб уточнити причину винятку:

```py
def div(a, b):
  if b == 0:
    raise ZeroDivisionError('You passed zero f**king moron!!!')
  return a / b

try:
  div(1,0)
except ZeroDivisionError as e:
  print(e)
```

Як вже було сказано в Python є багато вбудованих винятків, які ми самостійно можемо використати при написанні власного коду:

|Виключення|Пояснення|
|-|-|
|ImportError|Піднімається, коли імпортований модуль не знайдено.|
|IndexError|Піднімається, коли індекс послідовності знаходиться поза діапазоном.|
|KeyError|Піднімається, коли ключ не знайдений у словнику.|
|MemoryError|Піднімається, коли операція закінчується пам'яттю.|
|TypeError|Піднімається, коли функція або операція застосована до об'єкта неправильного типу.|
|ValueError|Піднімається, коли функція отримує аргумент правильного типу, але неправильного значення.|

І т.д. Тобто ми можемо вибрати близьке нам виключення. Ми також можемо кинути загальне виключення, хоча це не найкращий варіант:

```py
def div(a, b):
  if b == 0:
    raise Exception('You passed zero f**king moron!!!')
  return a / b

try:
  div(1,0)
except Exception as e:
  print(e)
```

Якщо вбудованих винятків нам не вистачає, то ми можемо створити власний. Для цього достатньо створити клас. Цей клас має бути похідним, прямо чи опосередковано, від класу Exception. Більшість вбудованих винятків також походять із цього класу.

```py
class ZeroAfterDivisionException(Exception):
  pass

def division(a, b):
  res = a - b
  if res == 0:
    raise ZeroAfterDivisionException("Zeo after dividion")
  return res

try:
  division(1,1)
except ZeroAfterDivisionException as e:
  print(e)
```

Оператор try в Python може мати необов'язковий блок finally. Цей блок виконується завжди, і зазвичай використовується для звільнення зовнішніх ресурсів.

Наприклад, ми можемо бути підключені до віддаленого центру обробки даних через мережу або працювати з файлом або працювати з графічним інтерфейсом користувача (GUI).

У всіх цих обставинах ми повинні очистити ресурс, який ми використовували, незалежно від того, був він успішним чи ні. Ці дії (закриття файлу, графічний інтерфейс або відключення від мережі) виконуються в finally  для гарантії виконання.

```py
    try:
       f = open("test.txt",encoding = 'utf-8')
    finally:
       f.close()
```

# Decorators

# Абстрактний клас

Уявімо собі клас, який стане загальим класом будівельним блоком для інших класів - WalkingCreature.

```py
class WalkingCreature:
  
  def walk(self):
    pass
```

Кожен нащадок повинен реалізувати метод walk в залежності від того, що він буде із себе представляти - ходе він на 1, 2, 3 і більше ногах чи лапах. А от реалізація методу walk в класу WalkingCreature взагалі не потрібна. Такі класи називаються абстрактними. В нашому прикладі нече метод walk і не має реалізації, насправді це не зовсім так:

```py
class WalkingCreature:
  
  def walk(self):
    pass


class Human(WalkingCreature):
  pass


a = WalkingCreature()
b = Human()
```

В результаті запуску код успішно відпрацював, хоча тут у ньому є дві проблеми:

- Ми можемо створити екземпляр класу, у якого не реалізваний метод
- Нащадок класу може і не реалізовувати наш абстрактний метод

Наш приклад доволі простий і насправді не має ніякого відношення до абстрактних класів. Насправді і сам Python немає ніякого механізму абстрактних класів. Для цього він використовує модуль, який називається ABSs.

```py
from abc import ABC, abstractclassmethod

class WalkingCreature(ABC):
  
  @abstractclassmethod
  def walk(self):
    pass


a = WalkingCreature()
```

![](../resources/img/6/3.png)

```py
from abc import ABC, abstractclassmethod

class WalkingCreature(ABC):
  
  @abstractclassmethod
  def walk(self):
    pass


class Human(WalkingCreature):
  pass


a = Human()
```

![](../resources/img/6/4.png)

```py
from abc import ABC, abstractclassmethod

class WalkingCreature(ABC):
  
  @abstractclassmethod
  def walk(self):
    pass


class Human(WalkingCreature):
  
  def walk(self):
    print('walking on two legs')


a = Human()
a.walk()
```

# Lambda

# Mixins

# Multiple Inheritance

# Multilevel Inheritance

# Inheritance and the LSP

# Домашнє завдання

# Контрольні запитання