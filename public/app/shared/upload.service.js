(function () {
    angular.module('app.core')
        .service('UploadService', UploadService);

    UploadService.$inject = ['$http', 'exception'];


    function UploadService($http, exception) {

        function hasObject(obj) {
            if (obj && obj !== null &&  obj !== undefined) {
                return true;
            } else {
                return false;
            }
        }
        this.uploadFiles = (method, url, files={}, obj={}) => {
            try {
                let fd = new FormData();
                for(const prop in obj){
                    fd.append(prop, obj[prop]);
                }
                for(const prop in files){
                    fd.append(prop, files[prop]);
                }
                
                return $http({
                        method: method,
                        url: url,
                        data: fd,
                        withCredentials: true,
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined,
                        }
                    })
                    .then((response) => {
                        return response.data;
                    })
                    .catch(err => {
                        handlingError('Error occurred when upload file', err)
                    });
            } catch (err) {
                handlingError('Error occurred when upload file', err);
            }
        };

        function handlingError(msg, err) {
            return exception.catcher(msg)(err);
        }
    }
})();