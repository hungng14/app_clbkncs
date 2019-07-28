(function() {
    angular
        .module('app.core')
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.useApplyAsync(true);
        }])
})();
