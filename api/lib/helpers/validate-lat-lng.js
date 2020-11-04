export default (lat, lng) => {
  const pattern = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}");
  return pattern.test(lat) && pattern.test(lng);
};
