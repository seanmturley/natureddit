const formatNumber = (number) => {
  if (number < 1000) {
    return number;
  }

  const convertedNumber = number / 1000; // For display with "k" suffix

  if (number < 100000) {
    return `${Math.round(convertedNumber * 10) / 10}k`; // Multiplication and division to get 1dp
  } else {
    return `${Math.round(convertedNumber)}k`;
  }
};

export default formatNumber;
