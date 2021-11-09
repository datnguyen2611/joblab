/*export const yearList = [
  { value: 2019, label: "2019" },
  { value: 2018, label: "2018" },
  { value: 2017, label: "2017" },
  { value: 2016, label: "2016" },
  { value: 2015, label: "2015" },
  { value: 2014, label: "2014" },
  { value: 2013, label: "2013" },
  { value: 2012, label: "2012" },
  { value: 2011, label: "2011" },
  { value: 2010, label: "2010" },
  { value: 2009, label: "2009" },
  { value: 2008, label: "2008" },
  { value: 2007, label: "2007" },
  { value: 2006, label: "2006" },
];*/

export const yearList = (startYear) => {
  var year_list = [];
  var object = {};
  
  var currentYear = new Date().getFullYear();
  var minYear;
  if (startYear == null)
    minYear = (currentYear - 100 > 1960) ? (currentYear - 100 ) : 1960;
  else
    minYear = startYear.value;
  
  for (var i = currentYear; i>=minYear; i--){
    object = {};
    object['value'] = i;
    object['label'] = i.toString();
    year_list.push(object);
  }
  
  /*for (var i = minYear; i<=currentYear; i++){
    object = {};
    object['value'] = i;
    object['label'] = i.toString();
    year_list.push(object);
  }*/
  
  return year_list;
}

export const monthList = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Feb" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Apr" },
  { value: 5, label: "May" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Aug" },
  { value: 9, label: "Sep" },
  { value: 10, label: "Oct" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dec" },
];