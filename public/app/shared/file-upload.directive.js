(function () {
    'use strict';
    angular
        .module('app.core')
        .directive('fileUpload', fileUpload)

    fileUpload.$inject = ['$parse'];

    function fileUpload($parse) {
        const directive = {
            restrict: 'AE',
            link: linkFc
        };

        return directive;

        function linkFc(scope, element, attrs) {
            let model = $parse(attrs.fileUpload);
            let modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });

            /* sau khi import thanh cong, reload gia tri cho element */
            scope.$on('reloadImport', () =>{
                element[0].value = '';
            })
        }
    }
})();