
  // variables
   const welcomeBtn = document.querySelector("button.btn");
   const welcomePage = document.querySelector("#welcome");
   const mainPage = document.querySelector("#mainPage");
   const stars = document.querySelector("#stars");
   const moon = document.querySelector("#moon");
   const wish = document.querySelector("#wish");


  // welcome page gone
   welcomeBtn.addEventListener('click', () =>{
    welcomePage.style.display = 'none';
    mainPage.style.display = 'inline';
   });

  // parallax
    window.addEventListener("scroll", function(){
       let value = window.scrollY;
       stars.style.left = value * 0.25 + 'px';
       moon.style.left = value * .4 + 'px';
       wish.style.marginRight = value * 4 +'px'
    });
  

  // scroll reveal

   const sr = ScrollReveal({
    origin:'top',
    distance:'30px',
    duration:2000,
    reset: true
   });

    sr.reveal(`#welcome`,{
        
    });

    var slideIndex = 1;
    showSlides(slideIndex);
    
    // Next/previous controls
    function plusSlides(n) {
      showSlides(slideIndex += n);
    }
    
    // Thumbnail image controls
    function currentSlide(n) {
      showSlides(slideIndex = n);
    }
    
    function showSlides(n) {
      var i;
      var slides = document.getElementsByClassName("mySlides");
      var dots = document.getElementsByClassName("dot");
      if (n > slides.length) {slideIndex = 1}
      if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex-1].style.display = "block";
      dots[slideIndex-1].className += " active";
    }

    $('input').on('change', function() {
      $('body').toggleClass('blue');
    });
    