/**
 * Prepara e envia requisições baseadas no método HTTP. Se for
 * POST, um dado em JSON é enviado também.
 * 
 * @param {string} url - url do recurso solicitado
 * @param {string} method - método http 
 * @param {string} data - string em formato json
 * @param {Requester~requestCallback} callback - callback que trata a resposta
 */


function ajax(url, method, data, callback) {
  let request = new XMLHttpRequest();
  console.log(`JSON a ser enviado ${data}`);
  request.overrideMimeType("application/json");
  request.open(method, url, true);
  request.setRequestHeader("Content-type", "application/json")
  request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status == "200") {
        callback(request.responseText);
    }
  };
  request.send(data);
}