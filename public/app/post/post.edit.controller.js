(function () {
    angular.module('CLBKNCS')
        .controller('EditPostController', EditPostController);
        EditPostController.$inject = ['$scope', 'PostService', 'logger', 'SharedService', 'ValidatorPost', '$timeout'];

    function EditPostController($scope, PostService, logger, SharedService, ValidatorPost, $timeout) {
        $scope.validator = ValidatorPost.validationOptions();
       
        $scope.infoPost = {}
        $scope.dat = (value) => {
            console.log(value);
        }
        $scope.getInfo = async () => {
            // console.log($scope.infoPost);
            // $scope.infoPost = JSON.parse($scope.infoPost || '{}');
            // $scope.formUpdatePost = SharedService.filterObject($scope.infoPost);
            // const content = $scope.formUpdatePost.content || '';
            // await setDataCKEDITOR(content)
        }

        async function setDataCKEDITOR(value) {
            await $timeout(() => {
                CKEDITOR.instances.content_post.setData(value);
            }, 500)
        }
        
        $scope.update = (form) => {
            const content = CKEDITOR.instances.content_post.getData();
            if (form.validate() && !isEmpty(content)) {
                $scope.formUpdatePost.content = content;
                PostService.update($scope.formUpdatePost).then((response) => {
                    if (response.Success) {
                        logger.success('Cập nhật thành công');
                        changeCss();
                        resetFormUpdatePost();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                angular.element('#cke_content_post').addClass('bd-error').removeClass('bd-success');
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        function resetFormUpdatePost() {
            $scope.formUpdatePost = {};
            CKEDITOR.instances.content_post.setData('');
        }

        function isEmpty(value) {
            return SharedService.isEmpty(value);
        }

        $scope.listCategoryPost = () => {
            PostService.listCategoryPost().then((response) => {
                console.log(response)
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
