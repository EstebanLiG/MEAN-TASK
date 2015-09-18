angular.module('appTasks', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('new', {
        url: '/new',
        templateUrl: 'new.html'
      })
      .state('edit', {
        url: '/edit/{id}',
        templateUrl: 'edit.html'
      });
      $urlRouterProvider.otherwise('new');
  });
