import { Summoner } from "../interface/Summoner";

const LeagueJS = require("leaguejs");
const RIOT_API_KEY = process.env["RIOT_API_KEY"];
const leagueJs = new LeagueJS(RIOT_API_KEY, {STATIC_DATA_ROOT: "./"});

export const getSummonerInfoByName = async (
  name: string,
  envName: string
): Promise<Summoner> => {
  const summoner = await leagueJs.Summoner.gettingByName(name, envName);
  return summoner;
};
