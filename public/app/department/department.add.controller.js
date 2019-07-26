(function () {
    angular.module('CLBKNCS')
        .controller('AddDepartmentController', AddDepartmentController);
        AddDepartmentController.$inject = ['$scope', 'DepartmentService', 'logger', 'SharedService', 'ValidatorDepartment'];

    function AddDepartmentController($scope, DepartmentService, logger, SharedService, ValidatorDepartment) {
        $scope.validator = ValidatorDepartment.validationOptions();
       
        $scope.formCreate = {};
        $scope.create = (form) => {
            const content = CKEDITOR.instances.content_department.getData();
            if (form.validate() && !isEmpty(content)) {
                $scope.formCreate.content = content;
                DepartmentService.create($scope.formCreate).then((response) => {
                    if (response.Success) {
                        logger.success('Thêm thành công');
                        changeCss();
                        resetFormCreate();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                if (isEmpty(content)) {
                    angular.element('#cke_content_department').addClass('bd-error').removeClass('bd-success');
                }
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        function resetFormCreate() {
            $scope.formCreate = {};
            CKEDITOR.instances.content_department.setData('');
        }

        function isEmpty(value) {
            return SharedService.isEmpty(value);
        }

        function changeCss() {
            SharedService.changeCss();
            angular.element('#cke_content_department').removeClass('bd-error').removeClass('bd-success');
        }

        function getResponseMsg(response = {}) {
            const msg = response.Message || 'Có lỗi xảy ra. Vui lòng kiểm tra lại!';
            return msg;
        };
    }
})();
