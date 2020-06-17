

const cursor = '<span class="prompt-cursor"></span>';
var prompt;

class GPrompt{
    constructor(text){
        this.title = text;
        document.querySelector('.title-prompt').innerHTML = text;

        var editor = document.querySelector('.editor-prompt');
        editor.innerHTML = editor.innerHTML + cursor;
        this.UpdateText(text+"$ ");

    }

    UpdateText(text){
      
        var textEditor = document.querySelector(".text-prompt");
        var newValue = textEditor.innerHTML + text;
        textEditor.innerHTML = newValue;
    }

    WriteText(text, delay){
        var index = 0, text_size = text.length;
        function loop(){
             var char = text[index];
             var textEditor = document.querySelector(".text-prompt");
             var newValue = textEditor.innerHTML + char;
             textEditor.innerHTML = newValue;
             index++;
             setTimeout(function(){
               if(index < text_size){
                  loop();
               }
            },delay);
        }
        loop();
       
    }
}


document.addEventListener('DOMContentLoaded', function (event) {
     prompt = new GPrompt('gabriel@matrix: ~');
     prompt.WriteText('Olá, eu sou um prompt :)',300);
});


