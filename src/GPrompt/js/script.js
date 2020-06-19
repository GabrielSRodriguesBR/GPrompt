

 
document.addEventListener('DOMContentLoaded', async function (event) {
    var prompt = new GPrompt('gabriel@matrix:');

    var optionsArray = [
                        {text: "Portfólio", id: "nav-portfolio", href: "#"}, 
                        {text: "Sobre Mim", id: "nav-about", href: "#"}, 
                        {text: "Contato", id: "nav-contact", href: "#"}, 
                       ];
    var name = 'apresentacao(1)';
    var message = 'Olá, meu nome é Gabriel e seja bem vindo ;-)';
    await prompt.CreateNav(optionsArray, true);
    // /prompt.RunMessage(name, message);
   
    
});


