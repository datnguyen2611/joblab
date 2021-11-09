export const convertNumberSalaryRateTime = (
  param: number,
  per: string,
  salaryRateTime: string
) => {
  let value;
  switch (per) {
    case "year":
      switch (salaryRateTime) {
        case "year":
          value = param;
          break;
        case "month":
          value = param / 12;
          break;
        case "semimonthly":
          value = param / 12 / 2;
          break;
        case "week":
          value = param / 12 / 4.333333;
          break;
        case "day":
          value = param / 12 / 4.333333 / 5;
          break;
        case "hour":
          value = param / 12 / 4.333333 / 5 / 8;
      }
      break;
    case "month":
      switch (salaryRateTime) {
        case "year":
          value = param * 12;
          break;
        case "month":
          value = param;
          break;
        case "semimonthly":
          value = param / 2;
          break;
        case "week":
          value = param / 4.333333;
          break;
        case "day":
          value = param / 4.333333 / 5;
          break;
        case "hour":
          value = param / 4.333333 / 5 / 8;
      }
      break;
    case "semimonthly":
      switch (salaryRateTime) {
        case "year":
          value = param * 2 * 12;
          break;
        case "month":
          value = param * 2;
          break;
        case "semimonthly":
          value = param;
          break;
        case "week":
          value = (param * 2) / 4.333333;
          break;
        case "day":
          value = (param * 2) / 4.333333 / 5;
          break;
        case "hour":
          value = (param * 2) / 4.333333 / 5 / 8;
      }
      break;
    case "week":
      switch (salaryRateTime) {
        case "year":
          value = param * 4.333333 * 12;
          break;
        case "month":
          value = param * 4.333333;
          break;
        case "semimonthly":
          value = (param * 4.333333) / 2;
          break;
        case "week":
          value = param;
          break;
        case "day":
          value = param / 5;
          break;
        case "hour":
          value = param / 5 / 8;
      }
      break;
    case "day":
      switch (salaryRateTime) {
        case "year":
          value = param * 5 * 4.333333 * 12;
          break;
        case "month":
          value = param * 5 * 4.333333;
          break;
        case "semimonthly":
          value = (param * 5 * 4.333333) / 2;
          break;
        case "week":
          value = param * 5;
          break;
        case "day":
          value = param;
          break;
        case "hour":
          value = param / 8;
      }
      break;
    case "hour":
      switch (salaryRateTime) {
        case "year":
          value = param * 8 * 5 * 4.333333 * 12;
          break;
        case "month":
          value = param * 8 * 5 * 4.333333;
          break;
        case "semimonthly":
          value = (param * 8 * 5 * 4.333333) / 2;
          break;
        case "week":
          value = param * 8 * 5;
          break;
        case "day":
          value = param * 8;
          break;
        case "hour":
          value = param;
      }
  }

  return value;
};

export const convertNumberSalaryYear = (param: number, per: string) => {
  let value;
  switch (per) {
    case "year":
      value = param;
      break;
    case "month":
      value = param * 12;
      break;
    case "semimonthly":
      value = param * 2 * 12;
      break;
    case "week":
      value = param * 4.333333 * 12;
      break;
    case "day":
      value = param * 5 * 4.333333 * 12;
      break;
    case "hour":
      value = param * 8 * 5 * 4.333333 * 12;
  }

  return value;
};

export const convertNumberSalaryMonth = (param: number, per: string) => {
  let value;
  switch (per) {
    case "year":
      value = param / 12;
      break;
    case "month":
      value = param;
      break;
    case "semimonthly":
      value = param / 2;
      break;
    case "week":
      value = param / 4.333333;
      break;
    case "day":
      value = param / 4.333333 / 5;
      break;
    case "hour":
      value = param / 4.333333 / 5 / 8;
  }

  return value;
};

export const convertNumberSalaryHour = (param: number, per: string) => {
  let value;
  switch (per) {
    case "year":
      value = param / 5 / 8 / 4.333333 / 12;

      break;
    case "month":
      value = param / 5 / 8 / 4.333333;
      break;
    case "semimonthly":
      value = param / 5 / 8 / (4.333333 / 2);
      break;
    case "week":
      value = param / 5 / 8;
      break;
    case "day":
      value = param / 8;
      break;
    case "hour":
      value = param;
  }

  return value;
};

export const convertCurrencyUnit = (country: string) => {
  let value;
  switch (country) {
    case "Hong Kong":
      value = "HK$";
      break;
    case "China":
      value = "RMB¥";
      break;
    case "India":
      value = "INR₹";
      break;
    case "Singapore":
      value = "SGD$";
      break;
    case "Japan":
      value = "JPY¥";
      break;
    case "USA":
      value = "USD";
      break;
    case "Australia":
      value = "AUD$";
      break;
    case "New Zealand":
      value = "NZD$";
      break;
    case "UK":
      value = "GBP£";
      break;
    case "Vietnam":
      value = "VND";
      break;
    case "Thailand":
      value = "THB฿";
      break;
    case "Malaysia":
      value = "MYR$";
      break;
    case "Indonesia":
      value = "Rp";
      break;
    case "Taiwan":
      value = "NT$";
  }

  return value;
};
