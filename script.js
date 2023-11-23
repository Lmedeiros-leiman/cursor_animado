//
// Variaveis
//


const DocumentBody = document.querySelector("body");


//
// Funções
//

function appendElement(elemento, tempo = 1000)
{

    document.body.appendChild(elemento);

    setTimeout(() =>
    {
        document.body.removeChild(elemento);
    }, tempo);

}

function criarEstrela()
{
    // não queria depender de livrarias de terceiro.
    let estrela = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    estrela.setAttribute("class", "svg-inline--fa fa-star estrela absoluta star");
    estrela.setAttribute("style", "top: 211px; left: 634px;");

    estrela.setAttribute("viewBox", "0 0 576 512");
    estrela.setAttribute("height", "1em");


    // cria a imagem em si mesmo.
    // só copiei o svg de uma livraria gratuita, nesse caso foi do font awesome.
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", "M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z");

    estrela.appendChild(path);
    //estrela = document.createElement("i");




    return estrela // retorna o ponteiro para o objeto estrela.
}

//
// Código Principal
//
document.onmousemove = (e) => 
{
    let CursorCurrentPosition = { "X": e.clientX, "Y": e.clientY };
    let Estrela = criarEstrela();

    const AnimacaoAleatoria = () =>
    {
        const animacoes = ["queda-1", "queda-2", "queda-3"];
        return animacoes[Math.floor(Math.random() * animacoes.length)]
    }

    Estrela.classList.add("estrela", "absoluta", AnimacaoAleatoria());

    Estrela.style.top = CursorCurrentPosition.Y + "px";
    Estrela.style.left = CursorCurrentPosition.X + "px";


    appendElement(Estrela, 1000)



}