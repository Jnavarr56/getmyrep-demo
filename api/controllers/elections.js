import fetchElections from "../services/address-elections";

export const get = async (request, response) => {
  const { address } = request.query;
  if (!address) {
    return response.status(400).send("Invalid address");
  }
  const elections = await fetchElections(address);
  const formattedResponse = { elections };

  response.send(formattedResponse);
};
