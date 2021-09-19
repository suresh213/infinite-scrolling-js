var page = 1;
var limit = 10;
var container = document.querySelector('.container');
var quotesDiv = document.querySelector('.quotes');
var loader = document.querySelector('.lds-ripple');

const showLoader = () => {
  loader.classList.add('show');
};

const hideLoader = () => {
  loader.classList.remove('show');
};

const fetchData = () => {
  let API = `https://quotable.io/quotes?page=${page}&limit=${limit}`;
  showLoader();
  try {
    setTimeout(() => {
      fetch(API)
        .then((res) => res.json())
        .then((json) => {
          //   console.log(json);
          showData(json.results);
          hideLoader();
        });
    }, [500]);
  } catch (err) {
    console.log(err);
  }
};

const showData = (quotes) => {
  quotes.forEach((quote, index) => {
    var div = document.createElement('div');
    div.classList.add('p-div');

    var paragraph = document.createElement('p');

    paragraph.innerHTML = `<span>${
      page * limit - limit + (index + 1)
    }. </span>${quote.content}`;

    div.appendChild(paragraph);
    quotesDiv.appendChild(div);
  });
};

(function onLoad() {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  fetchData();
})();

window.addEventListener('scroll', () => {
  const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight) {
    ++page;
    fetchData();
  }
});
