//
// Variaveis
//


const configuration = {
    // brilho
    GlowDuration: 75,
    MaximumGlowDistance: 10,

    // estrela
    StarDistance: 200,
    StarColors: ["(142, 216, 199)", "(168, 198, 228)", "(195, 163, 200)", "(213, 194, 141)", "(175, 218, 183)"],
    StarSizes: ["1.4rem", "1rem", "0.6rem"],
    StarAnimations: ["queda-1", "queda-2", "queda-3"]
}

const originPosition = { "X": 0, "Y": 0 };
let CursorCurrentPosition, CursorLastPosition = { "X": 0, "Y": 0 };

//
// Funções
// essas são chamadas pelo código principal.
// eu queria separar tudo em classes, mas não to a fim de usar um webpacker.
//

function AppendElement(elemento, tempo = 1000)
{

    document.body.appendChild(elemento);

    setTimeout(() =>
    {
        document.body.removeChild(elemento);
    }, tempo);

}
function CriarEstrela()
{
    let Estrela = CriarCaractereEstrela();

    const AnimacaoAleatoria = () =>
    {
        const animacoes = configuration.StarAnimations;
        return animacoes[Math.floor(Math.random() * animacoes.length)]
    }

    const CorAleatoria = () =>
    {
        const cores = configuration.StarColors;
        return cores[Math.floor(Math.random() * cores.length)]
    }

    // configura a estrela
    Estrela.style.color = "rgb" + CorAleatoria();
    Estrela.style.animation = AnimacaoAleatoria() + " 1.5s ease-in-out"
    Estrela.classList.add("estrela", "absoluta");

    // move a estrela.
    MoverElemento(Estrela)
    AppendElement(Estrela, 1000)
}
function CriarCaractereEstrela()
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
function CriarTrilhaBrilho(atual = CursorCurrentPosition, antiga = CursorLastPosition)
{

    const MaximumGlowDistance = configuration.MaximumGlowDistance;

    const PointsDistance = CalcularDistanciaPontos();
    const PointsQuantity = Math.max(Math.floor(PointsDistance / MaximumGlowDistance), 1);

    const DeltaPositions = {
        "X": (atual.X - antiga.X) / PointsQuantity,
        "Y": (atual.Y - antiga.Y) / PointsQuantity,
    };

    // beleza, aqui criamos um array com o tamanho da quantidade de pontos.
    // cada entrada representa um ponto.
    // então só colocamos os pontos :)
    Array.from(Array(PointsQuantity)).forEach((_, index) =>
    {
        const posicao = {
            "X": (antiga.X + DeltaPositions.X * index),
            "Y": (antiga.Y + DeltaPositions.Y * index)
        }
        CriarBrilho(posicao)
    });
    CursorLastPosition = CursorCurrentPosition


}
function CriarBrilho(posicao)
{
    let Brilho = document.createElement("div");

    Brilho.classList.add("brilho")

    MoverElemento(Brilho, posicao)
    AppendElement(Brilho, configuration.GlowDuration)

}
function CalcularDistanciaPontos(atual = CursorCurrentPosition, antiga = CursorLastPosition)
{ // não gosto muito dessa solução, mas não to a fim de cava o código fonte do godot para achar uma versão rápida desse código.
    return Math.sqrt(Math.pow(atual.X - antiga.X, 2) + Math.pow(atual.Y - antiga.Y, 2));
}
function MoverElemento(elemento, posicao = CursorCurrentPosition)
{
    elemento.style.top = posicao.Y + "px";
    elemento.style.left = posicao.X + "px";
}

//
// Código Principal
//


window.onpointermove = (e) => 
{
    CursorCurrentPosition = { "X": e.clientX, "Y": e.clientY };
    //

    CriarTrilhaBrilho();

    if (CalcularDistanciaPontos(CursorCurrentPosition) < configuration.StarDistance) { return }
    //
    CriarEstrela();
    CursorLastPosition = CursorCurrentPosition




}