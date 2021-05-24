// loader

window.addEventListener("DOMContentLoaded", function() {

  // get the form elements defined in your form HTML above
  
  var form = document.getElementById("my-form");
  //var button = document.getElementById("my-form-button");
  var status = document.getElementById("my-form-status");

  // Success and Error functions for after the form is submitted
  
  function success() {
    form.reset();
    status.innerHTML = "Thanks!";
  }

  function error() {
    status.innerHTML = "Oops! There was a problem.";
  }

  // handle the form submission event

  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    var data = new FormData(form);
    ajax(form.method, form.action, data, success, error);
  });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    if (xhr.status === 200) {
      success(xhr.response, xhr.responseType);
    } else {
      error(xhr.status, xhr.response, xhr.responseType);
    }
  };
  xhr.send(data);
}



var preloader = document.getElementById('loading');
function myFunction(){
  preloader.style.display = 'none';
}



// return to top

// ===== Scroll to Top ====
$(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
        $('#return-to-top').fadeIn(200);    // Fade in the arrow
    } else {
        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
    }
});
$('#return-to-top').click(function() {      // When arrow is clicked
    $('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
});


// return to top ends


// slide show animation
const slides = document.querySelectorAll('.slider-container .slide'); // get all the slides
const eraser = document.querySelector('.eraser'); // the eraser
const prev = document.getElementById('previous'); // previous button
const next = document.getElementById('next'); // next button
const intervalTime = 6000; // time until nextSlide triggers in miliseconds
const eraserActiveTime = 500; // time to wait until the .eraser goes all the way
let sliderInterval; // variable used to save the setInterval and clear it when needed


const nextSlide = () => {
  // Step 1. Add the .active class to the eraser - this will trigger the eraser to move to the left.
	eraser.classList.add('active');
   // Step 2. Set a timeout that will allow the eraser to move all the way to the left. This is where we'll use the eraserActiveTime - it has to be the same as the CSS value we mentioned above.
	setTimeout(() => {
    // Step 3. Get the active .slide and toggle the .active class on it (in this case, remove it).
		const active = document.querySelector('.slide.active');
		active.classList.toggle('active');
    // Step 4. Check to see if the .slide has a next element sibling available. If it has, add the .active class to it.
		if(active.nextElementSibling) {
			active.nextElementSibling.classList.toggle('active');
		} else {
      // Step 5. If it's the last element in the list, add the .active class to the first slide (the one with index 0).
			slides[0].classList.toggle('active');
		}
    // Step 6.Remove the .active class from the eraser - this will trigger the eraser to move back to the right. It also waits 200 ms before doing this (just to give enough time for the next .slide to move in place).
		setTimeout(() => {
			eraser.classList.remove('active');
		}, 180);
	}, eraserActiveTime);
}

//Button functionality
const prevSlide = () => {
	eraser.classList.add('active');
	setTimeout(() => {
		const active = document.querySelector('.slide.active');
		active.classList.toggle('active');
    // The *changed* part from the nextSlide code
		if(active.previousElementSibling) {
			active.previousElementSibling.classList.toggle('active');
		} else {
			slides[slides.length-1].classList.toggle('active');
		}
    // End of the changed part
		setTimeout(() => {
			eraser.classList.remove('active');
		}, 180);
	}, eraserActiveTime);
}

next.addEventListener('click', () => {
	nextSlide();
	clearInterval(sliderInterval);
	sliderInterval = setInterval(nextSlide, intervalTime);
});

prev.addEventListener('click', () => {
	prevSlide();
	clearInterval(sliderInterval);
	sliderInterval = setInterval(nextSlide, intervalTime);
});

sliderInterval = setInterval(nextSlide, intervalTime);

// Initial slide
setTimeout(nextSlide, 500);




// slideshow animation ends



// carousel
var counter = 0, // to keep track of current slide
    $items = $('.diy-slideshow figure'), // a collection of all of the slides, caching for performance
    numItems = $items.length; // total number of slides

// this function is what cycles the slides, showing the next or previous slide and hiding all the others
var showCurrent = function(){
    var itemToShow = Math.abs(counter%numItems);// uses remainder (aka modulo) operator to get the actual index of the element to show

  $items.removeClass('show'); // remove .show from whichever element currently has it
  $items.eq(itemToShow).addClass('show');
};

// add click events to prev & next buttons
$('.next').on('click', function(){
    counter++;
    showCurrent();
});
$('.prev').on('click', function(){
    counter--;
    showCurrent();
});

// if touch events are supported then add swipe interactions using TouchSwipe https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
if('ontouchstart' in window){
  $('.diy-slideshow').swipe({
    swipeLeft:function() {
      counter++;
      showCurrent();
    },
    swipeRight:function() {
      counter--;
      showCurrent();
    }
  });
}

// carousel ends
