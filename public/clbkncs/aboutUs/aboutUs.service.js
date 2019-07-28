(function () {
    angular.module('CLBKNCS')
        .service('AboutUsService', AboutUsService);
    
    AboutUsService.$inject = ['HttpService'];

    function AboutUsService( HttpService) {
        this.listDepartment = (data) => {
            return HttpService.sendData('GET', '/about-us/list-departments', data, 'Lỗi xảy khi hiển thị danh sách ban ngành');
        };
    }
})();

