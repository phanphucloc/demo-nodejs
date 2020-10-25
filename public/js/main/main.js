function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function checkAuthorization() {
  token = getCookie('Authorization');
  return {
    token,
    status: !!token
  }
}

function deleteCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function removeValueInArray(array = [], value) {
  let index = array.findIndex(function (element) {
    return element === value
  })
  array.splice(index, 1)
}

function removeValuesInArray(array = [], values = []) {
  values.forEach(function (value) {
    var index = array.findIndex(function (element) {
      return element === value
    })
    array.splice(index, 1)
  })
}