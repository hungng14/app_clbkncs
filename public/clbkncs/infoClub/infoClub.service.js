(function () {
    angular.module('CLBKNCS')
        .service('InfoClubService', InfoClubService);
    
    InfoClubService.$inject = ['HttpService'];

    function InfoClubService( HttpService) {
        this.infoClb = (data) => {
            return HttpService.sendData('GET', '/info-clb/info', data, 'Lỗi xảy khi hiển thị thông tin câu lạc bộ');
        };
    }
})();

