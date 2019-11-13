# Зміст

${toc}

# pygame

**pygame** — набір крос-платформових модулів для Python, призначених для створення відеоігор. Включає в себе бібліотеки комп'ютерної графіки і звуку. pygame був створений, щоб замінити pySDL після його «раптової смерті». pygame базується на **SDL**.

**Simple DirectMedia Layer (SDL)** — кросплатформна мультимедійна бібліотека, вільно поширювана разом із сирцевим кодом. Написана мовою C, яка надає простий інтерфейс до графіки, звуку та пристроїв вводу на різних платформах. Бібліотека SDL надає такі засоби, як швидкий вивід 2D-графіки, обробку вводу, програвання звуку, вивід 3D через OpenGL і безліч інших супутніх операцій у кросплатформовому виді, незалежно від використовуваної системи. Це спрощує створення застосунків і відеоігор, яким необхідно швидко виводити двовимірну графіку, програвати звук, використовувати просунуту обробку вводу користувача тощо.

# Головний цикл

Основний цикл (main loop) гри виконується і оновлює екран через фіксовані інтервали часу. Вони називаються частотою кадрів і визначають плавність переміщення. Зазвичай гри оновлюють екран 30-60 разів в секунду. Якщо частота буде меншою, то здасться, що об'єкти на екрані зависають.

Усередині основного циклу є три основні операції: обробка подій, оновлення стану гри і отрисовка поточного стану на екрані.

```py
import pygame as pg

pg.init()
clock = pg.time.Clock()
running = True
window = pg.display.set_mode((640, 480))
counter = 1

while running:
    clock.tick(60)
    counter += 1
    running = False if counter > 20 else True

pg.quit()
```

# Малювання

Функції модуля pygame.draw малюють геометричні примітиви на поверхні - екземплярі класу Surface. Як перший аргумент вони приймають поверхню. Тому при створенні тієї чи іншої поверхні її треба пов'язати зі змінною, щоб потім було що передати в функції модуля draw.

У більшості випадків фігури малюються всередині головного циклу, так як від кадру до кадру картинка на екрані повинна змінюватися. Тому на кожній ітерації циклу в функції модуля draw передаються дещо змінені аргументи (наприклад, щоразу змінюється координата x).

Однак у нас поки не буде ніякої анімації, і немає сенсу перемальовувати фігури на одному і тому ж місці на кожній ітерації циклу. Тому створювати примітиви будемо в основний гілці програми.

## rectangle

**pygame.Rect** - екземпляри даного класа представляють прямокутні області. Вони не мають графічного представлення у вікні гри. Цінність класу полягає у властивостях і методах, що дозволяють управляти розміщенням поверхонь, виконувати перевірку їх перекриття та ін.

```py
import pygame as pg

pg.init()
window = pg.display.set_mode((640, 480))

r = pg.Rect(0, 0, 30, 30)

while 1:
    for i in pg.event.get():
        if i.type == pg.QUIT:
            exit()
```

Запустивши даний код ми не побачимо прямокутника. Тому що в даному випадку він не має графічного представлення. Але ми можемо заповнити прямокутник, використовуючи клас pygame.Surface.

За допомогою класу **pygame.Surface** можна створювати додаткові поверхні. Після цього малювати їх на основнійй, яка створюється методом pygame.display.set_mode (), або один на одному. Малювання виконується за допомогою методу blit ().

У pygame поверхні створюються не лише викликом функції display.set_mode () або безпосередньо викликом конструктора класу Surface. Також в результаті виконання ряду інших функцій і методів. Це пов'язано з тим, що поверхні грають важливу роль, так як в кінцевому підсумку саме вони відображаються на екрані. Крім того вони дозволяють групувати об'єкти. Їх можна порівняти з шарами в анімації.

При створенні екземпляра Surface безпосередньо від класу необхідно вказати ширину і висоту, подібно до того, як це відбувається при виклику set_mode (). наприклад:

