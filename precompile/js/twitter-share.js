// https://dev.twitter.com/web/tweet-button/web-intent

function setTwitterLink(){
  var blockQuote = document.querySelectorAll('blockquote')[0].querySelectorAll('p')[0].textContent,
      currentURL = window.location.href,
      handle = "MjesticMonolith",
      handleExtension = "via @" + twitterHandle,
      link = "https://twitter.com/intent/tweet?via=" + handle + "&url=" + currentURL + "&text=",
      shareButton = document.querySelector(".share-button"),
      truncationLength = 140 - (currentURLString.length + handleExtension.length) - 3,
      truncatedQuote = blockQuote.substring(0, truncationLength);

  if(blockQuote.length < truncationLength){
    shareButton.setAttribute('href', link + blockQuote);
  } else {
    shareButton.setAttribute('href', link + truncatedQuote + "…");
  }
}

shareButton.addEventListener("click", setTwitterLink);
