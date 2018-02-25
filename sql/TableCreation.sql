
CREATE TABLE TypeConstants
  (
  ID    BIGINT       NOT NULL AUTO_INCREMENT,
  Name  VARCHAR(100) NOT NULL,
  Class VARCHAR(100) NOT NULL,
  Value VARCHAR(100) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE (Value)
  );

CREATE TABLE Items
  (
  ID          BIGINT       NOT NULL AUTO_INCREMENT,
  Name        VARCHAR(200) NOT NULL,
  Description VARCHAR(100) NOT NULL,
  Price       NUMERIC(15,2),
  Type        VARCHAR(100),
  SKU         VARCHAR(100),
  BarCode     VARCHAR(100),
  PRIMARY KEY (ID),
  CONSTRAINT FK_Items_Type FOREIGN KEY (Type) REFERENCES TypeConstants (Value)
  );

CREATE TABLE Employees
  (
  ID             BIGINT       NOT NULL AUTO_INCREMENT,
  FirstName      VARCHAR(100) NOT NULL,
  LastName       VARCHAR(100) NOT NULL,
  EmployeeNumber BIGINT       NOT NULL,
  EmployeeType   VARCHAR(100) NOT NULL,
  PRIMARY KEY (ID),
  UNIQUE (EmployeeNumber),
  CONSTRAINT FK_Employees_EmployeeType FOREIGN KEY (EmployeeType) REFERENCES TypeConstants (Value)
  );

CREATE TABLE Users
  (
  ID         BIGINT       NOT NULL AUTO_INCREMENT,
  EmployeeID BIGINT       NOT NULL,
  UserName   VARCHAR(100) NOT NULL,
  Password   VARCHAR(100) NOT NULL,
  Active     BIT,
  PRIMARY KEY (ID),
  CONSTRAINT FK_Users_EmployeeID FOREIGN KEY (EmployeeID) REFERENCES Employees (ID),
  UNIQUE (UserName)
  );

CREATE TABLE Orders
  (
  ID          BIGINT   NOT NULL AUTO_INCREMENT,
  Date        DateTime NOT NULL,
  EmployeeID  BIGINT   NOT NULL,
  OrderNumber BIGINT   NOT NULL,
  Paid        BIT      NOT NULL,
  Closed      BIT      NOT NULL,
  TransactionType      VARCHAR(100),
  PRIMARY KEY (ID),
  CONSTRAINT FK_Orders_EmployeeID      FOREIGN KEY (EmployeeID)      REFERENCES Employees (ID),
  CONSTRAINT FK_Orders_TransactionType FOREIGN KEY (TransactionType) REFERENCES TypeConstants (Value)
  );

CREATE TABLE LineItems
  (
  ID              BIGINT NOT NULL AUTO_INCREMENT,
  ItemID          BIGINT,
  OrderID         BIGINT,
  Price           NUMERIC(15,2),
  Quantity        INT,
  Discount        BIT,
  DiscountAmount  NUMERIC(15,2),
  Subtotal        NUMERIC(15,2),
  TaxRate         FLOAT,
  TaxAmount       NUMERIC(15,2),
  TotalAmount     NUMERIC(15,2),
  PRIMARY KEY (ID),
  CONSTRAINT FK_LineItems_ItemID FOREIGN KEY (ItemID) REFERENCES Items (ID)
  );

CREATE TABLE Sess
  (
  SessionID VARCHAR(500),
  UserID    BIGINT,
  EmployeeType VARCHAR(100)
  );

