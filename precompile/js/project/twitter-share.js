// https://dev.twitter.com/web/tweet-button/web-intent
var shareButton = document.querySelector(".share-button");

function setTwitterLink(){
  var blockQuote = document.querySelectorAll('blockquote')[0].querySelectorAll('p')[0].textContent,
    currentURL = window.location.href,
    handle = "MjesticMonolith",
    handleExtension = "via @" + handle,
    link = "https://twitter.com/intent/tweet?via=" + handle + "&url=" + currentURL + "&text=",
    // truncationLength = 140 - (currentURL.length + handleExtension.length) - 3,
    truncationLength = 140 - (currentURL.length + handleExtension.length) - 3,
    truncatedQuote = blockQuote.substring(0, truncationLength);

  if(blockQuote.length < truncationLength){
    shareButton.setAttribute('href', link + blockQuote);
  } else {
    shareButton.setAttribute('href', link + truncatedQuote + "…");
  }
}

if(shareButton) {
  shareButton.addEventListener("click", setTwitterLink);
}
