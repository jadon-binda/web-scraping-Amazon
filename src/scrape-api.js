const axios = require('axios').default;
const cheerio = require('cheerio');
const url = 'https://www.amazon.com.br/s?k=playstation+5&crid=1QKRN7Y2RKZ8J&sprefix=plays%2Caps%2C293&ref=nb_sb_ss_ts-doa-p_1_5';
const UAStrings = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0",
  "Mozilla/5.0 (Linux; Android 12; SM-S906N Build/QP1A.190711.020; wv) AppleWebKit/537.36\
  (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.119 Mobile Safari/537.36",
  "Mozilla/5.0 (Linux; Android 10; SM-G996U Build/QP1A.190711.020; wv) AppleWebKit/537.36\
  (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15\
  (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  "Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z Safari/537.36",
];
const randomUAStrings = UAStrings[Math.floor(Math.random() * UAStrings.length)];
const headers = {
  "accept": "*/*",
  "User-Agent": randomUAStrings,
  "Accept-Language": "pt-BR,pt;q=0.8,en-US;q=0.5,en;q=0.3",
  "cookie": "session-id=134-1235098-2039867; session-id-time=2082787201l; i18n-prefs=BRL; ubid-acbbr=135-0920755-4913258; session-token='GFUzAdTsctCNNt1LY27y+n+zkelsorqwVWbtw68t5uY4l365HTd5YEZorOmDSJqOs3hLy09O4fy4vNe6+iGZ5BgQfSjKGkM+rVOxnwXni4nQl8UsWb6ON+6CpCgOpPulL5EH+B3eXDIMCUzozU/sZ1YS6EOSH3PdgnfLY/4CwdfLKCr0BCMA0vhN8+0RM1s1wYEddWkkvjUMMYfJ/yhkMRMnqAnonpXI/AAd2WUz78tdKCAuhSyXLF3unZLDa1sbp/SiszDCd6IKn7Xjy6M9fUt8xXjGYWc/ChF3AYFAIMNEC3nPTMKHu6LzKex/lL6aLmKST47GbKQ72b4XU9GuVShoGLq9xNg1o0QQaIY/oss='; lc-acbbr=pt_BR",
  "referer": "https://www.amazon.com.br/"
}

axios.get(url, Headers = { headers })
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const productsTitle = [];
    const productsRating = [];
    const productReviews = [];
    const productImages = [];
    $('h2.a-size-mini').each(function () {
      productsTitle.push($(this).text().trim());
    });
    $('i.a-icon-star-small > span').each(function () {
      productsRating.push($(this).text().trim());
    });
    $('div.a-size-small span[aria-label] a span').each(function () {
      if ($(this).text().includes('estrelas') == false) {
        productReviews.push($(this).text().trim());
      }
    });
    $('div.s-image-square-aspect img').each(function () {
      productImages.push($(this).attr('src'));
    });
    console.log(productsTitle);
    console.log(productsRating);
    console.log(productReviews);
    console.log(productImages);
  })
  .catch((error) => {
    console.log(error);
  });