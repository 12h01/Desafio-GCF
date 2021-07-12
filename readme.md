
# Clima Atual (Desafio Programador GCF)

Clima Atual é um web app que utiliza dados do Yandex.Weather para mostrar informações do clima em uma dada cidade informada pelo usuário. Após verificar os dados, o usuário pode avaliar a informação numa escala de 1 a 5. Essa informação será enviada para um back-end (online ou local).

## Demonstração
Clique para assistir o vídeo de demonstração...

[![Clima Atual](http://img.youtube.com/vi/uG6TI951Cno/0.jpg)](http://www.youtube.com/watch?v=uG6TI951Cno "Clima Atual")

...ou clique no link para acessar online: [www.jpedro.tech/desafiogcf](https://www.jpedro.tech/desafiogcf/) 

Essa demonstração está hospedada online porém se conecta localmente ao meu servidor (back-end), então caso esteja offline no momento, me avise pelo [WhatsApp](https://wa.me/558888180440/) para que eu possa deixar o back-end ativo.

## Instalação

### Front-end

A interface front-end foi desenvolvida em JavaScript, portanto pode ser usada tanto localmente (abrindo diretamente o arquivo "index.html" em seu navegador) ou hospedando-a em um servidor online. 

Os dados da avaliação são enviados via POST para o backend.

**A única configuração *obrigatória* que você precisa fazer é informar a URL/endereço do seu servidor que vai receber a avaliação do usuário. Essa configuração pode ser feita no arquivo:**
```bash
assets/scripts/config.js```

#### Dependências
JavaScript: [VueJS](https://vuejs.org/), [jQuery](https://jquery.com/), [Lodash](https://lodash.com/).

CSS: [FontAwesome](https://fontawesome.com/), [SweetAlert2](https://sweetalert2.github.io/), [weather-icons](https://erikflowers.github.io/weather-icons/), [Buefy](https://buefy.org/documentation/start/).

### Back-end

O back-end pode ser implementado em várias linguagens de programação. Como não foi exigido uma certa linguagem no desafio, fiz a implementação em Python 3. E estou usando SQLite3 como base de dados.

Siga os seguintes passos para realizar a instalação do servidor back-end:

1. Extraia o arquivo "server.tar.gz" para uma pasta e abra o terminal dentro dela.

2. (opcional) Crie um *ambiente virtual*
```bash
python3 -m venv venv
. venv/bin/activate
```

3. Instale as dependências necessárias usando o gerenciador de pacotes [pip](https://pip.pypa.io/en/stable/):
```bash
pip3 install -r requirements.txt
```

4. Use o seguinte comando para inicializar o servidor:
```bash
python3 -m server
```
Caso queira iniciar em segundo plano (Linux), use o comando:
```bash
(python3 -m server &)
```

5. A consulta do banco de dados local pode ser feita localmente através do navegador através do endpoint /scoreboard. Por exemplo, caso esteja sendo executado em *localhost:8585*, acesse:
```bash
localhost:8585/scoreboard
```
Caso queira obter o conteúdo da base de dados direto no terminal, use o comando:
```bash
python3 -m server.databases
```

6. (opcional) Use o programa [ngrok](https://github.com/inconshreveable/ngrok) para tornar pública a porta que está sendo usada pelo servidor local.
Por exemplo, se *localhost:8585* for o endereço atual que está sendo usado no passo anterior, use o comando:
```bash
ngrok http 8585
```

## Outras Informações
Desenvolvi esse programa como solução do Desafio Programador GCF entre 10 a 12 de julho de 2021.

Para mais informações sobre esse projeto, por favor entre em contato comigo por
[WhatsApp](https://wa.me/558888180440), 
[E-mail](mailto:dev@jpedro.tech), 
[Telegram](https://t.me/imjpedro) ou [Twitter](https://wa.me/558888180440).
