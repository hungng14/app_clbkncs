(function () {
    angular.module('CLBKNCS')
        .service('MembersService', MembersService);
    
    MembersService.$inject = ['HttpService'];

    function MembersService( HttpService) {
        this.listMembers = (data) => {
            return HttpService.sendData('GET', '/members/list', data, 'Lỗi xảy khi hiển thị danh sách thành viên');
        };
    }
})();

