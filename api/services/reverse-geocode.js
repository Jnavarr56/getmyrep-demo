import request from "../utils/generate-get-request";
import { GOOGLE_GEOCODE_API_URL, GOOGLE_API_KEY } from "../config/vars";

export default async (lat, lng) => {
  const params = {
    latlng: `${lat},${lng}`,
    key: GOOGLE_API_KEY,
  };

  const pendingRequest = request(GOOGLE_GEOCODE_API_URL, params);
  const pendingAddresses = pendingRequest.then((response) => {
    return filterValidAddresses(response.results);
  });
  return pendingAddresses;
};

const filterValidAddresses = (addresses) => {
  const validAddresses = addresses.reduce((valid, addressData) => {
    const { types, formatted_address } = addressData;

    for (const addressType of types) {
      if (addressType === "street_address" || addressType === "premise") {
        valid.push(formatted_address);
        return valid;
      }
    }

    return valid;
  }, []);

  return validAddresses;
};
