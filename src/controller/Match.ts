import { getRecentMatches } from "../services/Match";
import { getSummonerInfoByName } from "../services/Summoner";

export const getLastFiveMatches = async (summonerName: string,envName: string) => {
    const summoner = await getSummonerInfoByName(summonerName, envName);
		const recentMatches = await getRecentMatches(summoner.puuid, envName);

}