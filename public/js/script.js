//*********//
// GLOBALS //
//*********//
var input;
var $input;
var hasSlide = false;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var $saveButton;
var $errorBox;

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

      $errorBox = jQuery('.error-message');
      $saveButton = jQuery('.save-button');

      //listen for user input
      input = document.getElementById('input');
      $input = jQuery(input);
      input.addEventListener('keydown', function(e) {
        $errorBox.fadeOut('fast');
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
  else {
    $errorBox.fadeOut('fast');
    $saveButton.fadeOut('fast');
  }

  input.value = '';
  input.focus();
};

function drawSlide(text) {
  hasSlide = true;
  if (typeof text === 'undefined')
    text = input.value;
  if (isInputValid(text)) {    
    writeTextOnCanvas(text, 125);
    $saveButton.fadeIn('fast');
  }
}

function isInputValid(text) {
  if (text.length == 0) {
    displayError('empty');
    return false;
  }
  else if (text.length > 75) {
    displayError('long');
    return false;
  }
  else 
    return true;

}

function displayError(errorType) {
  var message;
  switch(errorType) {
    case 'long':
        message = 'וואו חפרתם, זה ארוך מידי...';
        break;
    case 'empty':
        message = 'לא בא לכם לכתוב משהו?';
        break;
    default:
        break;
    }

  $errorBox.html(message).fadeIn('fast');
  return false;
}

function writeTextOnCanvas(text, y) {
    context.fitTextOnCanvas(text, y, TEXT_MAX_WIDTH, (INITIAL_FONT_SIZE + 5));
};

function saveSlide() {
  jQuery('.loader').show();
  jQuery.post('create_slide', { image_data_uri: canvas.toDataURL('image/jpeg') })
  .done(function(response) {
    if (response.error != true && response.slideId)
      window.location.href = 'slide/'+ response.slideId;
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
