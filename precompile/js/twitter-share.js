var blockQuote = document.querySelectorAll('blockquote')[0];
var blockQuoteText = blockQuote.querySelectorAll('p')[0].textContent;
var twitterButton = document.querySelector(".share-button");
var twitterHandle = "MjesticMonolith";
var twitterStringExtension = "via @" + twitterHandle;

function truncateString() {
  var trimLength = 140 - twitterStringExtension.length;
  var length = 6;
  var trimmedString = string;
}

function setTwitterLink(){
  //console.log(blockQuoteText);
  // https://dev.twitter.com/web/tweet-button/web-intent
  var currentURL = window.location.href;
  var currentURLStringLength = currentURL.length;
  var quoteLength = blockQuoteText.length;
  var truncationLength = 140 - (currentURLStringLength + twitterStringExtension.length) - 3;
  var link = "https://twitter.com/intent/tweet?via=MjesticMonolith&url=" + currentURL + "&text=";
  var truncatedQuote = blockQuoteText.substring(0, truncationLength);
  console.log("URL Length: " + currentURLStringLength);
  console.log("Twitter String Extension Length: " + twitterStringExtension.length);
  console.log("Truncation Length: " + truncationLength);
  console.log("Total: " + (currentURLStringLength + twitterStringExtension.length + truncationLength));
  if(quoteLength < truncationLength){
    twitterButton.setAttribute('href', link + blockQuoteText);
  } else {
    twitterButton.setAttribute('href', link + truncatedQuote + "…");
  }
}

twitterButton.addEventListener("click", setTwitterLink);
