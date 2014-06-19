//*********//
// GLOBALS //
//*********//
var input;
var hasSlide = false;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//********//
// CONSTS //
//********//
var FONT_FACE = 'Arial';
var INITIAL_FONT_SIZE = 50;
var TEXT_MAX_WIDTH = 545;

jQuery(document).ready(function(){
  showPopup();
});
function init(isReset) {
  var img = new Image();
  img.onload = function() {
    context.drawImage(img,0,0);
  };
  img.src='../images/slide.jpg';
  if (!isReset) {
      //setup canvas context
      context.shadowColor = "black";
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 2;
      context.shadowBlur = 3;
      context.font = 'bold ' + INITIAL_FONT_SIZE +'px ' + FONT_FACE;
      context.fillStyle = 'white';
      context.textAlign = 'center';

      //listen for user input
      input = document.getElementById('input');
      input.addEventListener('keydown', function(e) {
        if (e.keyCode == 13) {
          if (hasSlide) {
              var inputVal = input.value;
              clearSlide();
              drawSlide(inputVal);

          }
          else
            drawSlide();
        }
      });
  }

  input.value = '';
  input.focus();
};

function drawSlide(text) {
  hasSlide = true;
  jQuery('.error-message').fadeOut('fast');
  if (jQuery('#input').val().length > 75) {
    addError('long');
    return false;
  }
    
  if (typeof text === 'undefined')
    text = input.value;
  writeTextOnCanvas(text, 125);
}

function addError(errorType) {
  switch(errorType) {
    case 'long':
        jQuery('.error-message').fadeIn('fast');
        return false;
        break;
    default:
        return;
}
}

function writeTextOnCanvas(text, y) {
    context.fitTextOnCanvas(text, y, TEXT_MAX_WIDTH, (INITIAL_FONT_SIZE + 5));
};

function saveSlide() {
  jQuery('.loader').show();
  $.post('save_image', { image_data_uri: canvas.toDataURL('image/jpeg') })
  .done(function(response) {
    if (response.error != true && response.image_url)
      window.location = response.image_url;
  });
}

function clearSlide() {
  context.clearRect(0,0,canvas.width,canvas.height);
  hasSlide = false;
  init(true);
}

init(false);

//**************************//
// CANVAS PROTOTYPE METHODS //
//**************************//
CanvasRenderingContext2D.prototype.fitTextOnCanvas = function (text,y, maxWidth, lineHeight) {
    var self = this;
    var x = canvas.width / 2;
    var str, wordWidth, currentLine = 0;
    function printNextLine(line_text) {
      self.fillText(str, x, y + (lineHeight * currentLine));
      currentLine++;
      wordWidth = self.measureText(str).width;
      if (wordWidth > maxWidth)
          maxWidth = wordWidth;
    }

    var words = text.split(' ');
    var word_index = 1;
    while (words.length > 0 && word_index <= words.length) {
        str = words.slice(0, word_index).join(' ');
        wordWidth = this.measureText(str).width;
        if (wordWidth > maxWidth) {
            if (word_index === 1) {
                str = words.slice(0, 1).join(' ');
                words = words.splice(1);
            } else {
                str = words.slice(0, word_index - 1).join(' ');
                words = words.splice(word_index - 1);
            }
            printNextLine(str);
            word_index = 1;
        } else {
            word_index++;
        }
    }

    // The left over words on the last line
    if (word_index > 0)
        printNextLine(words.join(' '));
}

function showPopup () {
  /*if (localStorage) {
    if (localStorage.popup) {
      return;
    }
  }
  localStorage.setItem('popup',true)*/
  $('.popup').bPopup({
            closeClass:'close1',
            speed: 450,
            transition: 'slideDown'
        });
}

