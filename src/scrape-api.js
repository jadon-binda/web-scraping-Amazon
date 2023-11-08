const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const url = 'https://www.amazon.com/s?k=playstation+5&crid=30UXJS0ZX6OSP&sprefix=playst%2Caps%2C250&ref=nb_sb_ss_ts-doa-p_1_6';

puppeteer.launch()
  .then(function (browser) {
    return browser.newPage();
  })
  .then(function (page) {
    return page.goto(url)
      .then(function () {
        return page.content();
      });
  })
  .then(function (html) {
    const productTitle = [];
    const rating = [];
    const reviews = [];
    const productImage = [];
    const $ = cheerio.load(html);
    $('h2.a-size-mini.a-spacing-none.a-color-base').each(function () {
      productTitle.push($(this).text());
    });
    $('i.a-icon.a-icon-star-small').each(function () {
      rating.push($(this).text());
    });
    $('span.a-size-base.s-underline-text').each(function () {
      reviews.push($(this).text());
    });
    const listImages = $('.s-product-image-container span a');
    listImages.each(function (i, a) {
      productImage.push($(a).find('img').attr('src'));
    });
    console.log(productTitle);
    console.log(rating);
    console.log(reviews);
    console.log(productImage);
  })
  .catch(function (error) {
    console.log(error);
  });