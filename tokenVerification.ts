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
  