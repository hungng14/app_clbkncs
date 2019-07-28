(function () {
    angular
        .module('app.core')
        .directive('compilehtml', compilehtml)

    function compilehtml($compile) {
        return {
            restrict: 'EA',
            scope: {
                content: '=',
            },
            link: function ( scope, element) {
                const template = $compile(scope.content)(scope);
                element.html(template)
            },          
        };  
    }
})();