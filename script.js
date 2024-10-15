const username = document.getElementById("inputUsername");
const password = document.getElementById("inputPassword");
const loginButton = document.getElementById("login-btn");
const logoutButton = document.getElementById("logout-btn");

async function getIPAddress() {
  const url = "http://ip-api.com/json/";
  let response = await axios.get(url);
  return response.data.query;
}

async function getNativeHello(ipAddress) {
  const url = `https://hellosalut.stefanbohacek.dev/?ip=${ipAddress}`;
  let response = await axios.get(url);
  return response.data.hello;
}
//leverages geolocation to obtain the users country so it can then
//generate a customized greeting in the users native language.
async function generateHelloMessage() {
  let ipAddress = await getIPAddress();
  let nativeHello = await getNativeHello(ipAddress);
  // decode hello message
  const decodedHelloMessage = `${nativeHello} ${username.value} you have successfully logged in!`;
  alert(decodedHelloMessage);
}

function loginAction(event) {
  event.preventDefault();
  if (username.value === "" || password.value === "") {
    document.getElementById("error-msg").hidden = false;
  }
  if (username.value === "") {
    username.style.borderColor = "red";
  }
  if (password.value === "") {
    password.style.borderColor = "red";
  }
  if (username.value !== "" && password.value !== "") {
    generateHelloMessage();
  }
}

function logoutAction() {
  alert(`Have a great day ${username.value}!`);
  username.value = "";
  password.value = "";
}

loginButton.onclick = loginAction;
logoutButton.onclick = logoutAction;
