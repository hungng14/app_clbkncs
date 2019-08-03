
var Page = function () {
    function initCKEDITOR() {
        const  config = {
            language: 'en',
            uiColor: '#9AB8F3',
            autoUpdateElement: true,
            height: 500,
            contentsCss: CKEDITOR.getUrl( '/assets/vendor/ckeditor/contents.css' ),
            extraPlugins: 'font,imagebrowser',
            imageBrowser_listUrl: '/admin/getFiles',
        }
        CKEDITOR.replace('content_post', config);
    }

    function initBootstrapDatePicker() {
        $('.date-picker').datepicker({
            orientation: "left",
            weekStart: 1,
            autoclose: true
        });
    }

    return {
        init: function () {  
            initCKEDITOR();
            // initBootstrapDatePicker();
        }
    };

}();

jQuery(document).ready(function() {    
	Page.init(); 
});