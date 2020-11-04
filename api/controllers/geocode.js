import reverseGeocode from "../services/reverse-geocode";
import validateLatLng from "../lib/helpers/validate-lat-lng";

export const get = async (request, response) => {
  const { lat, lng } = request.query;

  if (!validateLatLng(lat, lng)) {
    return response.status(400).send("Invalid coordinates");
  }
  const addressMatches = await reverseGeocode(lat, lng);
  const formattedResponse = { address_matches: addressMatches };

  response.status(200).send(formattedResponse);
};
