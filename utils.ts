/**
 * Test if a provided phone number is a mobile phone number
 * @param phoneNumber phone numer to test
 * @returns return true if the provided phone number begins with mobile prefix 
 */
export const isMobilePhone = (phoneNumber = "") => {
  const phone = phoneNumber.replace(" ", "");
  return (
    phone.startsWith("06") ||
    phone.startsWith("07") ||
    phone.startsWith("+336") ||
    phone.startsWith("+337") ||
    phone.startsWith("+33(0)6") ||
    phone.startsWith("+33(0)7")
  );
};

/**
 * Extract phone number and website field from a text.
 * @param testString string to test
 * @returns returns an object like this : {
 *  phone: XXX,
 *  mobile: XXX,
 *  website: XXX
 * }
 */
export const emailStringParser = (testString = "") => {
  // Use regex to find what we want
  const phoneNumbers = testString.match(
    /((0|\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9]))[1-9]([- .]?[0-9]{2}){4})/g
  );

  const mobilePhone = phoneNumbers.filter((element) => isMobilePhone(element));
  const HomePhone = phoneNumbers.filter((element) => !isMobilePhone(element));
  
  const websites = testString.match(
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g
  );

  return {
    phone: HomePhone,
    mobile: mobilePhone,
    website: websites,
  };
};

/**
 * Test if a provided token is valid
 * @param stringToken token to test
 * @param tokenArray array of all valid token
 * @returns return true if stringToken is present in tokenArray
 */
export const verifToken = (stringToken: string = "", tokenArray: Array<string> = []) => {
  if(stringToken == ""){
    return false;
  }
  return tokenArray.includes(stringToken);
};
