import setCurrency from './utils/setCurrency.js';
import setStars from './utils/setStars.js';
const containerProduct = document.querySelector('.container-product');

const fetchProducts = async () => {
  const APIResponse = await fetch('http://localhost:3001/products');
  const data = await APIResponse.json();
  return data;
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
    const nStars = setStars(product.rating);
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
    for (let i = 0; i < nStars; i++) {
      const star = document.createElement('img');
      star.classList.add('star__small');
      ratingWrapper.append(star);
      star.src = './assets/star-solid.svg';
      star.alt = 'star';
    }
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