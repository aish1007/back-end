import { MatchList } from "../interface/Match";

const LeagueJS = require("leaguejs");
const RIOT_API_KEY = process.env["RIOT_API_KEY"];
const leagueJs = new LeagueJS(RIOT_API_KEY, {
  STATIC_DATA_ROOT: "./",
  limits: { allowBurst: true },
});

export const getRecentMatches = async (
  playerId: string,
  envName: string
): Promise<MatchList> => {
  const options = {
    endIndex: 5,
  };
  const matchList = await leagueJs.Match.gettingListByAccount(
    playerId,
    envName,
    options
  );
  return matchList;
};