```py
surf = pygame.Surface((150, 150))
```

Метод blit () застосовується до тієї поверхні, на яку "накладається". На якій "малюється", інша. Іншими словами, метод blit () застосовується до батьківської Surface, в той час як дочірня приймає в якості аргументу. Також в метод треба передати координати розміщення верхнього лівого кута дочірньої поверхні в системі координат батьківського. наприклад:

```py
sc.blit(surf, (50, 20))
```

**Приклад Rect + Surface:**

```py
import pygame

pygame.init()

sc = pygame.display.set_mode((300, 300))
#RGB color
sc.fill((200, 255, 200))

surf1 = pygame.Surface((200, 200))
surf1.fill((220, 200, 0))  # желтая
surf2 = pygame.Surface((100, 100))
surf2.fill((255, 255, 255))  # белая

rect = pygame.Rect((70, 20, 0, 0))

surf1.blit(surf2, rect)
sc.blit(surf1, rect)

pygame.display.update()

while 1:
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
```

Прямокутники можна малювати безпосерднь ыз створеною поверхнею за допомогою методу rect модуля draw:

```py
import pygame

pygame.init()

sc = pygame.display.set_mode((300, 300))

pygame.draw.rect(sc, (255, 255, 255), (20, 20, 100, 75))
pygame.draw.rect(sc, (64, 128, 255), (150, 20, 100, 75), 8)

pygame.display.update()

while 1:
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
```

Сигнатура функції pygame.draw.rect:

```py
rect(surface, color, rect) -> Rect
rect(surface, color, rect, width=0) -> Rect
```

Зазвичай кольори виносять в окремі змінні-константи. Це полегшує читання коду:

```py
import pygame

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (125, 125, 125)
LIGHT_BLUE = (64, 128, 255)
GREEN = (0, 200, 64)
YELLOW = (225, 225, 0)
PINK = (230, 50, 230)

pygame.init()

sc = pygame.display.set_mode((300, 300))

pygame.draw.rect(sc, WHITE, (20, 20, 100, 75))
pygame.draw.rect(sc, LIGHT_BLUE, (150, 20, 100, 75), 8)

pygame.display.update()

while 1:
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
```

## line

Щоб намалювати лінію, а точніше - відрізок, треба вказати координати його кінців:

```py
import pygame

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (125, 125, 125)
LIGHT_BLUE = (64, 128, 255)
GREEN = (0, 200, 64)
YELLOW = (225, 225, 0)
PINK = (230, 50, 230)

pygame.init()

sc = pygame.display.set_mode((300, 300))

pygame.draw.line(sc, WHITE, [10, 30], [290, 15], 3)
pygame.draw.line(sc, WHITE, [10, 50], [290, 35])

pygame.display.update()

while 1:
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
```

Координати можна передавати як у вигляді списку, так і кортежу.

Функція lines () малюює ламані лінії:

```py
import pygame

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (125, 125, 125)
LIGHT_BLUE = (64, 128, 255)
GREEN = (0, 200, 64)
YELLOW = (225, 225, 0)
PINK = (230, 50, 230)

pygame.init()

sc = pygame.display.set_mode((300, 300))

pygame.draw.lines(sc, WHITE, True, [[10, 10], [140, 70], [280, 20]], 2)

pygame.display.update()

while 1:
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
```

Координати визначають місця зламу. Кількість точок може бути довільним. Третій параметр (True або False) вказує замикати чи крайні точки.

## polygon

Функція **polygon ()** малює довільний багатокутник. Задаються координати вершин.

