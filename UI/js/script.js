let signUp = () => {
  const userName = document.getElementById('uname').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const cPassword = document.getElementById('cpassword').value;
  const output = document.getElementById('output');
  const str = userName.slice(0, 1);
  const regex = /^[a-zA-Z]+/;
  const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (!userName || !email || !password || !cPassword) {
    output.innerHTML = 'Fill the empty fields';
    return false;
  } if (regex.test(str) === false) {
    output.innerHTML = 'Username cannot begin with special characters or numbers';
    return false;
  } if (emailRegex.test(email)  === false) {
    output.innerHTML = 'Invalid email input';
    return false;
  }
  window.location = 'signin.html';
  return window.location;
};

const signIn = () => {
  const userName = document.getElementById('uname').value.trim();
  const pwd = document.getElementById('password').value;
  const regex = /^[a-zA-Z]+/;
  const output = document.getElementById('output');
  const str = userName.slice(0, 1);
  if (!userName || !pwd) {
    output.innerHTML = 'Fill the empty fields';
    return false;
  } if (regex.test(str) === false) {
    output.innerHTML = "Username cannot begin with special characters or numbers"
    return false;
  }
  window.location = 'dashboard.html';
  return window.location;
};

let reset = () => {
  const pwd = document.getElementById('pwd').value;
  const cpwd = document.getElementById('cpwd').value;
  let str = userName.slice(0, 1);
  // if(!userName || !email){
  //     output.innerHTML = 'Fill the empty fields';
  //     return false;
  // }else if (regex.test(str) === false){
  //     output.innerHTML = "Username cannot begin with special characters or numbers"
  //     return false;
  // }else if(emailRegex.test(email)  === false){
  //     output.innerHTML = 'Invalid email input';
  //     return false;
  // }else{
  //     window.location = 'notification.html'
  // }   
}