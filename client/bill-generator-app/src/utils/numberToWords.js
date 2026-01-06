export function numberToWords(num) {
  if (num === 0) return "ZERO RUPEES ONLY";

  const ones = [
    "", "ONE", "TWO", "THREE", "FOUR", "FIVE",
    "SIX", "SEVEN", "EIGHT", "NINE", "TEN",
    "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN",
    "FIFTEEN", "SIXTEEN", "SEVENTEEN",
    "EIGHTEEN", "NINETEEN"
  ];

  const tens = [
    "", "", "TWENTY", "THIRTY", "FORTY",
    "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"
  ];

  const toWords = (n) => {
    if (n < 20) return ones[n];
    if (n < 100)
      return tens[Math.floor(n / 10)] + (n % 10 ? " " + ones[n % 10] : "");
    if (n < 1000)
      return (
        ones[Math.floor(n / 100)] +
        " HUNDRED" +
        (n % 100 ? " AND " + toWords(n % 100) : "")
      );
    return "";
  };

  let result = "";
  const crore = Math.floor(num / 10000000);
  const lakh = Math.floor((num / 100000) % 100);
  const thousand = Math.floor((num / 1000) % 100);
  const hundred = num % 1000;

  if (crore) result += toWords(crore) + " CRORE ";
  if (lakh) result += toWords(lakh) + " LAKH ";
  if (thousand) result += toWords(thousand) + " THOUSAND ";
  if (hundred) result += toWords(hundred);

  return result.trim() + " RUPEES ONLY";
}
