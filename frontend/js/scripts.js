import setCurrency from '../utils/setCurrency.js';
import setStars from '../utils/setStars.js';
const containerProduct = document.querySelector('.container-product');
const form = document.querySelector('.form');
const input = document.querySelector('.search__input');
const searchIcon = document.querySelector('.search__icon');

const fetchProducts = async (keyword) => {
  if (keyword) {
    const response = await fetch(`http://localhost:3001/products/k=${keyword}`);
    const data = await response.json();
    return data;
  } else {
    const APIResponse = await fetch(`http://localhost:3001/products/k=playstation+5`);
    const data = await APIResponse.json();
    return data;
  }
};

const loadProducts = async () => {
  const productsList = await fetchProducts();

  productsList.map((product) => {
    const card = document.createElement('div');
    const containerImage = document.createElement('div');
    const image = document.createElement('img');
    const cardInfo = document.createElement('div');
    const title = document.createElement('h2');
    const ratingWrapper = document.createElement('div');
    const reviews = document.createElement('span');
    const price = document.createElement('span');

    card.classList.add('product-card');
    containerImage.classList.add('container-image');
    image.classList.add('card__image');
    cardInfo.classList.add('card__infos');
    title.classList.add('card__title');
    ratingWrapper.classList.add('rating__wrapper');
    reviews.classList.add('card__reviews');
    price.classList.add('card__price');

    image.src = product.imageURL;
    image.alt = product.title;
    title.textContent = product.title;
    const stars = document.createElement('div');
    stars.classList.add('stars__wrapper');
    const nStars = setStars(product.rating);
    for (let i = 0; i < nStars; i++) {
      const star = document.createElement('img');
      star.classList.add('star__small');
      star.src = './assets/star-solid.svg';
      star.alt = 'star';
      stars.append(star);
    }
    ratingWrapper.append(stars);
    reviews.textContent = product.reviews;
    price.textContent = setCurrency(product.price);

    containerProduct.append(card);
    card.append(containerImage);
    containerImage.append(image);
    card.append(cardInfo);
    cardInfo.append(title);
    cardInfo.append(ratingWrapper);
    ratingWrapper.append(reviews);
    cardInfo.append(price);
  })
};

loadProducts();

const loadSearchProducts = async (productsList) => {
  const divsProducts = document.querySelectorAll('.product-card');

  divsProducts.forEach((divProduct, index) => {
    const containerImage = divProduct.querySelector('.container-image');
    const image = divProduct.querySelector('.card__image');
    const cardInfo = divProduct.querySelector('.card__infos');
    const title = divProduct.querySelector('.card__title');
    const ratingWrapper = divProduct.querySelector('.rating__wrapper');
    const reviews = divProduct.querySelector('.card__reviews');
    const price = divProduct.querySelector('.card__price');
    const containerStars = divProduct.querySelector('.stars__wrapper');

    image.src = productsList[index].imageURL;
    image.alt = productsList[index].title;
    title.textContent = productsList[index].title;
    containerStars.textContent = '';
    const nStars = setStars(productsList[index].rating);
    for (let i = 0; i < nStars; i++) {
      const star = document.createElement('img');
      star.classList.add('star__small');
      star.src = './assets/star-solid.svg';
      star.alt = 'star';
      containerStars.append(star);
    }
    reviews.textContent = productsList[index].reviews;
    price.textContent = setCurrency(productsList[index].price);

    divProduct.append(containerImage);
    containerImage.append(image);
    divProduct.append(cardInfo);
    cardInfo.append(title);
    ratingWrapper.append(containerStars);
    ratingWrapper.append(reviews);
    cardInfo.append(ratingWrapper);
    cardInfo.append(price);
  })
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const productsList = await fetchProducts(input.value.toLowerCase());
  loadSearchProducts(productsList);
  input.value = '';
});

searchIcon.addEventListener('click', async () => {
  if (!input.value) return;
  const productsList = await fetchProducts(input.value.toLowerCase());
  loadSearchProducts(productsList);
  input.value = '';
});