import axios from "axios";
import authHeader from "./auth-header";
const API_RANKING = 'https://f1-fantasy-spring-backend.herokuapp.com/api/ranking'

class RankingService {
    getRankingsFromSeason(seasonId) {
        return axios.get(
            API_RANKING + `/season/${seasonId}`,
            { headers: authHeader() }
        );
    }
}

export default new RankingService();