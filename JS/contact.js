const nameError = document.querySelector('.nameError');
const emailError = document.querySelector('.emailError');
const passwordError = document.querySelector('.passwordError');
const password2Error = document.querySelector('.password2Error');
const verification = document.querySelector('.verifyer');
const submit = document.querySelector('#submitBtn');

const donationExample = document.querySelector('.donationExample');
const donationAPI = `https://noroffcors.herokuapp.com/https://jsonkeeper.com/b/CH8F`;
const loading = document.querySelector('.loading');

const getData = async () => {
  try {
    const response = await fetch(donationAPI);
    const result = await response.json();
    loading.innerHTML = '';
    for (let i = 0; i < 3; i++) {
      donationExample.innerHTML += `
      <div class="donationExample__Divider">
      <div class="donationExample__Divider--organisation">
          <h2>${result[i].name}</h2>
          <img class="donationExampleImg" src="${result[i].image}"/>
      </div>
      <div class="donationExample__Divider--money">
          <label for="donation${i}"><h3>Donation Amount $:</h3></label>
          <input class="donationAmountInput" type="number" name="donation${i}" id="donation${i}">
      </div>
    </div>
      `;
    }
  } catch (error) {
    document.querySelector('.alert').innerHTML = showAlertTouser(
      error,
      'danger'
    );
    console.log(error);
  } finally {
    setTimeout(function () {
      document.querySelector('.alert').innerHTML = '';
    }, 10000);
  }
};

getData();

const calculate = document.querySelector('#calculateAmount');

calculate.onclick = function (e) {
  const taxReduction = document.querySelector('#taxAmmount');
  const donationTotal = document.querySelector('#totalAmmount');
  const donation0 = document.querySelector('#donation0').value;
  const donation1 = document.querySelector('#donation1').value;
  const donation2 = document.querySelector('#donation2').value;
  e.preventDefault();
  donationTotal.innerHTML =
    parseInt(donation0) + parseInt(donation1) + parseInt(donation2) + '$';
  taxReduction.innerHTML =
    parseInt(
      (parseInt(donation0) + parseInt(donation1) + parseInt(donation2)) * 0.15
    ) + '$';
  if (taxReduction.innerHTML === 'NaN$' || donationTotal.innerHTML === 'NaN$') {
    (taxReduction.innerHTML = ''),
      (taxReduction.style.color = 'red'),
      (donationTotal.innerHTML =
        'Please write a donation amount in <span class="underline">EVERY</span> donation field'),
      (donationTotal.style.color = 'red');
  } else {
    (taxReduction.style.color = 'black'), (donationTotal.style.color = 'black');
  }
};

submit.onclick = function (event) {
  event.preventDefault();

  const name = document.querySelector('#name').value.trim();
  const password = document.querySelector('#password').value.trim();
  const password2 = document.querySelector('#password2').value.trim();
  const email = document.querySelector('#email').value.trim();
  let nameValidation = false;
  let passwordValidation = false;
  let password2Validation = false;
  let emailValidation = false;

  if (testLength(name, 5)) {
    nameError.classList.add('hide');
    nameValidation = true;
  } else {
    nameError.classList.remove('hide');
  }

  if (validatePassword(password)) {
    passwordError.classList.add('hide');
    passwordValidation = true;
  } else {
    passwordError.classList.remove('hide');
  }
  if (password2 === password) {
    password2Error.classList.add('hide');
    password2Validation = true;
  } else {
    password2Error.classList.remove('hide');
  }

  if (validateEmail(email)) {
    emailError.classList.add('hide');
    emailValidation = true;
  } else {
    emailError.classList.remove('hide');
  }

  if (
    nameValidation &&
    emailValidation &&
    passwordValidation &&
    password2Validation
  ) {
    verification.classList.remove('hide');
    verification.innerHTML = `Welcome ${name}`;
    document.querySelector('.formDiv').style.display = 'none';
    document.querySelector('.accountBtn').style.display = 'none';
  } else {
    verification.classList.add('hide');
  }

  setTimeout(function () {
    verification.classList.add('hide');
  }, 3000);
};

function validateEmail(emailAddress) {
  const emailExpression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.(?:\.[a-zA-Z0-9-]+)*$/;
  const isEmailValid = emailExpression.test(emailAddress);
  return isEmailValid;
}

function validatePassword(password) {
  const passwordExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
  const isPasswordValid = passwordExpression.test(password);
  return isPasswordValid;
}

function testLength(elm, len) {
  if (elm.length >= len) {
    return true;
  } else {
    return false;
  }
}

const accountBtn = document.querySelector('.accountBtn');
let count = 0;
accountBtn.onclick = function () {
  count++;
  if (count % 2 === 0) {
    accountBtn.innerHTML = 'Skip Account Creation';
    document.querySelector('.formDiv').classList.remove('hide');
  } else {
    accountBtn.innerHTML = 'Create Account';
    document.querySelector('.formDiv').classList.add('hide');
  }
};

document.querySelector('#donateBtn').onclick = function () {
  document.querySelector(
    '.detailsMain'
  ).innerHTML = `<div class="donateComplete"><h1 class="donationThanks">Thanks for the donation!</h1></div>`;
};
