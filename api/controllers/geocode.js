import reverseGeocode from "../services/reverse-geocode";

export const get = async (request, response) => {
  const { lat, lng } = request.query;

  if (!validateLatLng(lat, lng)) {
    return response.status(400).send("Invalid coordinates");
  }
  const addressMatches = await reverseGeocode(lat, lng);
  const formattedResponse = { address_matches: addressMatches };

  response.status(200).send(formattedResponse);
};

const validateLatLng = (lat, lng) => {
  const pattern = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}");
  return pattern.test(lat) && pattern.test(lng);
};
