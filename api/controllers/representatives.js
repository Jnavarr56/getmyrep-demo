import fetchReps from "../services/address-representatives";

export const get = async (request, response) => {
  const { address } = request.query;

  if (!address) {
    return response.status(400).send("Invalid address");
  }
  const reps = await fetchReps(address);
  const formattedResponse = { reps };

  response.send(formattedResponse);
};
