
var Page = function () {
    
    function initBootstrapDatePicker() {
        $('.date-picker').datepicker({
            orientation: "left",
            weekStart: 1,
            autoclose: true
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