import { getRecentMatches } from "../services/Match";
import { getSummonerInfoByName } from "../services/Summoner";
import formatMatchStats from "../utils/formatMatchStats";

export const getLastFiveMatches = async (
  summonerName: string,
  envName: string
) => {
  const summoner = await getSummonerInfoByName(summonerName, envName);
  const recentMatches = await getRecentMatches(summoner.puuid, envName);
  const sortedMatches = recentMatches.matches.sort((match1, match2) => {
    const match1DateString = new Date(match1.info.gameStartTimestamp);
    const match2DateString = new Date(match2.info.gameStartTimestamp);
    return match2DateString.getTime() - match1DateString.getTime();
  });
  const matchStatistics = formatMatchStats(summoner, sortedMatches);
  return matchStatistics;
};
