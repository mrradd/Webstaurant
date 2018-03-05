
INSERT INTO TypeConstants (Name, Class, Value)
VALUES ('Waiter',        'ET', 'ET_WAITER'),
       ('Cook',          'ET', 'ET_COOK'),
       ('Manager',       'ET', 'ET_MANAGER'),
       ('Beverage',      'IT', 'IT_BEVERAGE'),
       ('Entree',        'IT', 'IT_ENTREE'),
       ('Side',          'IT', 'IT_SIDE'),
       ('Dessert',       'IT', 'IT_DESSERT'),
       ('Cash Paid',     'PT', 'PT_CASH_PAID'),
       ('Cash Refunded', 'PT', 'PT_CASH_REFUND'),
       ('Dine In',       'TT', 'TT_DINE_IN'),
       ('Take Away',     'TT', 'TT_TAKE_AWAY');

INSERT INTO Employees (FirstName, LastName, EmployeeNumber, EmployeeType)
VALUES ('Tina',   'Belcher', 1, 'ET_MANAGER'),
       ('Gene',   'Belcher', 2, 'ET_COOK'),
       ('Louise', 'Belcher', 3, 'ET_WAITER');

INSERT INTO Users (EmployeeID, UserName, Password, Active)
VALUES (1, 'UserM', 'userm', 1),
	     (2, 'UserC', 'userc', 1),
       (3, 'UserW', 'userw', 1);

INSERT INTO Items (Name, Description, Price, Type)
VALUES ('Hamburger',    'Lettuce, tomato, pickle, special sauce, all beef paddy.',         5.00, 'IT_ENTREE'),
       ('Cheeseburger', 'Lettuce, tomato, pickle, cheese, special sauce, all beef paddy.', 5.25, 'IT_ENTREE'),
       ('Fries',        'Golden-brown fried goodness.',                                    2.00, 'IT_SIDE'),
       ('Soda',         '24oz. fountain drink. Free refills.',                             1.25, 'IT_BEVERAGE'),
       ('Ice Cream',    'Single scoop. Any flavor.',                                       1.00, 'IT_DESSERT');
