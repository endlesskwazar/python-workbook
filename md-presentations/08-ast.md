# Написати свою мову програмування



### Що таке інтерперетатор?

- Звичайна програма
- На вхід подається джерельний код
- На виході - результат виконання програми
- Ніякої магії


### Навіщо писати інтерперетатор?

- Хороший спосіб зрозуміти все працює
- Створення власної мови
- Створення специфічної, домено - орієтованої мови


### З чого складається інтереретатор?

- Lexer
- Parser
- AST
- Bytecode-compiler
- Bytecode interpreter
- Runtime

- Всі кроки послідовні (Source code -> Parser -> AST -> Bytecode-compiler -> Bytecode interpreter -> Runtime)



### Розроблювана мова?

```
a = 3;
if(a >= 2) {
    print "a is bigger than 2";
}
else {
    print a;
}
```


### rply

> Welcome to RPLY! A pure Python parser generator, that also works with RPython. It is a more-or-less direct port of David Beazley’s awesome PLY, with a new public API, and RPython support.

```bash
pip install rply
```


### Lexer?

В інформатиці лексичний аналіз ( «токенізація», від англ. Tokenizing) - процес аналітичного розбору вхідної послідовності символів на розпізнані групи - лексеми, з метою отримання на виході ідентифікованих послідовностей, званих «токенами»


### Lexer?

![](../resources/img/8/1.png)


### Lexer?

```py
from rply import LexerGenerator

lg = LexerGenerator()
lg.ignore(r"\s+")
lg.add("IF", r"if")
lg.add("ELSE", r"else")
lg.add("PRINT", r"print")
lg.add("NUMBER", r"\d+")
.....
lg.add("NAME", r"[a-zA-z_][a-zA-Z0-9_]*")
lexer - lg.build()
```


### Lexer?

```
>>> stream = lexer.lex("my_var = 23")
>>> stream
<rply.lexer.LexerStream object>
>>> stream.next()
Token('NAME', 'my_var')
>>> stream.next()
Token('EQUAL', '=')
>>> stream.next()
Token('NUMBER', '23')
>>> stream.next()
>>>
```


### Parsers

Синтаксичний аналіз (або розбір, жарг. Парсинг ← англ. Parsing) в лінгвістиці та інформатики - процес зіставлення лінійної послідовності лексем (слів, токенів) природної або формальної мови з його формальною граматикою. Результатом зазвичай є дерево розбору (синтаксичне дерево).


### Parsers

![](../resources/img/8/2.png)


### Parsers

```py
class Node:
    def __eq__(self, other):
        if not isinstance(other, Node):
            return NotImplemented
        return (type(self) is type(other) and
            self.__dict__ == other.__dict__)
    def __ne__(self, other):
        return not (self == other)
class Block(Node):
    def __init__(self, statements):
        self.statements = statements
class Statement(Node):
    def __init__(self, expr):
        self.expr = expr
class Number(Node):
    def __init__(self, value):
        self.value = value
```
