export default expectedCalculator = (date, amount, rate) => {
  const duration =
    (new Date().getTime() - new Date(date).getTime()) /
    (1000 * 3600 * 24).toFixed(2);
  const principal = +amount;
  const time = duration / 365; 
  const r = +rate / 100; 

  const compoundInterest = principal * Math.pow(1 + r, time);

  return +compoundInterest.toFixed(2);
};
