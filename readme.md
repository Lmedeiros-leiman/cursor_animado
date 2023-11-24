# Cursor animado

[Visualização online.](https://lmedeiros-leiman.github.io/cursor_animado/)

Este é um projeto que busca criar uma pequena animação que segue o cursor do mouse.

este projeto utiliza apenas Javascript com HTML e CSS. sem nenhuma dependencia.

caso queira modificar a estrela, verifique a função CriarCaractereEstrela().

## Como Funciona?

esse projeto é relativamente simples: se baseia na ideia de que todo movimento com o mouse é considerado um evento. quando o usuário movimenta seu ponteiro o navegador entrega junto as novas coordenadas do ponteiro. utilizando elas podemos construir um elemento HTML com posicionamento absoluto para criar uma animação que persegue o ponteiro.

A animação é básicamente um rotacionamento da estrela enquanto movimenta sua posição "top" para baixo e reduz sua opacidade.

minha recomendação para caso queira utilizar este projeto é colocar todo e qualquer texto com um z-index acima dos decoradores do cursor, para assim não atrapalhar MUITO a leitura.

