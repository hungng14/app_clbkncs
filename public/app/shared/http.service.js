(function () {
    angular.module('CLBKNCS')
        .service('HttpService', HttpService);

        HttpService.$inject = ['$http', 'exception'];

    function HttpService($http, exception) {
        this.sendData = function (method = '', url = '', data = {}, msgError = '') {
            return $http({
                    method,
                    url,
                    data,
                    params: data,
                })
                .then((response) => {
                    return response.data;
                }).catch((err) => {
                    return handlingError(msgError)
                })
        };

        function handlingError(msg, error) {
            return exception.catcher(msg)(error);
        }
    }
})();