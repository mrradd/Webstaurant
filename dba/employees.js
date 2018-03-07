/*****************************************************************************
 * Employees *
 * Database accessors for Employees.
 ****************************************************************************/
var mDB = require('../db.js');

var employees = {};

/******************************************************************************
 * createEmployee *
 ***
 * Submits Employee detail to the database to create an Employee entry.
 *
 * @param  employee  Employee to use to create the new Employee record.
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
employees.createEmployee = function createEmployee(employee, callBack)
  {
  var cmd = "INSERT INTO Employees (FirstName, LastName, EmployeeNumber, EmployeeType) VALUES(?,?,?,?)"
  var parms = [employee.firstName, employee.lastName, employee.employeeNumber, employee.employeeType];

  mDB.establishConnection();

  /** Query the db, and call the call back with the result set. */
  mDB.pool.getConnection(function(err, conn)
    {
    conn.query(cmd, parms, function(err)
      {
      conn.release();

      if(err) throw err;

      callBack(err);
      });
    });
  }

/******************************************************************************
 * getEmployees *
 ***
 * Gets all Employees from the database.
 *
 * @param  callBack  Callback function to handle response from database call.
 *****************************************************************************/
employees.getEmployees = function getEmployees(callBack)
  {
  var cmd = "SELECT * FROM Employees";

  mDB.establishConnection();

  /** Query the db, and call the call back with the result set. */
  mDB.pool.getConnection(function(err, conn)
    {
    conn.query(cmd ,function(err,rows)
      {
      conn.release();

      if(err) throw err;

      console.log(rows);

      callBack(err, rows);
      });
    });
  }

module.exports = employees;