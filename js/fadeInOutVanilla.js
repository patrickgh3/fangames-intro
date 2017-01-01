// Adapted from
// http://stackoverflow.com/questions/13733912/javascript-fade-in-fade-out-without-jquery-and-css3#20533102
// Added callback, delta time variable, easing function

var fadeDeltaTime = 30;
function easingFunc(x) {
    return -(Math.cos(x*Math.PI)-1)/2;
}

// Start a fade in of an element over a given duration, with callback
function fadeIn( elem, ms, callback )
{
  if( ! elem )
    return;

  elem.style.opacity = 0;
  elem.style.filter = "alpha(opacity=0)";
  elem.style.display = "inline-block";
  elem.style.visibility = "visible";

  if( ms )
  {
    var t = 0;
    var opacity = 0;
    var timer = setInterval( function() {
      t += fadeDeltaTime / ms;
      opacity = easingFunc(t);
      if( t >= 1 )
      {
        clearInterval(timer);
        opacity = 1;
        callback();
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, fadeDeltaTime );
  }
  else
  {
    elem.style.opacity = 1;
    elem.style.filter = "alpha(opacity=1)";
    callback();
  }
}

// Start a fade out of an element over a given duration, with callback
function fadeOut( elem, ms, callback )
{
  if( ! elem )
    return;

  if( ms )
  {
    var opacity = 1;
    var timer = setInterval( function() {
      opacity -= fadeDeltaTime / ms;
      if( opacity <= 0 )
      {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = "none";
        elem.style.visibility = "hidden";
        callback();
      }
      elem.style.opacity = opacity;
      elem.style.filter = "alpha(opacity=" + opacity * 100 + ")";
    }, fadeDeltaTime );
  }
  else
  {
    elem.style.opacity = 0;
    elem.style.filter = "alpha(opacity=0)";
    elem.style.display = "none";
    elem.style.visibility = "hidden";
    callback();
  }
}

