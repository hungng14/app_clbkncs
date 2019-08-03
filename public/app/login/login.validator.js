(function () {
    "use strict";
    angular.module('CLBKNCS')
        .factory('ValidatorLogin', function () {
            // factory returns an object
            let factoryObj = {};
            factoryObj.validationOptions = function () {
                return {
                    errorElement: 'span', //default input error message container
                    errorClass: 'error-block', // default input error message class
                    rules: {
                        username: {
                            required: true,
                        },
                        password: {
                            required: true,
                        },
                    },
                    errorPlacement: function (error, element) { // render error placement for each input type
                        return false;
                    },
                    highlight: function (element) { // hightlight error inputs
                        $(element).closest('.form-group').removeClass("has-success").addClass('has-error'); // set error class to the control group
                    },
                    unhighlight: function (element) { // revert the change done by hightlight
                        $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
                    },
                    success: function (label, element) {
                        $(element).closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                    },
                    submitHandler: function (form) {
                        error.hide();
                        return false;
                    }
                }
            };
            return factoryObj;
        });
})();
