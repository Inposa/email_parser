/**
 * Test if a provided phone number is a mobile phone number
 * @param phoneNumber phone numer to test
 * @returns return true if the provided phone number begins with french mobile prefix
 */
export const isMobilePhone = (phoneNumber = "") => {
  return (
    phoneNumber.startsWith("06") ||
    phoneNumber.startsWith("07") ||
    phoneNumber.startsWith("+336") ||
    phoneNumber.startsWith("+337") ||
    phoneNumber.startsWith("+33(0)6") ||
    phoneNumber.startsWith("+33(0)7") ||
    phoneNumber.startsWith("+33 (0)6") ||
    phoneNumber.startsWith("+33 (0)7")
  );
};

//0668452365      --> 10
//+33654455445    --> 12
//+33(0)654455445 --> 15
export const isPhoneNumber = (phoneNumber = "") => {
  const phone = phoneNumber.replace(/\s|\.|-|\/+/g, "");
  return phone.length === 10 || phone.length === 12 || phone.length === 15;
};

/**
 * Concat all arrays that are not null
 * @param arrays list of arrays
 */
const concatArrays = (...arrays): Array<string> => {
  return [].concat(...arrays.filter(Array.isArray));
};

export const getContactRole = (testString: string = "", name: string = "") => {
  const regexFunction = new RegExp(`(${name})\\n[^\\n]+`,"gi")
  const result = regexFunction.exec(testString)
  const jobFonction = result[0].split(/\s+/).slice(name.split(' ').length).join(' ');
  return {role : jobFonction}
}

/**
 * Extract phone number and website field from a text.
 * @param testString string to test
 * @returns returns an object like this : {
 *  phone: XXX,
 *  mobile: XXX,
 *  website: XXX
 * }
 */
export const emailStringParser = (testString = "", email = "") => {
  console.log("string pas touché :\n", testString);
  const regexTest = new RegExp(
    "(De :[a-z <>]+([^W][a-zA-Z0-9_]+(.[a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(.[a-zA-Z0-9_]+)*.[a-zA-Z]{2,4}))",
    "i"
  );
  const str2 = testString.split(regexTest);
  console.log("TABLEAU SPLIT :\n", str2);
  let str = str2[0];
  str = str.replace(/\s+/g, "");

  console.log("Test str avec replace :\n", str);

  // Use regex to find what we want
  // (?![0-9]{11}) --> exclude string if contain more than 10 digits like 2004280040001206
  const phoneNumbers1 = str.match(
    /(?![0-9]{11})((\+(33))|0)(\(0\))?[1-9]([-. /]?([0-9]{2})){4}/g
  );
  const phoneNumbers2 = str.match(
    /(?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/g
  );

  const phoneNumbers = new Set(concatArrays(phoneNumbers1, phoneNumbers2));

  //console.log("Extracted :\n", phoneNumbers);
  let mobilePhone = [];
  let homePhone = [];

  if (phoneNumbers != null) {
    mobilePhone = [...phoneNumbers].filter(
      (element) => isPhoneNumber(element) && isMobilePhone(element)
    );
    homePhone = [...phoneNumbers].filter(
      (element) => isPhoneNumber(element) && !isMobilePhone(element)
    );
  }

  // Websites not used for the moment
  const websites = [];
  /*let websites = testString.match(
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g
  );
  if (websites == null) {
    websites = [];
  }*/

  //console.log("Resultat \n", homePhone, mobilePhone, websites);
  return {
    phones: homePhone,
    mobiles: mobilePhone,
    websites: websites,
  };
};

/**
 * Test if a provided token is valid
 * @param stringToken token to test
 * @param tokenArray array of all valid token
 * @returns return true if stringToken is present in tokenArray
 */
export const verifToken = (
  stringToken: string = "",
  tokenArray: Array<string> = []
) => {
  if (stringToken == "") {
    return false;
  }
  return (
    stringToken === process.env.ANABATOKEN || tokenArray.includes(stringToken)
  );
};

/**
 * Parse firstname and lastname from a firstname and lastname couple
 * @param fullName Full name (eg : Marc John)
 * @returns returns an object like this : {
 *  firstname: XXX,
 *  lastname: XXX,
 * }
 */
export const parseNames = (fullName: string = "") => {
  const splittedName = fullName ? fullName.split(" ") : null;
  const finalParsedContact = {
    firstname: splittedName ? splittedName[0] : "",
    lastname:
      splittedName && splittedName.length > 1
        ? splittedName.slice(1).join(" ")
        : "",
  };
  return finalParsedContact;
};
