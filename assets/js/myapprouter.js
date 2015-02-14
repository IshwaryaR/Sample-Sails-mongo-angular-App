myApp.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'templates/fruit-index.html',
            controller: 'fruithomeCtrl'
          }).
         when('/contact', {
            templateUrl: 'templates/fruit-contactus.html',
            controller: 'fruitcontactcontroller'
          }).
          when('/fruits', {
            templateUrl: 'templates/fruit-list.html',
            controller: 'fruitlistcontroller'
          }).
        
          otherwise({
            redirectTo: '/'
          });
      });