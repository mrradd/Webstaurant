
/* View all orders in the system. */
SELECT *
  FROM Orders    o
  JOIN LineItems li ON li.OrderID = o.ID;

/* View all orders in the system for a specific Employee.
   This should be used in a stored procedure. */
SET @EmpID = 3;
SELECT *
  FROM Orders    o
  JOIN LineItems li ON li.OrderID = o.ID
 WHERE o.EmployeeID = @EmpID;

/* Check to see if the password and user credentials match.
   Should be used in a stored procedure. If 1 is returned,
   we have a match. */
SET @PW       = '';
SET @UserName = '';
SELECT 1
  FROM Users u
 WHERE u.UserName = @UserName
   AND u.Password = @PW;

/* Sets an order to the paid and closed status. */
SET @OrderID = 1;
UPDATE Orders
   SET Paid   = 1,
       Closed = 1
 WHERE ID = @OrderID

/* Insert some items into the Items table. */
INSERT INTO Items (Name, Description, Price, Type, SKU, BarCode)
VALUES ('Angry Orchard', 'Hard cider.',       5.00,  'IT_BEVERAGE', 'ANGRYORCHARD', ''),
       ('Hamburger',     'Burger with fries', 10.50, 'IT_ENTREE',   'BURGER',       '');
