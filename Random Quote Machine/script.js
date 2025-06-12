const btnNewQuote = document.getElementById("new-quote");

const quoteURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
let ptrQuotes = -1;

const nextQuote = () => {
  ptrQuotes++;
  console.log(ptrQuotes);
  $.getJSON(quoteURL).then(function(data){
    const quote = data["quotes"][ptrQuotes]["quote"];
    const author = data["quotes"][ptrQuotes]["author"];
    showQuote(quote, author);
    setTweetHref(quote, author);
  });
}

const showQuote = (quote, author) => {
  $("#text").text(quote);
  $("#author").text(author);
}

const setTweetHref = (quote, author) => {
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent('"' + quote + '" \n-' + author)
  );
}

nextQuote();
btnNewQuote.onclick = nextQuote;
