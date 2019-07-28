(function () {
    angular.module('CLBKNCS')
        .service('HomeService', HomeService);
    
    HomeService.$inject = ['HttpService'];

    function HomeService( HttpService) {
        this.infoClb = (data) => {
            return HttpService.sendData('GET', '/info-clb/info', data, 'Lỗi xảy khi hiển thị thông tin câu lạc bộ');
        };
    }
})();

