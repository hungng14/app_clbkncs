(function () {
    angular.module('CLBKNCS')
        .service('InfoClubService', InfoClubService);
    
    InfoClubService.$inject = ['HttpService'];

    function InfoClubService( HttpService) {
        this.list = (data) => {
            return HttpService.sendData('GET', '/admin/infoClub/list', data, 'Lỗi xảy khi hiển thị danh sách thành viên');
        };
    }
})();

