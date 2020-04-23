export function bodyParser(bodyString){
    // Use regex to find what we want
  const phoneNumbers = bodyString.match(
    /((0|\+?([1-9]|[0-9][0-9]|[0-9][0-9][0-9]))[1-9]([- .]?[0-9]{2}){4})/g
  );
  const websites = bodyString.match(
    /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g
  );

    return {
        phones: phoneNumbers,
        websites: websites,
      }
}