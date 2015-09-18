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
  .controller('ctrlNew', function($scope){
    $scope.task = {};
    $scope.tasks = [];

    $scope.priorities = ['Low','Normal', 'High'];

    $scope.add = function(){
      $scope.tasks.push({
        name: $scope.task.name,
        priority: parseInt($scope.task.priority)
      });

      $scope.task.name = '';
      $scope.task.priority = '';
    };
  });
