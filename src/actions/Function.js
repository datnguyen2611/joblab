export function numberWithCommas(x) {
  if(x)
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  else
    return "-";
}

export function arraySortByDate(array, isAccending) {
  array.sort(function(a, b){
    var keyA = new Date(a.updatedAt),
        keyB = new Date(b.updatedAt);
    // Compare the 2 dates
    if(keyA < keyB) return isAccending ? -1 : 1;
    if(keyA > keyB) return isAccending ? 1 : -1;
    return 0;
  });
  return array
}
