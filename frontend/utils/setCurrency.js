const setCurrency = (value) => {
  const formatValue = value.replace('.', '').replace(',', '.');
  const currencyValue = Number(formatValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', currencyDisplay: 'symbol' });
  return currencyValue;
};

export default setCurrency;