// function animate(options) {

// 	var start = performance.now();
  
// 	requestAnimationFrame(function animate(time) {
// 	  // timeFraction
// 	  var timeFraction = (time - start) / options.duration;
// 	  if (timeFraction > 1) timeFraction = 1;
  
// 	  var progress = options.timing(timeFraction)
	  
// 	  options.draw(progress);
  
// 	  if (timeFraction < 1) {
// 		requestAnimationFrame(animate);
// 	  }
  
// 	});
//   }

// function makeEaseOut(timing) {
// 	return function(timeFraction) {
// 	  return 1 - timing(1 - timeFraction);
// 	}
//   }

//   function bounce(timeFraction) {
// 	for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
// 	  if (timeFraction >= (7 - 4 * a) / 11) {
// 		return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
// 	  }
// 	}
//   }

//   function quad(timeFraction) {
// 	return Math.pow(timeFraction, 2);
//   }

//   egg.onclick = function() {

// 	let height = field.clientHeight - egg.clientHeight + 540;
// 	let width = 400;

// 	animate({
// 	  duration: 2000,
// 	  timing: makeEaseOut(bounce),
// 	  draw: function(progress) {
// 		egg.style.top = height * progress + 'px' 
// 	  }
// 	});

// 	animate({
// 	  duration: 2000,
// 	  timing: makeEaseOut(quad),
// 	  draw: function(progress) {
// 		egg.style.left = width * progress + "px"
// 	  }
// 	});
//   }


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