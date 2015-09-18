angular.module('appTasks', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('new', {
        url: '/new',
        templateUrl: 'new.html',
        controller: 'ctrlNew'
      })
      .state('edit', {
        url: '/edit/{id}',
        templateUrl: 'edit.html'
      });
      $urlRouterProvider.otherwise('new');
  })
  .factory('common', function(){
    var common = {};

    common.tasks = [{
      name: 'Programming JS',
      priority: 2
    },{
      name: 'Programming adroid app',
      priority: 1
    },{
      name: 'Study mongoDB',
      priority: 0
    }];

    common.remove = function(task){
      var index = common.tasks.indexOf(task);
      common.tasks.splice(index, 1);
    };

    return common;
  })
  .controller('ctrlNew', function($scope, common){
    $scope.task = {};
    $scope.tasks = common.tasks;

    $scope.priorities = ['Low','Normal','High'];

    $scope.add = function(){
      $scope.tasks.push({
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
      common.remove(task);
    };

  });
