

const cursor = '<span class="prompt-cursor"></span>';
const line = '<div class="line-prompt"><span class="command-prompt"></span></div>';
var prompt;

function  UpdateText(text){
    var node_command = document.querySelectorAll(".command-prompt");
    var last_node = node_command[node_command.length- 1];
    var textEditor = last_node;
    var newValue = textEditor.innerHTML + text;
    textEditor.innerHTML = newValue;
}

function setNewLine(title){
    //removendo cursor
    var c = document.querySelector('.prompt-cursor');
    if(c != null)
        c.parentNode.removeChild(c);

    //criando nova linha;
    var ul = document.querySelector('.command-list-prompt');
    var li = document.createElement('li'); 
    li.innerHTML = line;
    ul.appendChild(li);

    var node_lines = document.querySelectorAll('.line-prompt');
    var last_node = node_lines[node_lines.length- 1];
    var editor = last_node;
    editor.innerHTML = editor.innerHTML + cursor;
    UpdateText(title);
}


class GPrompt{
    constructor(text){
        this.title = text;
        this.title_line = text+'$ ';
        document.querySelector('.title-prompt').innerHTML = text;
        setNewLine(this.title_line);

    }
    WriteText(text, delay, enter){
        return new Promise(resolve => {
        var index = 0, text_size = text.length, title = this.title_line;

        function loop(){
             var char = text[index];
             UpdateText(char);
             index++;
             setTimeout(function(){
               if(index < text_size){
                  loop();
               }
               else if(enter){
                setNewLine(title);
               }
            },delay);
        }
        loop();
    });
        
       
    }
}