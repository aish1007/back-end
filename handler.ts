import { getLastFiveMatches } from "./src/controller/Match";

module.exports.matches = async (event) => {
  const { summonerName } = event.pathParameters;
  const envName = process.env["GAME_ENV"]!;
  let responseObject = {};

  try {
    const matchHistory = await getLastFiveMatches(summonerName, envName);

    if (matchHistory.length > 0) {
      responseObject = {
        statusCode: 200,
        body: JSON.stringify({
          matches: matchHistory,
        }),
      };
    } else {
      responseObject = {
        statusCode: 200,
        body: JSON.stringify({
          matches: [],
          message: `No match history found for ${summonerName}`,
        }),
      };
    }
  } catch (error) {
    console.log("Error!!!", error);
    responseObject = {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }

  return responseObject;
};
