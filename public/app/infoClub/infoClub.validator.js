(function () {
    "use strict";
    $.validator.addMethod('isMobile', function (value) {
        if(!value) {  return true };
        if(value.toString().length < 10 || value.toString().length > 11) {return false};
        var fistNumber = value.substr(0, 2);
        var notMobile = /00|10|20|30|40|50|60|70|80|90/i;
        var checkTwoFirstNumber = !notMobile.test(fistNumber);
        var regex = /(01|02|03|04|05|06|07|08|09[0|1|2|3|4|5|6|7|8|9])+([0-9]{7,8})/;
        var checkMobile = regex.test(value);
        return checkTwoFirstNumber && checkMobile;
    });
    $.validator.addMethod('isEmail', function (value) {
        if(!value) { return true };
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return filter.test(value) ? true : false;
    });
    function removeClassByProp(prop, value){
        let element = $(`input[${prop}$="${value}"]`);
        if(element.val() != undefined && !element.val().length){
            element.closest('.form-group').removeClass('has-error').removeClass('has-success'); 
        }
    }
    angular.module('CLBKNCS')
        .factory('ValidatorInfoClub', function () {
            // factory returns an object
            let factoryObj = {};
            factoryObj.validationOptions = function () {
                return {
                    errorElement: 'span', //default input error message container
                    errorClass: 'error-block', // default input error message class
                    rules: {
                        member: {
                            required: true,
                        },
                        address: {
                            required: true,
                        },
                        phone: {
                            required: true,
                            isMobile: true
                        },
                        slogan: {
                            required: true,
                        },
                        email: {
                            required: true,
                            isEmail: true,
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
