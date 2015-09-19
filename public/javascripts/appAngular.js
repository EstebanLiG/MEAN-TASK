angular.module('appTasks', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('new', {
        url: '/new',
        templateUrl: 'views/new.html',
        controller: 'ctrlNew'
      })
      .state('edit', {
        url: '/edit',
        templateUrl: 'views/edit.html',
        controller: 'ctrlEdit'
      });
      $urlRouterProvider.otherwise('new');
  })
  .factory('common', function($http){
    var common = {};
    common.tasks = [];
    common.task = {};

    //remote methods
    common.getAll = function(){
      return $http.get('/tasks')
      .success(function(data){
        angular.copy(data, common.tasks);//Deep-copy
        return common.tasks;
      });
    };

    common.add = function(task){
      return $http.post('/task', task)
      .success(function(task){
        common.tasks.push(task);
      });
    };

    common.update = function(task){
      return $http.put('/task/'+task._id, task)
      .success(function(data){
        var index = common.tasks.indexOf(task);
        common.tasks[index] = data;
      });
    };

    common.delete = function(task){
      return $http.delete('/task/' + task._id)
      .success(function(){
        var index = common.tasks.indexOf(task);
        common.tasks.splice(index, 1);
      });
    };

    return common;
  })
  .controller('ctrlNew', function($scope, $state, common){
    $scope.task = {};

    common.getAll();

    $scope.tasks = common.tasks;

    $scope.priorities = ['Low','Normal','High'];

    $scope.add = function(){
      common.add({
        name: $scope.task.name,
        priority: parseInt($scope.task.priority)
      });
      $scope.task.name = '';
      $scope.task.priority = '';
    };

    $scope.upPriority = function(task){
      task.priority +=1;
    };

    $scope.downPriority = function(task){
      task.priority -=1;
    };

    $scope.remove = function(task){
      common.delete(task);
    };

    $scope.processObject = function(task){
      common.task = task;
      $state.go('edit');
    };

  })
  .controller('ctrlEdit', function($scope, $state, common){
    $scope.task = common.task;

    $scope.update = function(){
      common.update($scope.task);
      $state.go('new');
    };

    $scope.remove = function(){
      common.delete($scope.task);
      $state.go('new');
    };
  });
