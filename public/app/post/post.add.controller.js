(function () {
    angular.module('CLBKNCS')
        .controller('AddPostController', AddPostController);
        AddPostController.$inject = ['$scope', 'PostService', 'logger', 'SharedService', 'ValidatorPost', 'UploadService'];

    function AddPostController($scope, PostService, logger, SharedService, ValidatorPost, UploadService) {
        $scope.validator = ValidatorPost.validationOptions();
       
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
                    '/admin/post/create',
                    files,
                    $scope.formCreatePost,
                ).then((response) => {
                    if (response.Success) {
                        logger.success('Thêm thành công');
                        changeCss();
                        resetFormCreatePost();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                angular.element('#cke_content_post').addClass('bd-error').removeClass('bd-success');
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        function resetFormCreatePost() {
            $scope.formCreatePost = {};
            CKEDITOR.instances.content_post.setData('');
        }

        function isEmpty(value) {
            return SharedService.isEmpty(value);
        }

        $scope.formCreateCategory = {};
        $scope.createCategory = (form) => {
            if (form.validate()) {
                PostService.createCategory($scope.formCreateCategory).then((response) => {
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
            PostService.listCategoryPost().then((response) => {
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
