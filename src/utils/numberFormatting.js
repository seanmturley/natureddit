const formatNumber = (number) => {
  if (number < 1000) {
    return number;
  }

  if (number < 1e6) {
    const numberThousands = number / 1000; // For display with "k" suffix

    if (number < 1e5) {
      return `${Math.round(numberThousands * 10) / 10}k`; // Multiplication and division to get 1dp
    } else {
      return `${Math.round(numberThousands)}k`;
    }
  }

  const numberMillions = number / 1e6;

  if (number < 1e8) {
    return `${Math.round(numberMillions * 10) / 10}m`; // Multiplication and division to get 1dp
  } else {
    return `${Math.round(numberMillions)}m`;
  }
};

export default formatNumber;
