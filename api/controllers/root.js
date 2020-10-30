import reverseGeocode from "../services/reverse-geocode";
import fetchReps from "../services/get-reps";

export default async (request, response) => {
  const { lat, lng } = request.query;
  const addressMatches = await reverseGeocode(lat, lng);
  const reps = await fetchReps(addressMatches[0]);

  response.status(200).send({ reps });
};
