
var Page = function () {
    
    function initBootstrapPicker() {
        $('.date-picker').datepicker({
            orientation: "left",
            weekStart: 1,
            autoclose: true
        });
    }

    return {
        init: function () {  
            initBootstrapPicker();
        }
    };

}();

jQuery(document).ready(function() {    
	Page.init(); 
});