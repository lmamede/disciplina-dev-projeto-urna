function ajax(url, method, data, callback) {
  let request = new XMLHttpRequest();
  console.log(`OIOIOI  ${data} `);
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