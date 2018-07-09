window.onload = function(){
	document.getElementById('date_input').valueAsDate = new Date();
}

toggle_modal = function() {
	console.log("toggle")
	document.getElementById('creation-modal').classList.toggle("is-active");
}