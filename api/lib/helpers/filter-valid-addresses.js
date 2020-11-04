export default (addresses) => {
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
