/**
 * Test if a provided phone number is a mobile phone number
 * @param phoneNumber phone numer to test
 * @returns return true if the provided phone number begins with french mobile prefix
 */
export const isMobilePhone = (phoneNumber = "") => {
  console.log("test ", phoneNumber);
  const response = /^(0[6-7]|\+33[6-7]|\+33\(0\)[6-7]|\+33 \(0\)[6-7])/g.test(
    phoneNumber
  );
  return response;
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
  if (arrays) {
    return [].concat(...arrays.filter(Array.isArray));
  } else {
    return [];
  }
};

/**
 * Take a "firstname lastname" string and return signature name possibilities
 * @param stringName firstname and lastname in a string
 */
const getNamesVariations = (stringName = "") => {
  const { firstname, lastname } = parseNames(stringName);
  let arrayNames = [];

  //test all cases of names combinaisons, add lastname first letter
  if (lastname != "") {
    const lastnameInitial = lastname[0] + "\\.";
    arrayNames.push(`${firstname} ${lastnameInitial}`);
  }
  arrayNames.push(`${firstname} ${lastname}`);
  arrayNames.push(
    `${firstname.replace("-", " ")} ${lastname.replace("-", " ")}`
  );
  return arrayNames;
};

/**
 * Parse firstname and lastname from a firstname and lastname couple
 * @param fullName Full name (eg : Marc John)
 * @returns returns an object like this :
 *  {firstname: XXX,
 *  lastname: XXX}
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

/**
 * Search for websites in a string
 * @param testString the string to test
 * @returns an array of all websites find
 */
const findWebsites = (testString = ""): Array<string> => {
  const result = testString.match(
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g
  );
  return result;
};

/**
 * Search for email adress in a string
 * @param testString the string to test
 * @returns an array of all email adress find
 */
const findEmailAdress = (testString = ""): Array<string> => {
  const result = testString.match(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi
  );
  return result;
};

/**
 * Search for contact role under his name in a string,
 * analyse string line per line and returns contact role
 * @param testString string to test
 * @param name name of the contact
 * @returns an object {role}
 */
export const findContactRole = (testString: string = "", name: string = "") => {
  const arrayNames = getNamesVariations(name);

  const regexRole = new RegExp(
    `(?:${arrayNames.join("|")})[a-z. ,]*(?:[\r\n]|[\|])+([^\r\n]+)`,
    "gi"
  );
  const result = regexRole.exec(testString);

  let jobFonction = "";
  if (result) {
    jobFonction = result[1];
  }
  if (
    findEmailAdress(jobFonction) ||
    findWebsites(jobFonction) ||
    isMobilePhone(jobFonction)
  ) {
    jobFonction = "";
  }
  return { role: jobFonction };
};

/**
 * Search for phoneNumbers in a string
 * @param testString
 */
const findPhoneNumbers = (testString = "") => {
  console.log(testString);
  const emailSeparation = testString.split(
    /((De ?:|From ?:).+([^W][a-zA-Z0-9_]+(.[a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(.[a-zA-Z0-9_]+)*.[a-zA-Z]{2,4}))/i
  );
  let str = emailSeparation[0];
  console.log("emailSeparation", str);
  str = str.replace(
    /[ \f\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff.]+/g,
    ""
  );

  // Use regex to find what we want
  const phoneNumbers1 = str.match(
    /(?![0-9]{11})((\+([0-9][0-9]))|0)(\(0\))?[1-9]([- /,;]?([0-9]{2})){4}/g
  );
  const phoneNumbers2 = str.match(
    /(?![0-9]{7})((?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?)/g
  );
  console.log(phoneNumbers1);
  return new Set(concatArrays(phoneNumbers1, phoneNumbers2));
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
  const phoneNumbers = findPhoneNumbers(testString);

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

  let websites = findWebsites(testString);
  if (websites == null) {
    websites = [];
  }

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