```py
import pygame

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (125, 125, 125)
LIGHT_BLUE = (64, 128, 255)
GREEN = (0, 200, 64)
YELLOW = (225, 225, 0)
PINK = (230, 50, 230)

pygame.init()

sc = pygame.display.set_mode((300, 300))

pygame.draw.polygon(sc, WHITE, [[150, 10], [180, 50], [90, 90], [30, 30]])
pygame.draw.polygon(sc, WHITE, [[250, 110], [280, 150], [190, 190], [130, 130]])
# analog when using lines
pygame.draw.lines(sc, WHITE, True, [[250, 110], [280, 150], [190, 190], [130, 130]])

pygame.display.update()

while 1:
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
```

Так само як у випадку rect () для polygon () можна вказати товщину контуру.

## circle


Функція **circle ()** малює кола. Вказується центр окружності і радіус:

```py
import pygame

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (125, 125, 125)
LIGHT_BLUE = (64, 128, 255)
GREEN = (0, 200, 64)
YELLOW = (225, 225, 0)
PINK = (230, 50, 230)

pygame.init()

sc = pygame.display.set_mode((300, 300))

pygame.draw.circle(sc, YELLOW, (100, 100), 50)
pygame.draw.circle(sc, PINK, (200, 100), 50, 10)

pygame.display.update()

while 1:
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
```

Перезавантаження circle():

```py
circle(surface, color, center, radius) -> Rect
circle(surface, color, center, radius, width=0) -> Rect
```

## ellipse


У разі еліпса передається описуюча його прямокутна область:

```py
import pygame

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (125, 125, 125)
LIGHT_BLUE = (64, 128, 255)
GREEN = (0, 200, 64)
YELLOW = (225, 225, 0)
PINK = (230, 50, 230)

pygame.init()

sc = pygame.display.set_mode((300, 300))

pygame.draw.ellipse(sc, GREEN, (10, 50, 280, 100))

pygame.display.update()

while 1:
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
```

Перезавантаження функції ellipse:

```py
ellipse(surface, color, rect) -> Rect
ellipse(surface, color, rect, width=0) -> Rect
```

## arc

Нарешті, дуга - В\вказується прямокутник, що описує еліпс, з якого вирізується дуга. Четвертий і п'ятий аргументи - початок і кінець дуги, виражені в радіанах. Нульова точка праворуч.

```py
import pygame

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GRAY = (125, 125, 125)
LIGHT_BLUE = (64, 128, 255)
GREEN = (0, 200, 64)
YELLOW = (225, 225, 0)
PINK = (230, 50, 230)

pygame.init()

sc = pygame.display.set_mode((300, 300))

pi = 3.14
pygame.draw.arc(sc, WHITE, (10, 50, 280, 100), 0, pi)
pygame.draw.arc(sc, PINK, (50, 30, 200, 150), pi, 2*pi, 3)

pygame.display.update()

while 1:
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
```

## Проста анімація

Суть алгоритму в наступному. Беремо фігуру. Малюємо її на поверхні. Оновлюємо головне вікно, людина бачить картинку. Стираємо фігуру. Малюємо її з невеликим зсувом від початкової позиції. Знову оновлюємо вікно і так далі.

Як "стерти" стару фігуру? Для цього використовується метод fill () об'єкта Surface. Як аргумент передається колір. Фон можна зробити будь-яким, а не тільки чорним, який заданий за замовчуванням.

Нижче як приклад наводиться код анімації кола. Об'єкт з'являється з лівого боку, доходить до правої, зникає за нею. Після цього знову з'являється зліва.

```py
import pygame

FPS = 60
WIN_WIDTH = 500
WIN_HEIGHT = 100

WHITE = (255, 255, 255)
ORANGE = (255, 150, 100)

pygame.init()

clock = pygame.time.Clock()

sc = pygame.display.set_mode((WIN_WIDTH, WIN_HEIGHT))

r = 30
x = 0 - r
y = WIN_HEIGHT // 2

while 1:
    sc.fill(WHITE)

    for i in pygame.event.get():
        if i.type == pygame.QUIT: exit()

    pygame.draw.circle(sc, ORANGE, (x, y), r)

    pygame.display.update()

    if x >= WIN_WIDTH + r:
        x = 0 - r
    else:
        x += 2

    clock.tick(FPS)
```

