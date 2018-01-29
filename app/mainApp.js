/******************************************************************************
 * app */
/**
* Main application module.
******************************************************************************/
var app = angular.module("app", ["ngRoute"]);

/******************************************************************************
 * Config - Route Provider */
/**
* Configure the route provide.
******************************************************************************/
app.config(function($routeProvider)
  {
  $routeProvider
  .when('/', {template: "<login></login>"})
  .when('/kitchen', {template: "<kitchen></kitchen>"})
  .when('/manager', {template: "<manager></manager>"})
  .when('/pos', {template: "<pos></pos>"});
  //.otherwise(       {templateUrl: "app/error.html"});
  });