const setStars = (numberStars) => {
  const stars = numberStars.slice(0, 3).replace(',', '.');
  const nStars = Math.round(Number(stars));
  return nStars;
};

export default setStars;