/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar_nav").style.top = "0";
  } else {
    document.getElementById("navbar_nav").style.top = "-80px";
  }
  prevScrollpos = currentScrollPos;
}


const imgContent = document.querySelectorAll('.img-content-hover');

function showImgContent(e) {
  for(var i = 0; i < imgContent.length; i++) {
    imgContent[i].style.left = e.pageX + 'px';
    imgContent[i].style.top = e.pageY + 'px';
  }
};

document.addEventListener('mousemove', showImgContent);
