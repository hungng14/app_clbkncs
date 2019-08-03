(function () {
    'use strict';
    angular
        .module('app.core')
        .directive('fileUploadModel', fileUploadModel)

    fileUploadModel.$inject = ['$parse'];

    function fileUploadModel($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileUploadModel);
                var modelSetter = model.assign;
                
                element.bind('change', function (e) {
                    const wrapperImage = element.closest('.wrapper-file-input')
                    scope.$apply(function () {
                        if (element[0].files && element[0].files.length) {
                            var url = URL.createObjectURL(element[0].files[0]);
                            wrapperImage.find('img').attr('src', url);
                            modelSetter(scope, element[0].files[0]);
                        }
                    });
                });
            }
        };
    }
})();