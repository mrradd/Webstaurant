
INSERT INTO TypeConstants (Name, Class, Value)
VALUES ('Waiter',        'ET', 'ET_WAITER'),
       ('Cook',          'ET', 'ET_COOK'),
       ('Manager',       'ET', 'ET_MANAGER'),
       ('Bevereage',     'IT', 'IT_BEVERAGE'),
       ('Entree',        'IT', 'IT_ENTREE'),
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

INSERT INTO Items (Name, Description, Price, Type, SKU, BarCode)
VALUES ('Angry Orchard', 'Hard cider.',       5.00,  'IT_BEVERAGE', 'ANGRYORCHARD', ''),
       ('Hamburger',     'Burger with fries', 10.50, 'IT_ENTREE',   'BURGER',       '');

INSERT INTO Orders (Date, EmployeeID, OrderNumber, Paid, Closed)
VALUES ('2017/04/05', 3, 1, 0, 0);

INSERT INTO LineItems (ItemID, OrderID, Price, Quantity, Discount, DiscountAmount, Subtotal, TaxRate, TaxAmount, TotalAmount, TransactionType, PaymentType)
VALUES (2, 1, 10.50, 1, 0.00, 0.00, 10.50, 0.08, 0.84, 11.34, 'TT_DINE_IN', 'PT_CASH_PAID');
