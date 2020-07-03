/**
 * Test if a provided phone number is a mobile phone number
 * @param phoneNumber phone numer to test
 * @returns return true if the provided phone number begins with french mobile prefix
 */
export const isMobilePhone = (phoneNumber = "") => {
  const response = /^(0[6-7]|\+33[6-7]|\+33\(0\)[6-7]|\+33 \(0\)[6-7])/g.test(
    phoneNumber
  );
  return response;
};

//0668452365      --> 10
//+33654455445    --> 12
//+33(0)654455445 --> 15
/**
 * Test if a string is a phone number (length = 10, 12 or 15 and only numbers and phone specifics char)
 * @param phoneNumber string to test
 * @returns True if phoneNumber is a phone number, false otherwise
 */
export const isPhoneNumber = (phoneNumber = "") => {
  const phone = phoneNumber.replace(/[\s_\- \/\\,;.]+/g, "");
  return phone.length === 10 || phone.length === 12 || phone.length === 15;
};

/**
 * Concat all arrays that are not null
 * @param arrays list of arrays
 * @returns Return an concatenation of all arrays
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

  //Get line under names in signature (must be the same as that displayed on Outlook)
  const regexRole = new RegExp(
    `(?:${arrayNames.join("|")})[a-z. ,]*(?:[\r\n]|[\|])+([^\r\n]+)`,
    "gi"
  );
  const result = regexRole.exec(testString);

  let jobFonction = "";
  if (result) {
    jobFonction = result[1];
  }

  // Don't keep jobfunction if email, website or phone
  if (
    findEmailAdress(jobFonction) ||
    findWebsites(jobFonction) ||
    /((\+([0-9][0-9]))|0)(\(0\))?[1-9]([_\- /\\,;.|]?([0-9]{2})){4}/g.test(
      jobFonction
    )
  ) {
    jobFonction = "";
  }
  return { role: jobFonction };
};

/**
 * Search for phoneNumbers in a string and return them in a set (no duplicate)
 * @param testString string to parse
 * @returns return a set with all phones found in testString
 */
const findPhoneNumbers = (testString = "") => {
  const emailSeparation = testString.split(
    /((De ?:|From ?:).+([^W][a-zA-Z0-9_]+(.[a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+(.[a-zA-Z0-9_]+)*.[a-zA-Z]{2,4}))/i
  );
  let str = emailSeparation[0];
  str = str.replace(
    /[ \f\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff.]+/g,
    ""
  );

  // Use regex to find what we want
  //  for French phones
  const phoneNumbers1 = str.match(
    /(?![0-9]{11})((\+([0-9][0-9]))|0)(\(0\))?[1-9]([_\- /\\,;.|]?([0-9]{2})){4}/g
  );
  //  for US phones
  const phoneNumbers2 = str.match(
    /(?![0-9]{7})((?:(?:\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9])\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([0-9][1-9]|[0-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?)/g
  );
  return new Set(concatArrays(phoneNumbers1, phoneNumbers2));
};

/**
 * Extract phone number and website field from a text.
 * @param testString string to test
 * @returns returns an object like this :
 * {phone: XXX,
 *  mobile: XXX,
 *  website: XXX}
 */
export const emailStringParser = (testString = "") => {
  console.log("Begin email parser...");
  const phoneNumbers = findPhoneNumbers(testString);
  let mobilePhone = [];
  let homePhone = [];

  if (phoneNumbers) {
    mobilePhone = [...phoneNumbers].filter(
      (element) => isPhoneNumber(element) && isMobilePhone(element)
    );
    homePhone = [...phoneNumbers].filter(
      (element) => isPhoneNumber(element) && !isMobilePhone(element)
    );
    console.log(`Phones found ! ${mobilePhone} and ${homePhone}`);
  }

  // Not used for now
  /*let websites = findWebsites(testString);
  if (websites == null) {
    websites = [];
  }*/

  const websites = [];

  console.log("Email parser finished ! Thanks you ! \\(^o^)/");
  return {
    phones: homePhone,
    mobiles: mobilePhone,
    websites: websites,
  };
};
