# Зміст

${toc}

# Стек і Черга

## Стек

Стек (англ. stack — «стос, стіс») в інформатиці та програмуванні — різновид лінійного списку, структура даних, яка працює за принципом (дисципліною) «останнім прийшов — першим пішов» (LIFO, англ. last in, first out). Всі операції (наприклад, видалення елементу) в стеку можна проводити тільки з одним елементом, який знаходиться на верхівці стека та був введений в стек останнім. 

### list

Стек в python можна змоделювати за допомогою list:

```py
stack = ["Amar", "Akbar", "Anthony"] 
stack.append("Ram") 
stack.append("Iqbal") 
print(stack) 
print(stack.pop()) 
print(stack) 
print(stack.pop()) 
print(stack) 
```

### collection.queue.deque

Deque може бути реалізований у python, використовуючи модуль "collection". Deque надається перевагу над списком у тих випадках, коли нам потрібно швидше додавати та виконувати операції з обох кінців контейнера, оскільки deque забезпечує складність у часі O (1) для операцій додавання та pop, порівняно зі списком, який забезпечує складну часову складність O (n).

Методи Deque, які можуть бути використані для того, що створити stack:

|Метод|Пояснення|
|-|-|
|append()|Ця функція використовується для вставки значення до правого кінця deque.|
|appendleft()|Ця функція використовується для вставки значення до лівого кінця deque.|
|pop()|Ця функція використовується для видалення аргументу з правого кінця deque.|
|popleft()|Ця функція використовується для видалення аргументу з лівого кінця deque.|

```py
import collections

stack = collections.deque()
stack.append(1);
top = stack.pop();

stack = collections.deque()
stack.appendleft(2)
top = stack.popleft()
```

### Перевірка приавильності дужок

Дано рядок, напишіть програму python, щоб виявити, чи заданий рядок має врівноважені дужки чи ні.

```
Input : {[]{()}}
Output : Balanced

Input : [{}{}(]
Output : Unbalanced
```

Один із підходів до перевірки збалансованих дужок - це використання стека. Щоразу, коли зустрічаються відкриті дужки, додаєте в стек, а коли виникають закриті дужки, порівнюйте його з вершиною стека і висувайте його. Якщо стек порожній в кінці, поверніть Збалансований інакше, Незбалансований.

```py
open_list = ["[","{","("] 
close_list = ["]","}",")"] 
  
def check(myStr): 
    stack = [] 
    for i in myStr: 
        if i in open_list: 
            stack.append(i) 
        elif i in close_list: 
            pos = close_list.index(i) 
            if ((len(stack) > 0) and
                (open_list[pos] == stack[len(stack)-1])): 
                stack.pop() 
            else: 
                return "Unbalanced"
    if len(stack) == 0: 
        return "Balanced"
  
string = "{[]{()}}"
print(string,"-", check(string)) 
  
string = "[{}{})(]"
print(string,"-", check(string)) 
```

## Черга

Чергою називається структура даних, з-за якої удається той, який був першим доданий. Очередні також називають структуру типів FIFO.

### list

```py
fruits = []

fruits.append('banana')
fruits.append('grapes')
fruits.append('mango')
fruits.append('orange')

first_item = fruits.pop(0)
print(first_item)

first_item = fruits.pop(0)
print(first_item)

print(fruits) # ['c', 'a']
```

### queue.Queue

```py
from queue import Queue
q = Queue()

q.put('eat')
q.put('sleep')
q.put('code')

top = q.get()
```

# Кортеж(Tuple)

Кортеж схожий на list, але ви створюєте його з круглими скобками, замість квадратних. Ви також можете використовувати встроенний інструмент для створення кортежу. Різниця у тому, що кортеж незмінний, в той час, як список може змінитися. Давайте взглянем на кілька прикладів:

```py
my_tuple = (1, 2, 3, 4, 5)
a = my_tuple[0]
print(a)
 
another_tuple = tuple()
abc = tuple([1, 2, 3])
```

# Словник(Dict)

Словник Python, за більшою частиною, представляє собою хеш-таблицю. У деяких мовах словарі можуть використовуватись як асоціативна пам'ять, чи асоціативні массиви. Вони індексируються за допомогою ключів, які можуть бути будь-якими immutable типами. Наприклад, строка або число може бути ключем. Ви обов'язково зупиняєтеся на тому факті, що словник - це унікальний набір ключа: значення, а ключі обов'язково повинні бути унікальними.