# Обробка подій

Людина може керувати об'єктами в грі в основному з допомогую клавіатури, миші, джойстика. Коли на "маніпуляторах" щось рухається або натискається, то виникають події певних типів. Обробкою подій займається модуль pygame.event, який включає ряд функцій, найбільш важлива з яких pygame.event.get (), яка забирає з черги події, що відбулися.

У pygame, коли фіксується ту чи іншу подію, створюється відповідний йому об'єкт від класу Event. Уже з цими об'єктами працює програма. Екземпляри даного класу мають тільки властивості, у них немає методів. У всіх Екзеплярах є властивість type. Набір інших властивостей події залежить від значення type.

Події клавіатури можуть бути двох типів (мати одне з двох значень type) - клавіша була натиснута, клавіша була відпущена. Якщо ви натиснули клавішу і відпустили, то в чергу подій будуть записані обидва. Яке з них обробляти, залежить від контексту гри. Якщо ви затиснули клавішу і не відпускаєте її, то в чергу записується тільки один варіант - клавіша натиснута.

Події типу "клавіша натиснута" в поле type записується числове значення, що збігається зі значенням константи pygame.KEYDOWN. Події типу "клавіша відпущена" в поле type записується значення, яке співпадає із значенням константи pygame.KEYUP.

У обох типів подій клавіатури є атрибути key і mod. У key записується конкретна клавіша, яка була натиснута або відтиснуті. В mod - клавіші-модифікатори (Shift, Ctrl і ін.), Які були затиснуті в момент натискання або віджимання звичайної клавіші. У подій KEYDOWN також є поле unicode, куди записується символ натиснутоюклавіші (тип даних str).

```py
import pygame
 
FPS = 60
W = 700
H = 300
WHITE = (255, 255, 255)
BLUE = (0, 70, 225)
 
pygame.init()
sc = pygame.display.set_mode((W, H))
clock = pygame.time.Clock()
 
x = W // 2
y = H // 2
r = 50
 
while 1:
    sc.fill(WHITE)
 
    pygame.draw.circle(sc, BLUE, (x, y), r)
 
    pygame.display.update()
 
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
        elif i.type == pygame.KEYDOWN:
            if i.key == pygame.K_LEFT:
                x -= 3
            elif i.key == pygame.K_RIGHT:
                x += 3
 
    clock.tick(FPS)
```

Проблема даного коду в тому, що при виконанні програми, щоб коло рухалося, треба постійно натискати і віджимати клавіші. Якщо просто затиснути їх на тривалий період, то об'єкт не буде постійно рухатися. Він зміститися тільки одноразово на 3 пікселі.

Так відбувається тому, що подія натискання на клавішу відбувається один раз, як довго б її не тримали. Ця подія була забрана з черги функцією get () та оброблена. ЇЇ більше немає. Тому доводиться генерувати нову подію, ще раз натискаючи на клавішу.

Як бути, якщо за логікою речей треба, щоб куля рухалася до тих пір, поки клавіша затиснута? Коли ж вона відпускається, куля повинна зупинятися. Перше за все, що треба зробити, - це перенести зміна координати x в основну гілку головного циклу while. В такому випадку на кожній його ітерації координата буде змінюватися, а значить куля рухатися постійно.

По-друге, в циклі обробки подій нам доведеться стежити не тільки за натисканням клавіші, але і її відпусканням. Коли клавіша натискається, будь-яка змінна, яка відіграє роль прапора, повинна приймати одне значення, коли клавіша відпускається ця ж змінна повинна приймати інше значення.

В основному тілі while треба перевіряти значення цієї змінної і залежно від нього змінювати чи не змінювати значення координати.

