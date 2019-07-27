(function () {
    angular.module('CLBKNCS')
        .controller('EditPostController', EditPostController);
        EditPostController.$inject = ['$scope', 'PostService', 'logger', 'SharedService', 'ValidatorPost', '$timeout', 'UploadService'];

    function EditPostController($scope, PostService, logger, SharedService, ValidatorPost, $timeout, UploadService) {
        $scope.validator = ValidatorPost.validationOptions();
       
        $scope.infoPost = {}
       
        $scope.getInfo = async () => {
            $scope.infoPost = $scope.infoPost || {};
            $scope.formUpdatePost = SharedService.filterObject($scope.infoPost);
            if (!isEmpty($scope.formUpdatePost.avatar)) {
                $scope.formUpdatePost.avatarOld = $scope.formUpdatePost.avatar;
                let urlAvatar = $scope.formUpdatePost.avatar;
                delete $scope.formUpdatePost.avatar;
                angular.element('.avatar-profile').find('img').attr('src', (urlAvatar || '/images/avatar.jpg'))
            }
            const content = $scope.formUpdatePost.content || '';
            await setDataCKEDITOR(content);
        }

        async function setDataCKEDITOR(value) {
            await $timeout(() => {
                CKEDITOR.instances.content_post.setData(value);
                loadPageContent();
            }, 500)
        }
        
        function loadPageContent() {
            angular.element('.page-content').css('display', 'block');
        }

        $scope.update = (form) => {
            const files = {};
            if (!isEmpty($scope.avatar)) {
                files.avatar = $scope.avatar;
            }
            const content = CKEDITOR.instances.content_post.getData();
            if (form.validate() && !isEmpty(content)) {
                $scope.formUpdatePost.content = content;
                UploadService.uploadFiles(
                    'POST',
                    '/admin/post/update',
                    files,
                    $scope.formUpdatePost,
                ).then((response) => {
                    if (response.Success) {
                        logger.success('Cập nhật thành công');
                        changeCss();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                angular.element('#cke_content_post').addClass('bd-error').removeClass('bd-success');
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        function isEmpty(value) {
            return SharedService.isEmpty(value);
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
