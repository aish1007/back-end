import { getSummonerInfoByName } from "../services/Summoner";

export const getLastFiveMatches = async (summonerName: string,envName: string) => {
    const summoner = await getSummonerInfoByName(summonerName, envName);
    console.log("summoner!!!!!****", summoner);
    
};