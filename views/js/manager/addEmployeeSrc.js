$(document).ready(function()
  {
  /** Self reference. */
  var mThis = this;

  /** Data object for model. */
  mThis.data = {};

  /** List of Employees. */
  mThis.data.employees = [];

  /** Represents Employee being created. */
  mThis.data.employee =
    {
    id: null,
    firstName: "",
    lastName: "",
    employeeNumber: "",
    employeeType: ""
    }

  /*********
  * Events *
  *********/
  /****************************************************************************
   * evt: Submit Button click *
   ***
   * Add click event to the submit button that calls the database and submits
   * the Employee entered into the current Employee detail fields. The fields
   * are then cleared.
   ***************************************************************************/
  $("#btnSubmit").click(function()
    {
    mThis.data.employee.firstName      = $('#inputFirstName').val();
    mThis.data.employee.lastName       = $('#inputLastName').val();
    mThis.data.employee.employeeNumber = $('#inputEmployeeNumber').val();
    mThis.data.employee.employeeType   = $('#selectEmployeeType').val();
    submitEmployee();
    });

  /************
  * Functions *
  ************/
  /****************************************************************************
   * appendToEmployeeTable *
   ***
   * Appends a row to the employee table with the passed in values.
   ***************************************************************************/
  function createEmployeeTable()
    {
    var html = "";

    /** Iterate over the employee list adding them as rows to the DOM. */
    for (var i = 0; i < mThis.data.employees.length; i++)
      {
      var id    = mThis.data.employees[i].id;
      var fName = mThis.data.employees[i].firstName;
      var lName = mThis.data.employees[i].lastName;
      var eNum  = mThis.data.employees[i].employeeNumber;
      var eType = mThis.data.employees[i].employeeType;

      /** Construct the table row. */
      html += "<tr data-id='" + id + "'>" +
        "<td>" + id    + "</td>" +
        "<td>" + fName + "</td>" +
        "<td>" + lName + "</td>" +
        "<td>" + eNum  + "</td>" +
        "<td>" + eType + "</td>" +
        "</tr>";
      }
    $('#employeeList').append(html);
    }

  /****************************************************************************
   * getEmployees *
   ***
   * Get all employees from database.
   ***************************************************************************/
  function getEmployees()
    {
    $.get("http://localhost:3000/getEmployees", function(result)
      {
      /** Map result. */
      for(var i = 0; i < result.length; i++)
        {
        var emp = {};

        emp.id             = result[i].ID;
        emp.firstName      = result[i].FirstName;
        emp.lastName       = result[i].LastName;
        emp.employeeNumber = result[i].EmployeeNumber;
        emp.employeeType   = result[i].EmployeeType;

        mThis.data.employees.push(emp);
        }

      console.log(mThis.data.employees);
      createEmployeeTable();
      });
    }

  /****************************************************************************
   * submitEmployee *
   ***
   * Submits the Employee details entered into the Edit Menu form to the
   * database to create an record.
   ***************************************************************************/
  function submitEmployee()
    {
    $.ajax(
      {
      url        : 'http://localhost:3000/postCreateEmployee',
      type       : 'POST',
      contentType: 'application/json',
      data       : JSON.stringify(mThis.data.employee)
      });
    }

  /****************************************************************************
   * start *
   ***
   * Initialize the app.
   ***************************************************************************/
  function start()
    {
    getEmployees();

    /** Init select list of Employee types. */
    //TODO CH  LOAD EMPLOYEE TYPES DYNAMICALLY.
    var arr =
      [
      {val : 'ET_MANAGER', text: 'Manager'},
      {val : 'ET_COOK',    text: 'Cook'},
      {val : 'ET_WAITER',  text: 'Waiter'}
      ];

    $(arr).each(function()
      {
      $('#selectEmployeeType').append($("<option>").attr('value',this.val).text(this.text));
      });
    }

  /** Start the initialization process of the app. */
  start();
  });