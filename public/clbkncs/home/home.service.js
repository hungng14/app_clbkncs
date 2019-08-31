(function () {
    angular.module('CLBKNCS')
        .service('HomeService', HomeService);
    
    HomeService.$inject = ['HttpService'];

    function HomeService( HttpService) {
        this.listMembers = (data) => {
            return HttpService.sendData('GET', '/members/list', data, 'Lỗi xảy khi hiển thị danh sách thành viên');
        };
        this.listActivityClb= (data) => {
            return HttpService.sendData('GET', '/activity-clb/listTitleViewHome', data, 'Lỗi xảy khi hiển thị danh sách hoạt động câu lạc bộ');
        };
    }
})();

