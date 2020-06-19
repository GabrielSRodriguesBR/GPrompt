



function GPrompt(text){
    this.title = text;
    this.title_line = text+'$ ';
    this.home_title_line = text+'$ ';
    const cursor = '<span class="prompt-cursor"></span>';
    const line = '<div class="line-prompt"><span class="command-prompt"></span></div>';
    document.querySelector('.title-prompt').innerHTML = text;
    setNewLine(this.title_line);

    this.WriteText = async function(text, delay, enter){

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
                    resolve(true);
                }
                else{
                    resolve(true);
                }
                },delay);
            }
            loop();
        });
    }

    function removeCursor(){
        var c = document.querySelector('.prompt-cursor');
        if(c != null)
            c.parentNode.removeChild(c);
    }
    function  UpdateText(text){
        var node_command = document.querySelectorAll(".command-prompt");
        var last_node = node_command[node_command.length- 1];
        var textEditor = last_node;
        var newValue = textEditor.innerHTML + text;
        textEditor.innerHTML = newValue;
    }
    
    function setNewLine(title){
        //removendo cursor
        removeCursor();
    
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

     this.RunMessage = async function(name, message){
            await this.WriteText(`./${name}`,100,false);
            var ul = document.querySelector('.command-list-prompt');
            var li = document.createElement('li'); 
            li.className = "g-message";
            li.innerHTML = message;
            ul.appendChild(li);
            setNewLine(this.title_line);
        
     }

     this.Clear = async function(exec_message = false){
        if(exec_message)
            await this.WriteText('clear',200,false);
        var ul = document.querySelector('.command-list-prompt');
        ul.innerHTML = '';
        setNewLine(this.home_title_line);
     }


     this.CreateNav = async function(path,optionsArray,enter,remove_cursor = false){

        await this.WriteText(`cd ${path}`,100,false);
        this.title_line = this.title_line + path + '$ ';
        setNewLine(this.title_line);

        await this.WriteText("ls",300,false);
        var navUl = document.createElement('ul'); 
        navUl.className ="g-nav-bar";
        var navLi;
        optionsArray.forEach(option => {
            navLi = document.createElement('li');;
            navLi.className = "g-nav-item";
            navLi.setAttribute('id',option.id);
            navLi.setAttribute('href',option.href);
            navLi.innerHTML = option.text;
            navUl.appendChild(navLi);
        });

        var ul = document.querySelector('.command-list-prompt');
        var li = document.createElement('li'); 

        li.appendChild(navUl);
        ul.appendChild(li);

        if(enter)
            setNewLine(this.title_line);
        else if(remove_cursor){
            removeCursor();
        }



    }
}