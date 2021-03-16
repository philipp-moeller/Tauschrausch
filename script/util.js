
// open/close popup window
document.getElementById("popupButton").addEventListener("click", function(){
	// make popup window visible
	document.querySelector(".popup").style.display = "flex";
	console.log("pressed on popup-button");
});

document.querySelector(".close").addEventListener("click", function(){
	document.querySelector(".popup").style.display = "none";
});

// check if login-textfield is empty
function validateForm() {
	var x = document.forms["loginForm"]["username"].value;
	if (x == "") {
	  alert("Name must be filled out");
	  return false;
	}
}  