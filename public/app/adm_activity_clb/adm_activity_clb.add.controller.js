(function () {
    angular.module('CLBKNCS')
        .controller('AddActivityClbController', AddActivityClbController);
        AddActivityClbController.$inject = ['$scope', 'ActivityClbService', 'logger', 'SharedService', 'ValidatorActivityClb', 'UploadService'];

    function AddActivityClbController($scope, ActivityClbService, logger, SharedService, ValidatorActivityClb, UploadService) {
        $scope.validator = ValidatorActivityClb.validationOptions();
       
        $scope.formCreatePost = {};
        $scope.create = (form) => {
            const files = {};
            if (!isEmpty($scope.avatar)) {
                files.avatar = $scope.avatar;
            }
            const content = CKEDITOR.instances.content_post.getData();
            if (form.validate() && !isEmpty(content)) {
                $scope.formCreatePost.content = content;
                UploadService.uploadFiles(
                    'POST',
                    '/admin/activity-clb/create',
                    files,
                    $scope.formCreatePost,
                ).then((response) => {
                    if (response.Success) {
                        logger.success('Thêm thành công');
                        changeCss();
                        resetFormCreate();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                angular.element('#cke_content_post').addClass('bd-error').removeClass('bd-success');
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        function resetFormCreate() {
            $scope.formCreatePost = {};
            CKEDITOR.instances.content_post.setData('');
        }

        function isEmpty(value) {
            return SharedService.isEmpty(value);
        }

        $scope.formCreateCategory = {};
        $scope.createCategory = (form) => {
            if (form.validate()) {
                ActivityClbService.createCategory($scope.formCreateCategory).then((response) => {
                    if (response.Success) {
                        logger.success('Thêm thành công');
                        changeCss();
                        resetFormCreateCategory();
                        $scope.listCategoryPost();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        $scope.listCategoryPost = () => {
            ActivityClbService.listCategoryPost().then((response) => {
                if (response.Success) {
                    $scope.categoryPosts = response.Data || [];
                } else {
                    $scope.categoryPosts = [];
                }
            })
        }

        function resetFormCreateCategory() {
            $scope.formCreateCategory = {};
        }

        function changeCss() {
            SharedService.changeCss();
            angular.element('#cke_content_post').removeClass('bd-error').removeClass('bd-success');
        }

        function getResponseMsg(response = {}) {
            const msg = response.Message || 'Có lỗi xảy ra. Vui lòng kiểm tra lại!';
            return msg;
        };

        Promise.all([$scope.listCategoryPost()]).then(() => { });
    }
})();
