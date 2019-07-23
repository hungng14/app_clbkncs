(function () {
    angular.module('CLBKNCS')
        .service('InfoClubService', InfoClubService);
    
    InfoClubService.$inject = ['HttpService'];

    function InfoClubService( HttpService) {
        this.info = (data) => {
            return HttpService.sendData('GET', '/admin/info-clb/getInfo', data, 'Lỗi xảy khi hiển thị thông tin câu lạc bộ');
        };
    }
})();

