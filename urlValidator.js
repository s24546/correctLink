const urlRegex = /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;

function isURLValid(inputText) {
  return urlRegex.test(inputText);
}

module.exports = isURLValid;