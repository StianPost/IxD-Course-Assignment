const donationAPI = `https://noroffcors.herokuapp.com/https://jsonkeeper.com/b/CH8F`;
const loading = document.querySelector('.loading');

// Call api
const getData = async () => {
  try {
    const response = await fetch(donationAPI);
    const result = await response.json();
    loading.innerHTML = '';
    result.forEach((element) => {
      document.querySelector('.container').innerHTML += `
      <div class="cardDiv">
      <a class="cardImgLink" href="/details.html"><div class="cardimg card${element.id}">
        </div></a>
        <h3 class="cardH2">${element.name}</h3>
        <a class="cardPLink" href="${element.link}"><p class="cardP">View Home Page</p></a>
      </div>
    `;
      document.querySelector(
        `.card${element.id}`
      ).style.backgroundImage = `url(${element.image})`;
    });
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
// Make cards

// Calculate % of donation on several donations
