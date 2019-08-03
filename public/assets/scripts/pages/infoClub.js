
var Page = function () {
    
    function initBootstrapDatePicker() {
        // $('.timepicker-24').timepicker({
		// 	autoclose: true,
		// 	minuteStep: 1,
		// 	showSeconds: false,
		// 	showMeridian: false
        // });
        
        $('.datetime-piclker').datetimepicker({
            format: 'HH:mm',
        });
    }

    return {
        init: function () {  
            initBootstrapDatePicker();
        }
    };

}();

jQuery(document).ready(function() {    
	Page.init(); 
});