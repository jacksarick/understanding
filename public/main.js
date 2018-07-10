window.onload = function(){
	$('#date_input').get(0).valueAsDate = new Date();

	$('#file-upload').change(() => {
		var files = $('#file-upload').get(0).files;
		if(files.length > 0) {
			$('#file-label').text(files[0].name);
		}
	});
}

toggle_modal = function() {
	console.log("toggle")
	$('#creation-modal').toggleClass("is-active");
}

partial_submit = function() {
	$('#image-upload#data').submit(function(e){
		e.preventDefault();
		$.ajax({
			url: '/upload',
			type: 'post',
			data: new FormData(this),
			success: function(){
				alert("File (probably) uploaded");
			},
			error: function(xhr, textStatus, errorThrown){
				console.log(xhr.responseText);
			},
			cache: false,
        	contentType: false,
        	processData: false
		});
	});
}