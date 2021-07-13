let configs = {};

/* A URL que está configurada para receber as requisições */
configs.base_url = "http://127.0.0.1"

/* Endpoint de pesquisa.
 * Não estou fazendo a requisição diretamente no JS para evitar,
 * entre outras coisas, a exposição da chave de API. 
 * Estou basicamente fazendo a pesquisa de cidades no back-end e 
 * retornando apenas os dados para o front-end. */
configs.endpoint_pesquisa = "/search"

/* Endpoint que retorna os dados do clima. Mesmo caso anterior,
 * não quero expor a chave de API no front-end. */
configs.endpoint_clima = "/weather"

/* Endpoint que recebe a avaliação do usuário através de uma requisição POST. */
configs.endpoint_avalia = "/new_record"

const icons = {
  "Limpo": `wi-${mode}-${sun}`,
  "Principalmente limpo": `wi-${mode}-${sun}`,
  "Parcialmente nublado": `wi-${mode}-cloudy`,
  "Nublado": `wi-cloudy`,
  "Chuva forte": `wi-sleet`,
  "Chuva leve": `wi-showers`,
  "Chuva": `wi-${mode}-rain`
};

$("#cidade").on("keyup", _.debounce(pesquisa, 1e3)), 
  $("#cidade").on("keypress",function() { $(".loading").slideDown(), $(".resultados-pesquisa").slideUp()});

function avaliar(c) {
  var a = document.querySelector(".rating"),
    b = parseInt(c.getAttribute("value"));
  for (e = 0; e < b; e++) {
    a.children[e].classList.add("clicked");
    for (var d = b; 4 >= d; d++) 
      a.children[d].classList.contains("clicked") && a.children[d].classList.remove("clicked")
  }
  
  configs.nota = b
}

const load = (url, json_data) => $.ajax({
  type: "POST",
  url: configs.base_url+url,
  data: JSON.stringify(json_data),
  contentType: "application/json; charset=utf-8",
  dataType: "json"
})

function pesquisa() {
  let a = $("#cidade").val();
  if(a.length > 1) busca(a), $(".loading").slideUp()
}

const busca = a => {
  $("footer").fadeOut()

  load(configs.endpoint_pesquisa, {
    query: a
  }).then(a => {
    $(".resultados-pesquisa").html("")
    $(".clima").slideUp(), $(".resultados-pesquisa").slideUp()
    
    for (x of Object.entries(a.data))
      $(".resultados-pesquisa").append("<div onclick='clima(\"" + x[1] + "\",\"" + x[0] + "\")'>" + x[0] + "</div>");
    
    $(".resultados-pesquisa").slideDown()
  })
};

function clima(a, b) {
  load(configs.endpoint_clima, {
    city_link: a
  }).then(a => {
    $(".resultados-pesquisa").slideUp(), $(".clima").slideUp(), $("#cidade").val(""), 
    $("#cidade-atual").text(b), $("#clima-atual").text(a.data.anchor), 
    $("#icon-clima-atual").removeClass(), $("#icon-clima-atual").addClass("wi"), 
    $("#icon-clima-atual").addClass(icons[a.data.anchor]), $("#temp").text(parseInt(a.data.degree)),
    $("#sens").text(parseInt(a.data.feels_like)), $("#umid").text(a.data.humidity.replace("Humidade", "Umidade")), 
    $("#vento").text(a.data.wind), $("#previsao").html("");
    
    for (x of a.data.next_days) dia = x.date.split(" ").join(" de "), 
      $("#previsao").append(`<div class="col-3"><div class="tl">${x.weekday}, ${dia}<\/div><div class="middle"><i class="wi ${icons[x.prediction]}"><\/i> ${parseInt(x.degree)}ºC<\/div><\/div>`);

    len = $('#previsao .col-3').length % 3

    if (len == 1) $("#avalia").addClass('avalia2')
    else if (len == 0) $("#avalia").addClass('avalia3')
    
    $(".clima").slideDown()
  })
}

const avalia = () => {
  Swal.fire({
    title: 'Essa informação foi satisfatória?',
    icon: 'question',
    html: `<div class="rating" tabindex="1"> <i class="fa fa-star" value="1" onclick="avaliar(this)"><\/i> <i class="fa fa-star" value="2" onclick="avaliar(this)"><\/i> <i class="fa fa-star" value="3" onclick="avaliar(this)"><\/i> <i class="fa fa-star" value="4" onclick="avaliar(this)"><\/i> <i class="fa fa-star" value="5" onclick="avaliar(this)"><\/i> <\/div>`,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      placeholder: 'Seu nome',
      id: 'username',
      required: true
    },
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    confirmButtonColor: '#67B26F',
    cancelButtonText: 'Voltar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      if(login.length < 1)
        Swal.showValidationMessage(
          'Informe seu nome!'
        )
      else {
        json_data = {
          name: login,
          city: $('#cidade-atual').text(), 
          weather: parseInt($('#temp').text()), 
          rating: configs.nota, 
          time: new Date().toLocaleString()
        }
        

        return $.ajax({
          type: "POST",
          url: configs.base_url+configs.endpoint_avalia,
          data: JSON.stringify(json_data),
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => console.log(error))
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Obrigado pela sua avaliação!',
        confirmButtonColor: '#67B26F',
        icon: 'success',
      })
    }
  })
};

