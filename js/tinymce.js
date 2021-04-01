$(document).ready(function(){
	
	localStorage['textEdited'] = false;
	localStorage['undoUnable'] = false;
    localStorage['fullscreenVal'] = false;

   	tinymce.init({
       selector: '#customContent',
       height: $(window).height(),
       menubar: false,
       plugins: [
           'advlist autolink lists link image charmap print preview anchor textcolor ',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code  wordcount', 'fullscreen', 'preview'
       ],
       toolbar: 'undo redo | table | fontsizeselect fontselect | underline bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | fullscreen | preview',
       font_formats: 'Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Calibri ;Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
       content_css: [
           '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
           '//www.tiny.cloud/css/codepen.min.css'
       ],
     
       init_instance_callback: function (editor) {
    	    editor.on('change', function (e) {
    	    	localStorage['textEdited'] = true;
    	    	 editor.on('BeforeAddUndo', function(e) {
    	    		 localStorage['undoUnable'] = true;
      	    	 });
    	    	
	    	 });
    	    editor.on('KeyUp', function (e) {
    	    	localStorage['textEdited'] = true;
    	    	 editor.on('BeforeAddUndo', function(e) {
    	    		 localStorage['undoUnable'] = true;
  	    	 });
    	    	 
    	    	 
    	    });
    	    editor.on('FullscreenStateChanged', function () {
    	        $('.floatingOptionBox').css('opacity','0.5');
    	    });
    	   
  	  }
   });	
       	
});
