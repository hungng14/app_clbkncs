(function () {
    angular.module('CLBKNCS')
        .controller('UserController', UserController);
        UserController.$inject = ['$scope', 'UserService', 'ValidatorUser', 'PaginationFactory', 'logger', 'limitData', 'SharedService', 'UploadService'];

    function UserController($scope, UserService, ValidatorUser, PaginationFactory, logger, limitData, SharedService, UploadService) {
        $scope.validator = ValidatorUser.validationOptions();
        $scope.listRole = () => {
            UserService.listRole().then((response) => {
                if (response.Success) {
                    $scope.roles = response.Data || [];
                } else {
                    $scope.roles = [];
                }
            })
        }

        $scope.list = () => {
            UserService.list().then((response) => {
                if (response.Success) {
                    $scope.users = response.Data || [];
                } else {
                    $scope.users = [];
                }
            })
        }

        $scope.formCreate = {};
        $scope.create = (form) => {
            const files = {};
            if (!SharedService.isEmpty($scope.avatar)) {
                files.avatar = $scope.avatar;
            }
            if (form.validate()) {
                UploadService.uploadFiles(
                    'POST',
                    '/admin/user/create',
                    files,
                    $scope.formCreate,
                ).then((response) => {
                    if (response.Success) {
                        logger.success('Thêm thành công');
                        resetFormCreate();
                        changeCss();
                        $scope.list();
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
            angular.element('#formCreateUser .avatar-profile').find('img').attr('src', ('/images/profile.png'))
        }

        function filterObject(obj = {}) {
            const newObj = {};
            for (const prop in obj) {
                if (obj[prop] !== 'NULL') {
                    newObj[prop] = obj[prop];
                }
            }
            return newObj;
        };

        $scope.formUpdate = {};
        $scope.infoUser = (id) => {
            UserService.getInfo({ id }).then((response) => {
                if (response.Success) {
                    const user = response.Data;
                    $scope.formUpdate = filterObject(user);
                    if (!SharedService.isEmpty($scope.formUpdate.avatar)) {
                        $scope.formUpdate.avatarOld = $scope.formUpdate.avatar;
                        let urlAvatar = $scope.formUpdate.avatarOld;
                        delete $scope.formUpdate.avatar;
                        angular.element('#formUpdatUser .avatar-profile').find('img').attr('src', (urlAvatar || '/images/profile.jpg'))
                    }
                    return;
                }
                $scope.formUpdate = {};
             });
        }

        $scope.update = (form) => {
            const files = {};
            if (!SharedService.isEmpty($scope.avatarUpdate)) {
                files.avatar = $scope.avatarUpdate;
            }
            if (form.validate()) {
                UploadService.uploadFiles(
                    'POST',
                    '/admin/user/update',
                    files,
                    $scope.formUpdate,
                ).then((response) => {
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
                UserService.deleteUser({
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

        $scope.formCreateAccount = {};
        $scope.createAccount = (form) => {
            if (form.validate()) {
                UserService.createAccount($scope.formCreateAccount).then((response) => {
                    if (response.Success) {
                        logger.success('Thêm thành công');
                        $scope.listAccount();
                        resetFormCreateAccount();
                        changeCss();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        $scope.listAccount = () => {
            UserService.listAccount().then((response) => {
                if (response.Success) {
                    $scope.accounts = response.Data || [];
                } else {
                    $scope.accounts = [];
                }
            })
        }

        $scope.formUpdateAccount = {};
        $scope.getInfoAccount = (id) => {
            UserService.getInfoAccount({ id }).then((response) => {
                if (response.Success) {
                    const user = response.Data;
                    $scope.formUpdateAccount = filterObject(user);
                    return;
                }
                $scope.formUpdateAccount = {};
             });
        }

        $scope.updateAccount = (form) => {
            if (form.validate()) {
                UserService.updateAccount($scope.formUpdateAccount).then((response) => {
                    if (response.Success) {
                        logger.success('Cập nhật thành công');
                        $scope.listAccount();
                        changeCss();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        $scope.deleteAccount = (account_id, name) => {
            function deleteAccount() {
                UserService.deleteAccount({
                    account_id,
                }).then((response) => {
                    if (response.Success) {
                        swal('Đã xóa!', 'success');
                        $scope.listAccount();
                    } else {
                        swal('Có lỗi xảy ra', 'Vui lòng thử lại.', 'error');
                    }
                });
            }
            const msg = `Bạn có chắc chắn muốn xóa tài khoản ${name || ''}?`;
            SharedService.show_swal(deleteAccount, msg);
        };

        function resetFormCreateAccount() {
            $scope.formCreateAccount = {};
        }

        function changeCss() {
            SharedService.changeCss();
        }

        function getResponseMsg(response = {}) {
            const msg = response.Message || 'Có lỗi xảy ra. Vui lòng kiểm tra lại!';
            return msg;
        };

        Promise.all([$scope.list(), $scope.listRole(), $scope.listAccount()]).then(() => { });
    }
})();
