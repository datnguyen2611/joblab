
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSuggestions(value, searchList) {
  const inputValue = escapeRegexCharacters(value.trim().toLowerCase());
  
  const regex = new RegExp('\\b' + inputValue, 'i');
  
  const inputLength = inputValue.length;
  
  if(Array.isArray(searchList))
  {
    return inputLength < 1 ? [] : searchList.filter(searchItem =>
    regex.test(searchItem.name.toLowerCase()) //searchItem.name.toLowerCase().slice(0, inputLength) === inputValue || 
    );
  }
  else
    return [];
}