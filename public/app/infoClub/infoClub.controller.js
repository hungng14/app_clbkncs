
(function () {
    angular.module('CLBKNCS')
        .controller('InfoClubController', InfoClubController);
        InfoClubController.$inject = ['$scope', 'InfoClubService', 'ValidatorInfoClub', 'PaginationFactory', 'logger', 'limitData', 'SharedService'];

    function InfoClubController($scope, InfoClubService, ValidatorInfoClub, PaginationFactory, logger, limitData, SharedService) {
        $scope.validator = ValidatorInfoClub.validationOptions();
        
        $scope.info = () => {
            InfoClubService.info().then((response) => {
                $scope.formInfoClub = response.Success ? (response.Data || {}) : {};
            })
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

        function changeCss() {
            SharedService.changeCss();
        }

        function getResponseMsg(response = {}) {
            const msg = response.Message || 'Có lỗi xảy ra. Vui lòng kiểm tra lại!';
            return msg;
        };

        Promise.all([$scope.info()]).then(() => { });
    }
})();
