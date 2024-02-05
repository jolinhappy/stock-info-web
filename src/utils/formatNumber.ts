const formatNumber = (number: number, unit: number) => {
  const targetNumber = number / unit;
  const commaNumber = targetNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return commaNumber;
};

export default formatNumber;
