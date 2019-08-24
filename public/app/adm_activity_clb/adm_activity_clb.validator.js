(function () {
    "use strict";
   
    function removeClassByProp(prop, value){
        let element = $(`input[${prop}$="${value}"]`);
        if(element.val() != undefined && !element.val().length){
            element.closest('.form-group').removeClass('has-error').removeClass('has-success'); 
        }
    }
    angular.module('CLBKNCS')
        .factory('ValidatorActivityClb', function () {
            // factory returns an object
            let factoryObj = {};
            factoryObj.validationOptions = function () {
                return {
                    errorElement: 'span', //default input error message container
                    errorClass: 'error-block', // default input error message class
                    rules: {
                        category_name: {
                            required: true,
                        },
                        category_post: {
                            required: true,
                        },
                        title: {
                            required: true,
                        }
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
                        removeClassByProp('name', 'phone');
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