Створити словник можна 2-ма способами:

```py
my_dict = {}
another_dict = dict()

my_dict = {
  "key1": "value1",
  "key2": 33
}

print(my_dict["key1"])
print(my_dict.get("key1"))
print("present" if "key1" in my_dict else "not present")
```

Ви можете отримати список ключів шляхом методу keys ()

```py
d = {
  "a": "a",
  "b": "b"
}

for k in d.keys():
  print(k)
```

Зручно ітеруватися по словнику використовуючи for:

```py
d = {
  "a": "a",
  "b": "b"
}

for k,v in d.items():
  print(k, v)
```

Змінити словник можна наступним чином:

```py
d = {
  "a": "a",
  "b": "b",
  "c": "c"
}

del d["a"];
d.pop("b")

d.update({
  "z": "z"
})

print(d)
```

# Множина(Set)

Множини в python - "контейнер", що містить не повторювані елементи в випадковому порядку.

Створення:

```py
>>> a = set()
>>> a
set()
>>> a = set('hello')
>>> a
{'h', 'o', 'l', 'e'}
>>> a = {'a', 'b', 'c', 'd'}
>>> a
{'b', 'c', 'a', 'd'}
>>> a = {i ** 2 for i in range(10)}
>>> a
{0, 1, 4, 81, 64, 9, 16, 49, 25, 36}
```

Множини зручно використовувати для видалення дублікатів:

```py
>>> words = ['hello', 'daddy', 'hello', 'mum']
>>> set(words)
{'hello', 'daddy', 'mum'}
```

З дукількома множинами можна виконати багато операцій:

|Операція|Пояснення|
|-|-|
|x in s|Чи належить до x множини s.|
|set.isdisjoint(other)|істина, якщо set та other, не має спільних елементів.|
|set == other|всі елементи set належать other, всі елементи other належать set.|
|set.issubset(other) або set <= other|всі елементи set належать other.|
|set.union(other, ...)|об'єднання кількох множин.|
|set.difference(other, ...)|множина усіх елементів set, які не належать жодному з other.|

і т.д.

## FrozenSet

Єдина відмінність set від frozenset полягає в тому, що set - змінюваний тип даних, а frozenset - немає. Приблизно схожа ситуація з списками і кортежами.

```py
>>> a = set('qwerty')
>>> b = frozenset('qwerty')
>>> a == b
True
>>> True
True
>>> type(a - b)
<class 'set'>
>>> type(a | b)
<class 'set'>
>>> a.add(1)
>>> b.add(1)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'frozenset' object has no attribute 'add'
```


# Зворотньо - польська нотація

Зворо́тний по́льський за́пис (зворотний бездужковий запис, постфіксна нотація, польський інверсний запис (ПОЛІЗ), англ. RPN — Reverse Polish Notation) — форма запису математичних виразів, в якій знаки операцій розташовано після операндів. Розташування знаків операцій перед операндами використовує польська нотація.

Наприклад:

```
a + b = ab+
a + b * c = abc*+
(a + b) * c = ab+c*
```

Зворотний польський запис є зручним для застосування в обчислювальних пристроях. Наприклад, для обчислення виразу 

```
a + b
```

слід виконати такі дії:

- обчислити a
- обчислити b
- скласти результати

Саме така послідовність і задається польським інверсним записом:

```
a b +
```

Завдяки цьому RPN здобув досить широке розповсюдження в інженерних мікрокалькуляторах та мікрокомп'ютерах. Зокрема, такі калькулятори виробляли фірми Hewlett-Packard (HP 9100A), Texas Instruments. Практично всі програмовані калькулятори, що вироблялися в СРСР (Б3-34, MK-52, MK-61 та інші) застосовували зворотну польську нотацію.

Комп'ютерні програми зазвичай під час аналізу формул перетворюють їх на послідовність інструкцій у RPN, і саме в такому порядку вони виконуються.

На основі постфіксної нотації побудовано мову програмування Forth, також вона безпосередньо застосовується у PostScript.

Стековою машиною називається алгоритм, який проводить обчислення за зворотної польської нотації.

## Infix to Postfix

Розгляньмо як можна перетворити infix в postfix.

Для цього нам знадобиться стек операцій і масив виходу. Далі важливо визначити пріоритет операцій. Це необхідно для правильного розподілу порядку математичних дій, щоб, наприклад, віддавати перевагу множенню перед додаванням.

