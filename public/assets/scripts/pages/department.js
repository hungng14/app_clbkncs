
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
        CKEDITOR.replace('content_department', config);
    }

    return {
        init: function () {  
            initCKEDITOR();
        }
    };

}();

jQuery(document).ready(function() {    
	Page.init(); 
});