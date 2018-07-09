window.onload = function(){
	document.getElementById('date_input').valueAsDate = new Date();
}

toggle_modal = function() {
	console.log("toggle")
	$('#creation-modal').toggleClass("is-active");
}

partial_submit = function() {
	$('#image-upload').submit(function(e){
		e.preventDefault();
		$.ajax({
			url: '/upload',
			type: 'post',
			data: $('#image-upload').serialize(),
			success: function(){
				alert("File (probably) uploaded");
			}
		});
	});
}