- Високий пріоритет (1): тут, слідуючи законам математики, розмістимо множення і ділення.
- Низький пріоритет (2): сюди потрапляють додавання і віднімання.

Після того, як ми визначилися з пріоритетами, перейдемо до самого будівництва. Перед тим як почати, я повинен дещо пояснити:
всі числа є операндами. Вони завжди записуються в масив виходу. Знаки додавання, віднімання і так далі - є операціями. Але вони можуть перебувати як в стекові операцій, так і в масиві виходу. Куди вони потрапляють - залежить від того, що знаходиться останнім у стекові.

Не дивлячись на те, що алгоритм RPN вважається бездужковим, ми все одно вважаємо дужку за операцію:

- ( - просто кладемо на стек операцій
- ) - Тут необхідно взяти всі знаки з стека в масив до першої відкриває дужки. Від обох дужок нам просто потрібно позбутися.

**Тепер давайте повторимо все на прикладі**:

Переводити будемо такий вираз: 

```
(1 + 2) * 3 -> 12+3*
```

1. Читаємо '('

> Додаємо в стек операцій

- Вихідний масив: пусто
- Стек операцій: (

2. Читаємо '1'

> Додаємо в вихідний масив

- Вихідний масив: 1
- Стек операцій: (

3. Читаємо '+'

> Додаємо в стек операцій

- Вихідний масив: 1
- Стек операцій: ( +

4. Читаємо '2'

> Додаємо в вихідний масив

- Вихідний масив: 1 2
- Стек операцій: ( +

5. Читаємо ')'

> Тут необхідно взяти всі знаки з стека в масив до першої відкриваючої дужки дужки. Від обох дужок нам просто потрібно позбутися.

- Вихідний масив: 1 2 +
- Стек операцій: пусто

6. Читаємо '*'

> Кладемо в стек операцій

- Вихідний масив: 1 2 +
- Стек операцій: *

7. Читаємо '3'

> Кладемо у вихідний масив

- Вихідний масив: 1 2 + 3
- Стек операцій: *

8. Кінець виразу

> Так як всі символи у нас закінчилися, ми просто беремо все з стека операцій у масив виходу.

- Вихідний масив: 1 2 + 3 *
- Стек операцій: пусто

**Для закріплення розгляньмо ще один приклад:**

```
1+2*3 -> 123*+
```

1. Читаємо '1'

> Кладемо у вихідний масив

- Вихідний масив: 1
- Стек операцій: пусто

2. Читаємо '+'

> Кладемо у стек операцій

- Вихідний масив: 1
- Стек операцій: +

3. Читаємо '2'

> Кладемо у вихідний масив

- Вихідний масив: 1 2
- Стек операцій: +

4. Читаємо '*'

> Останній символ в стеці операцій (+) має пріоритет нижче, ніж поточний знак (*). Тому останній знак з стека ми не чіпаємо, а просто додаємо як зазвичай поточний в стек. Інакше - останній знак із стека потрібно було б перемістити у вихідний масив

- Вихідний масив: 1 2
- Стек операцій: + *

5. Читаємо '3'

> Кладемо у вихідний масив

- Вихідний масив: 1 2 3
- Стек операцій: + *

6. Кінець виразу

> Так як всі символи у нас закінчилися, ми просто беремо все з стека операцій у масив виходу.

- Вихідний масив: 1 2 3 * +
- Стек операцій: пусто

**Розгляньмо реалізацію такого алгоритма на Python:**

```py
from .helpers import isOperand
from .helpers import isLeftParenthesis
from .helpers import isRightParenthesis
from .helpers import hasLessOrEqualPriority

def toPostfix(infix: str) -> list:
  """ Converts infix to postfix notation.

  :param (str) infix: Infix string
  :returns (list): List of postfix notation
  """
  stack = []
  postfix = []

  for c in infix:
      if isOperand(c):
          postfix.append(c)
      else:
          if isLeftParenthesis(c):
              stack.append(c)
          elif isRightParenthesis(c):
              operator = stack.pop()
              while not isLeftParenthesis(operator):
                  postfix.append(operator)
                  operator = stack.pop()              
          else:
              while (not (stack == [])) and hasLessOrEqualPriority(c,stack[-1]):
                  postfix.append(stack.pop())
              stack.append(c)

  while (not (stack == [])):
      postfix.append(stack.pop())
  return postfix
```

де helpers:

```py
def isOperand(symbol: str) -> bool:
  """ Check if symbol is digit

  :param (str) symbol: Symbol to check
  :returns (bool): True - if digit, False - if not digit
  """
  return True if symbol.isdigit() else False

def isLeftParenthesis(symbol: str) -> bool:
  """ Check if symbol is left parentathesis

  :param (str) symbol: Symbol to check
  :returns (bool): True - if left parentathesis, False - otherwise
  """
  return True if symbol == "(" else False

def isRightParenthesis(symbol: str) -> bool:
  return True if symbol == ")" else False

def hasLessOrEqualPriority(firstOperator: str, secondOperator: str) -> bool:
  """ Checks if first operator has less or equal priority compare to second operator.

  :param (str) firstOperator: First operator to compare
  :param (str) secondOperator: Second operator to compare
  :returns (bool): True - if less or equal priority, False - otherwise
  """
  priority = {
    '*': 2,
    '/': 2,
    '+': 1,
    '-': 1,
    '(': 0,
    ')': 0
  }
  if priority.get(firstOperator) <= priority.get(secondOperator):
    return True;
  return False;
```


## Evaluate Postfix

Автоматизація обчислення виразів в зворотної польської нотації заснована на використанні стека. Алгоритм обчислення для стековой машини елементарний:

1. Перевірка вхідного символу
    - Якщо на вхід подано операнд, він поміщається на вершину стека.
    - Якщо на вхід поданий знак операції, то відповідна операція виконується над необхідною кількістю значень, витягнутих з стека, взятих в порядку додавання. Результат виконаної операції кладеться на вершину стека.
2. Якщо вхідний набір символів оброблений в повному обсязі, перейти до кроку 1.
3. Після повної обробки вхідного набору символів результат обчислення виразу лежить на вершині стека.

Подивимося на реалізацію:
```py
def postixEval(stack: list) -> int:
    """ Evaluate postfix notation

    :param (list) stack: Stack with postfix notation
    :returns (int): Result of evaluation
    """
    res = list()
    for symbol in stack:
        if symbol.isdigit():
            res.append(int(symbol))
        elif not (res == []):
            temp = operators.get(symbol)(res.pop(), res.pop())
            res.append(temp)
    return res.pop()
```

де operators:
```py
def add(a: int, b:int) -> int:
    """ Add two numbers

    :param (int) a: First number
    :param (int) b: Second number
    :returns (int): Sum of two numbers
    """
    return a + b

def minus(a: int, b: int) -> int:
    """ Substruct b from a
    :param (int) a: left operand.
    :param (int) b: right operand
    :returns (int): Result of substruction
    """
    return a - b

def multiply(a: int, b: int) -> int:
    """ Add two numbers

    :param (int) a: First number
    :param (int) b: Second number
    :returns (int): Sum of two numbers
    """
    return a * b

def division(a: int, b: int) -> int:
    """ Add two numbers

    :param (int) a: First number
    :param (int) b: Second number
    :returns (int): Sum of two numbers
    """
    return a / b

operators = {
        '+': add,
        '-': minus,
        '*': multiply,
        '/': division
}
```

## RPN + Prentacies checker final code

Зробімо функцію rpn, яка приймає в себе компоненти для того щоб виконати задачу. В якості компонентів ми використаємо функції(така реалізація дозволить легко замінювати складові частини):

```py
def rpn(infix, infix__postfix, postfix_evaluetor, *checkers):
    for checker in checkers:
        if not checker(infix):
            print("Invalid syntax")
            return
    postfix = infix__postfix(infix)
    res = postfix_evaluetor(postfix)
    return res
```

**Код повністю можна знайти на: [rpn_py](https://github.com/endlesskwazar/rpn_py)**

# Домашнє завдання

1. Доробіть розроблений RPN для роботи з числами із плаваючою точкою.
2. Додайте оператор піднесення в ступінь.
3. Додайте перевірку на букви.
4. Задокументуйте функцію rpn.

# Контрольні запитання

1. Назвіть, які вбудовані структури даних в Python можуть бути використані в якості стека.
2. Назвіть, які вбудовані структури даних в Python можуть бути використані в якісті черги.
3. Що таке кортеж в Python?
4. Що таке множина в Python?
5. Що таке словник в Python?
6. Поясніть алгоритм обернено - польської нотації.