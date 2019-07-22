
(function () {
    angular.module('CLBKNCS')
        .controller('InfoClubController', InfoClubController);
        InfoClubController.$inject = ['$scope', 'InfoClubService', 'ValidatorInfoClub', 'PaginationFactory', 'logger', 'limitData', 'SharedService'];

    function InfoClubController($scope, InfoClubService, ValidatorInfoClub, PaginationFactory, logger, limitData, SharedService) {
        $scope.validator = ValidatorInfoClub.validationOptions();
        
        $scope.list = () => {
            InfoClubService.list().then((response) => {
                if (response.Success) {
                    $scope.users = response.Data || [];
                } else {
                    $scope.users = [];
                }
            })
        }

        $scope.formCreate = {};
        $scope.create = (form) => {
            if (form.validate()) {
                InfoClubService.create($scope.formCreate).then((response) => {
                    if (response.Success) {
                        logger.success('Thêm thành công');
                        $scope.list();
                        resetFormCreate();
                        changeCss();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        function resetFormCreate() {
            $scope.formCreate = {};
        }

        $scope.formUpdate = {};
        $scope.infoUser = (id) => {
            InfoClubService.getInfo({ id }).then((response) => {
                if (response.Success) {
                    const user = response.Data;
                    $scope.formUpdate = filterObject(user);
                    return;
                }
                $scope.formUpdate = {};
             });
        }

        $scope.update = (form) => {
            if (form.validate()) {
                InfoClubService.update($scope.formUpdate).then((response) => {
                    if (response.Success) {
                        logger.success('Cập nhật thành công');
                        $scope.list();
                        changeCss();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        $scope.deleteUser = (id, name) => {
            function deleteUser() {
                InfoClubService.deleteUser({
                    id,
                }).then((response) => {
                    if (response.Success) {
                        swal('Đã xóa!', 'success');
                        $scope.list();
                    } else {
                        swal('Có lỗi xảy ra', 'Vui lòng thử lại.', 'error');
                    }
                });
            }
            const msg = `Bạn có chắc chắn muốn xóa thành viên ${name || ''}?`;
            SharedService.show_swal(deleteUser, msg);
        };

        function changeCss() {
            SharedService.changeCss();
        }

        function getResponseMsg(response = {}) {
            const msg = response.Message || 'Có lỗi xảy ra. Vui lòng kiểm tra lại!';
            return msg;
        };

        Promise.all([$scope.list()]).then(() => { });
    }
})();
