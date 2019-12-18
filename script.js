var app = angular.module("myApp", []);

app.controller('MainCtrl', ['$scope','$filter', function ($scope, $filter){

  $scope.employees = [
    { id: 1, 'fname': 'Sravan', 'lname': 'Amishetti', 'age': 24},
    { id: 2, 'fname': 'Srinu', 'lname': 'Vuppala', 'age': 26},   
    { id: 3, 'fname': 'Manoj', 'lname': 'Kumar', 'age': 27}
  ];
  
  $scope.errorMessage = false;
  
  $scope.addRow = function () {
    var maxID = (Math.max.apply(null, $scope.employees.map(x => x.id)) || 0) + 1;
    
    if(!!$scope.employees.find(x => x.fname === $scope.selectedEmployee.fname && x.lname === $scope.selectedEmployee.lname)) {
      //alert('already eixsts');
      $scope.errorMessage = true;
      return;
    }
    $scope.employees.push({'fname': $scope.selectedEmployee.fname, 'lname': $scope.selectedEmployee.lname, 'age': $scope.selectedEmployee.age, id: maxID});
    $scope.selectedEmployee.fname = '';
    $scope.selectedEmployee.lname = '';
    $scope.selectedEmployee.age = '';
  }
  
  $scope.remove = function () {
    var newDataList = [];
    $scope.selectedAll = false;
    angular.forEach($scope.employees, function(selected) {
      if(!selected.selected) {
        newDataList.push(selected);
      }
      $scope.employees = newDataList;
      $scope.selectedEmployee.fname = '';
      $scope.selectedEmployee.lname = '';
      $scope.selectedEmployee.age = '';
    });
  }
  
  $scope.checkAll = function () {
    $scope.selectedAll = false;
    if(!$scope.selectedAll) { 
      $scope.selectedAll = true;
    } else { 
      $scope.selectedAll = false;
    }
    angular.forEach($scope.employees, function(employee){
      employee.selected = $scope.selectedAll;
    });
  }
  $scope.singleEmployeeSelected = false;
  
  $scope.setSelectedEmployee = function (employee){
    if($scope.employees.filter(x => x.selected).length > 1){
      $scope.selectedEmployee = null;
      $scope.singleEmployeeSelected = false;
    } else {
      $scope.selectedEmployee = angular.copy($scope.employees.find(x => x.selected));
      $scope.singleEmployeeSelected = !!$scope.selectedEmployee;
    }
  }
  
  $scope.edit = function() {
    if(!!$scope.employees.find(x => x.fname === $scope.selectedEmployee.fname && x.lname === $scope.selectedEmployee.lname)) {
      //alert('already eixsts');
      $scope.errorMessage = true;
      return;
    }
    var employeeToEdit = $scope.employees.find(x => x.id === $scope.selectedEmployee.id);
    employeeToEdit .fname = $scope.selectedEmployee.fname;
    employeeToEdit .lname = $scope.selectedEmployee.lname;
    employeeToEdit .age = $scope.selectedEmployee.age;
  }

}]);