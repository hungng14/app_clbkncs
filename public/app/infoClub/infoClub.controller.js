
(function () {
    angular.module('CLBKNCS')
        .controller('InfoClubController', InfoClubController);
        InfoClubController.$inject = ['$scope', 'InfoClubService', 'ValidatorInfoClub', 'PaginationFactory', 'logger', 'limitData', 'SharedService', 'UploadService'];

    function InfoClubController($scope, InfoClubService, ValidatorInfoClub, PaginationFactory, logger, limitData, SharedService, UploadService) {
        $scope.validator = ValidatorInfoClub.validationOptions();
        
        const { isEmpty, filterObject, changeCss } = SharedService;
        $scope.info = () => {
            InfoClubService.info().then((response) => {
                $scope.formInfoClub = response.Success ? (response.Data || {}) : {};
                $scope.formInfoClub = filterObject($scope.formInfoClub);
                if (!isEmpty($scope.formInfoClub.logo)) {
                    $scope.formInfoClub.logoOld = $scope.formInfoClub.logo;
                    let urlLogo = $scope.formInfoClub.logo;
                    delete $scope.formInfoClub.logo;
                    angular.element('.logo-profile').find('img').attr('src', (urlLogo || '/images/logo.jpg'))
                }
                if (!isEmpty($scope.formInfoClub.avatar)) {
                    $scope.formInfoClub.avatarOld = $scope.formInfoClub.avatar;
                    let urlAvatar = $scope.formInfoClub.avatarOld;
                    delete $scope.formInfoClub.avatar;
                    angular.element('.avatar-profile').find('img').attr('src', (urlAvatar || '/images/avatar.jpg'))
                }
                if (!isEmpty($scope.formInfoClub.founder_profile)) {
                    $scope.formInfoClub.founderProfileOld = $scope.formInfoClub.founder_profile;
                    let urlFounderProfile = $scope.formInfoClub.founderProfileOld;
                    delete $scope.formInfoClub.avatar;
                    angular.element('.founder-profile').find('img').attr('src', (urlFounderProfile || '/images/profile.png'))
                }
            })
        }

        $scope.listMemberActive = () => {
            InfoClubService.listMemberActive().then((response) => {
                $scope.members = response.Success ? (response.Data || []) : [];
            })
        }

        $scope.update = (form) => {
            const files = {};
            if (!isEmpty($scope.avatar)) {
                files.avatar = $scope.avatar;
            }
            if (!isEmpty($scope.logo)) {
                files.logo = $scope.logo;
            }
            if (!isEmpty($scope.founder_profile)) {
                files.founder_profile = $scope.founder_profile;
            }
            const work_start_time = $("#start_time").find('input').val();
            const work_end_time = $("#end_time").find('input').val();
            $scope.formInfoClub.work_start_time = work_start_time;
            $scope.formInfoClub.work_end_time = work_end_time;
            if (form.validate()) {
                UploadService.uploadFiles(
                    'POST',
                    '/admin/info-clb/update',
                    files,
                    $scope.formInfoClub,
                ).then((response) => {
                    if (response.Success) {
                        logger.success('Cập nhật thành công');
                        changeCss();
                    } else {
                        logger.error(getResponseMsg(response));
                    }
                })
            } else {
                logger.error('Hãy điền đẩy đủ thông tin');
            }
        }

        function getResponseMsg(response = {}) {
            const msg = response.Message || 'Có lỗi xảy ra. Vui lòng kiểm tra lại!';
            return msg;
        };

        Promise.all([$scope.info(), $scope.listMemberActive()]).then(() => { });
    }
})();
