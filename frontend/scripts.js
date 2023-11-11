import setCurrency from './utils/setCurrency.js';
import setStars from './utils/setStars.js';
const containerProduct = document.querySelector('.container-product');

const fetchProducts = async () => {
  const APIResponse = await fetch('http://localhost:3001/products');
  const data = await APIResponse.json();
  return data;
};

const loadProducts = async () => {
  const data = await fetchProducts();

  data.map((product) => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    containerProduct.append(card);
    const containerImage = document.createElement('div');
    containerImage.classList.add('container-image');
    card.append(containerImage);
    const image = document.createElement('img');
    image.classList.add('card__image');
    containerImage.append(image);
    image.src = product.imageURL;
    image.alt = product.title;
    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card__infos');
    card.append(cardInfo);
    const title = document.createElement('h2');
    title.classList.add('card__title');
    cardInfo.append(title);
    title.textContent = product.title;
    const ratingWrapper = document.createElement('div');
    ratingWrapper.classList.add('rating__wrapper');
    cardInfo.append(ratingWrapper);
    const nStars = setStars(product.rating);
    for (let i = 0; i < nStars; i++) {
      const star = document.createElement('img');
      star.classList.add('star__small');
      ratingWrapper.append(star);
      star.src = './assets/star-solid.svg';
      star.alt = 'star';
    }
    const reviews = document.createElement('span');
    reviews.classList.add('card__reviews');
    ratingWrapper.append(reviews);
    reviews.textContent = product.reviews;
    const price = document.createElement('span');
    price.classList.add('card__price');
    cardInfo.append(price);
    price.textContent = setCurrency(product.price);
  })
};

loadProducts();