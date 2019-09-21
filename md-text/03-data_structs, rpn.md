# Зміст

${toc}

# Стек і Черга

## Стек

### list

### collection.queue.deque

### Перевірка приавильності дужок

## Черга

### list

### collection.queue

# Кортеж(Tuple)

# Словник(Dict)

## Python objects as dict

# Множина(Set)

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
```

Додамо перевірку на правильність дужок із прикладу вище до нашої реалізації:
```py
```

**Код повністю можна знайти на: []()**

# Домашнє завдання

1. Доробіть розроблений RPN для роботи з числами із плаваючою точкою.
2. Додайте оператор піднесення в ступінь.
3. Додайте перевірку на букви.

# Контрольні запитання

1.
2.
3.
4.
5.
6.
7.