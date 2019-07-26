(function () {
    angular.module('CLBKNCS')
        .controller('EditDepartmentController', EditDepartmentController);
        EditDepartmentController.$inject = ['$scope', 'DepartmentService', 'logger', 'SharedService', 'ValidatorDepartment', '$timeout'];

    function EditDepartmentController($scope, DepartmentService, logger, SharedService, ValidatorDepartment, $timeout) {
        $scope.validator = ValidatorDepartment.validationOptions();
       
        $scope.infoDepartment = {}
       
        $scope.getInfo = async () => {
            $scope.infoDepartment = $scope.infoDepartment || {};
            $scope.formUpdate = SharedService.filterObject($scope.infoDepartment);
            const content = $scope.formUpdate.content || '';
            await setDataCKEDITOR(content);
        }

        async function setDataCKEDITOR(value) {
            await $timeout(() => {
                CKEDITOR.instances.content_department.setData(value);
            }, 500)
        }
        
        $scope.update = (form) => {
            const content = CKEDITOR.instances.content_department.getData();
            if (form.validate() && !isEmpty(content)) {
                $scope.formUpdate.content = content;
                DepartmentService.update($scope.formUpdate).then((response) => {
                    if (response.Success) {
                        logger.success('Cập nhật thành công');
                        changeCss();
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

        Promise.all([]).then(() => { });
    }
})();