```py
import pygame

FPS = 60
W = 700
H = 300
WHITE = (255, 255, 255)
BLUE = (0, 70, 225)
RIGHT = "to the right"
LEFT = "to the left"
STOP = "stop"

pygame.init()
sc = pygame.display.set_mode((W, H))
clock = pygame.time.Clock()

x = W // 2
y = H // 2
r = 50

motion = STOP

while 1:
    sc.fill(WHITE)

    pygame.draw.circle(sc, BLUE, (x, y), r)

    pygame.display.update()

    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
        elif i.type == pygame.KEYDOWN:
            if i.key == pygame.K_LEFT:
                motion = LEFT
            elif i.key == pygame.K_RIGHT:
                motion = RIGHT
        elif i.type == pygame.KEYUP:
            if i.key in [pygame.K_LEFT, pygame.K_RIGHT]:
                motion = STOP

    if motion == LEFT:
        x -= 3
    elif motion == RIGHT:
        x += 3

    clock.tick(FPS)
```

Насправді існує спосіб по-простіше. У бібліотеці pygame з подіями працює не тільки модуль event. Так модуль pygame.key включає функції, пов'язані виключно з клавіатурою. Тут є функція pygame.key.get_pressed (), яка повертає кортеж двійкових значень. Індекс кожного значення відповідає своїй клавіатурній константі. Саме значення дорівнює 1, якщо клавіша натиснута, і 0 - якщо не натиснута.

Ця функція підходить не для всіх випадків обробки клавіатурних подій, але в нашому підійде. Тому ми можемо спростити код до такого варіанту:

```py
import pygame

FPS = 60
W = 700
H = 300
WHITE = (255, 255, 255)
BLUE = (0, 70, 225)

pygame.init()
sc = pygame.display.set_mode((W, H))
clock = pygame.time.Clock()

x = W // 2
y = H // 2
r = 50

while 1:
    sc.fill(WHITE)

    pygame.draw.circle(sc, BLUE, (x, y), r)

    pygame.display.update()

    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()

    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        x -= 3
    elif keys[pygame.K_RIGHT]:
        x += 3

    clock.tick(FPS)
```

# Фізика, колізії

**Виявлення зіткнень** (англ. Collision detection) - обчислювальна проблема виявлення перетинів між собою двох або більше об'єктів. Тема найчастіше пов'язана з її використанням в фізичних двигунах, комп'ютерної анімації та робототехніки.

Використовуючи pygame.Rect з коробки є методи для визначення колізій:

|Метод|Пояснення|
|-|-|
|pygame.Rect.collidepoint||
|pygame.Rect.colliderect||
|pygame.Rect.collidelist||
|pygame.Rect.collidelistall||
|pygame.Rect.collidedict||
|pygame.Rect.collidedictall||

**collidepoint:**

```py
import pygame

FPS = 60
W = 700
H = 300
WHITE = (255, 255, 255)
BLUE = (0, 70, 225)

pygame.init()
sc = pygame.display.set_mode((600,600))

r = pygame.draw.rect(sc, BLUE, (100, 100, 50, 50))

if r.collidepoint(101, 101):
    print('point (101 101) in rectangle')

if r.collidepoint(14, 14):
    print('point (15,15) in rectangle')

clock = pygame.time.Clock()

while 1:
    pygame.display.update()
    for i in pygame.event.get():
        if i.type == pygame.QUIT:
            exit()
    clock.tick(FPS)
```

**pygame.Rect.colliderect:**

```py

```

**collidelist:**

```py

```

**collidelistall:**

```py

```

**collidedict:**

```py

```

**collidedictall:**

```py

```

# Звук

# Зоображення

# Розробляємо із використанням ООП

# android

# Домашнє завдання

# Контрольні запитання

1. Що таке pygame?
2. Перелічіть функції малювання геометричних фігур модуля pygame.draw.
3. Поясніть концепцію колізій. Перелічіть методи колізій класу pygame.Rect.
4. Поясніть як в pygame обробляти натиски клавіатури.