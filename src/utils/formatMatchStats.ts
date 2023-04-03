import { ItemsPurchased, Match, MatchStatistics } from "../interface/Match";
import { Summoner } from "../interface/Summoner";
import itemsJSON from "../scripts/13.6.1/en_US/item.json";

const formatMatchStats = (
  summoner: Summoner,
  matches: Match[]
): MatchStatistics[] => {
  const matchStatistics = matches.map((match) => {
    const { gameDuration, gameStartTimestamp, gameEndTimestamp } = match.info;
    let minutes = 0;
    let seconds = 0;
    if (!gameEndTimestamp) {
      let minutes = Math.floor(gameDuration / 60000);
      const secondsString = ((gameDuration % 60000) / 1000).toFixed(0);
      seconds = parseInt(secondsString, 10);
      minutes = seconds == 60 ? minutes + 1 : minutes;
      seconds = seconds == 60 ? 0 : seconds;
    } else {
      minutes = Math.floor(gameDuration / 60);
      seconds = gameDuration - minutes * 60;
    }
    const gameDate = new Date(gameStartTimestamp).toLocaleDateString("en-US");
    const summonerMatchInfo = match.info.participants.filter(
      (participant) => participant.puuid === summoner.puuid
    );
    const {
      champLevel,
      championName,
      kills,
      deaths,
      assists,
      win,
      goldEarned,
      goldSpent,
      profileIcon,
      item0,
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
    } = summonerMatchInfo[0];

    const profileImg = `https://ddragon.leagueoflegends.com/cdn/13.6.1/img/profileicon/${profileIcon}.png`;
    const items = [item0, item1, item2, item3, item4, item5, item6];
    const itemsPurchased = items
      .map((item) => {
        if (item && item !== 0) {
          const itemInfo = itemsJSON.data[`${item}`];
          if (itemInfo?.name || itemInfo?.image) {
            return {
              name: itemInfo.name!,
              img: `https://ddragon.leagueoflegends.com/cdn/13.6.1/img/item/${itemInfo.image.full}`,
            };
          }
        }
      })
      .filter((item) => item) as ItemsPurchased[];
    return {
      summonerName: summoner.name,
      duration: { ...{ minutes }, ...{ seconds } },
      items: itemsPurchased,
      ...{ profileImg },
      ...{ gameDate },
      ...{ goldEarned },
      ...{ goldSpent },
      ...{ champLevel },
      ...{ championName },
      ...{ kills },
      ...{ deaths },
      ...{ assists },
      ...{ win },
    };
  });
  return matchStatistics;
};

export default formatMatchStats;
