const Utils = require("../utils");

describe("Test suite for utils.js :", () => {
  describe("Test isMobilePhone", () => {
    test.each`
      phone
      ${"0606060606"}
      ${"0707070707"}
      ${"+33(0)606060606"}
      ${"+33(0)706060606"}
      ${"+33 (0)606060606"}
      ${"+33 (0)706060606"}
      ${"+33606060606"}
      ${"+33706060606"}
      ${"+33(0)606060606"}
      ${"+33 (0)606060606"}
      ${"+33 (0)6 79 52 02 58"}
    `("should return true when testing for $phone", async ({ phone }) => {
      expect(Utils.isMobilePhone(phone)).toBeTruthy();
    });

    test.each`
      phone
      ${"0406060606"}
      ${"0107070707"}
      ${"+33(0)406060606"}
      ${"+33(0)106060606"}
      ${"+33 (0)406060606"}
      ${"+33 (0)106060606"}
      ${"+33406060606"}
      ${"+33106060606"}
      ${"+33 (0)4 06 06 06 06"}
    `("should return false when testing for $phone", async ({ phone }) => {
      expect(Utils.isMobilePhone(phone)).toBeFalsy();
    });
  });

  describe("Test is phoneNumber", () => {
    test.each`
      phone
      ${"0406060606"}
      ${"+33 (0)6 79 52 02 58"}
      ${"+33 (0)606060606"}
      ${"+33(0)406060606"}
    `("should return true when testing for $phone", async ({ phone }) => {
      expect(Utils.isPhoneNumber(phone)).toBeTruthy();
    });

    test.each`
      phone
      ${"2004280040001206"}
      ${"200428004000"}
      ${"6412547895"}
    `("should return false when testing for $phone", async ({ phone }) => {
      expect(Utils.isPhoneNumber(phone)).toBeFalsy();
    });
  });

  describe("Test emailParser", () => {
    test.each`
      emailBody                                                     | expected
      ${"site et téléphone 0668432753, 0467605412 www.example.com"} | ${{ phones: ["0467605412"], mobiles: ["0668432753"], websites: [] }}
      ${"04.67.13.00.07"}                                           | ${{ phones: ["04.67.13.00.07"], mobiles: [], websites: [] }}
      ${"téléphone fixe seul 0467605412"}                           | ${{ phones: ["0467605412"], mobiles: [], websites: [] }}
      ${"+33 (0)406060606"}                                         | ${{ phones: ["+33(0)406060606"], mobiles: [], websites: [] }}
      ${"+33215644865"}                                             | ${{ phones: ["+33215644865"], mobiles: [], websites: [] }}
      ${"01/43/38/12/47"}                                           | ${{ phones: ["01/43/38/12/47"], mobiles: [], websites: [] }}
      ${"+331/43/38/12/47"}                                         | ${{ phones: ["+331/43/38/12/47"], mobiles: [], websites: [] }}
      ${"+33(0)143132017"}                                          | ${{ phones: ["+33(0)143132017"], mobiles: [], websites: [] }}
      ${"téléphone mobile seul 0668432753"}                         | ${{ phones: [], mobiles: ["0668432753"], websites: [] }}
      ${"+33(0)606060606"}                                          | ${{ phones: [], mobiles: ["+33(0)606060606"], websites: [] }}
      ${"+33 (0)606060606"}                                         | ${{ phones: [], mobiles: ["+33(0)606060606"], websites: [] }}
      ${"+33 (0)6 79 52 02 58"}                                     | ${{ phones: [], mobiles: ["+33(0)679520258"], websites: [] }}
      ${"0686432753"}                                               | ${{ phones: [], mobiles: ["0686432753"], websites: [] }}
      ${"06(0)86432753"}                                            | ${{ phones: [], mobiles: [], websites: [] }}
      ${"06-65-78-45-89"}                                           | ${{ phones: [], mobiles: ["06-65-78-45-89"], websites: [] }}
      ${"Rien du tout !"}                                           | ${{ phones: [], mobiles: [], websites: [] }}
      ${"2004280040001206"}                                         | ${{ phones: [], mobiles: [], websites: [] }}
      ${"04280040001206"}                                           | ${{ phones: [], mobiles: [], websites: [] }}
      ${""}                                                         | ${{ phones: [], mobiles: [], websites: [] }}
    `(
      "should return expected when run with $emailBody",
      async ({ emailBody, expected }) => {
        expect(Utils.emailStringParser(emailBody)).toStrictEqual(expected);
      }
    );
  });

  describe("verifToken", () => {
    const arrayTest = ["Ana-12345-ba", "Ana-69420-ba", "Ana-66600-ba"];
    test.each`
      token
      ${"Ana-12345-ba"}
      ${"Ana-69420-ba"}
      ${"Ana-66600-ba"}
    `("sould return true when testing for $token", async ({ token }) => {
      expect(Utils.verifToken(token, arrayTest)).toBeTruthy();
    });

    test.each`
      token
      ${""}
      ${"aaaaa"}
      ${null}
      ${undefined}
    `("sould return false when testing for $token", async ({ token }) => {
      expect(Utils.verifToken(token, arrayTest)).toBeFalsy();
    });
  });

  describe("Test parseNames", () => {
    test.each`
      namesString             | expected
      ${"Jean Jacques"}       | ${{ firstname: "Jean", lastname: "Jacques" }}
      ${"Pierre"}             | ${{ firstname: "Pierre", lastname: "" }}
      ${"Jean-Michel Dupont"} | ${{ firstname: "Jean-Michel", lastname: "Dupont" }}
      ${"Jean-Pierre"}        | ${{ firstname: "Jean-Pierre", lastname: "" }}
    `(
      "should return expected when run with $emailBody",
      async ({ namesString, expected }) => {
        expect(Utils.parseNames(namesString)).toStrictEqual(expected);
      }
    );
  });
});
