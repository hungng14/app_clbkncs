(function () {
    angular.module('CLBKNCS')
        .service('DepartmentService', DepartmentService);
    
    DepartmentService.$inject = ['HttpService'];

    function DepartmentService( HttpService) {
        
        this.list = (data) => {
            return HttpService.sendData('GET', '/admin/department/list', data, 'Lỗi xảy khi hiển thị danh sách ban ngành');
        };

        this.create = (data) => {
            return HttpService.sendData('POST', '/admin/department/create', data, 'Lỗi xảy khi thêm mới ban ngành');
        };

        this.update = (data) => {
            return HttpService.sendData('POST', '/admin/department/update', data, 'Lỗi xảy khi cập nhật ban ngànht');
        };

        this.deleteDepartment = (data) => {
            return HttpService.sendData('POST', '/admin/department/delete', data, 'Lỗi xảy khi xóa ban ngành');
        };
    }
})();

