export const parse = (event: { body: string }) => {
  const data: { body: string } = JSON.parse(event.body);

  console.log(data.body);
};
