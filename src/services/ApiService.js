const BASE_URL = '../../data/mock';

class Api {
  async get(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await this.handleResponse(response);
    return this.normalizeData(data, endpoint);
  }

  async handleResponse(response) {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }

  normalizeData(data, endpoint) {
    console.log(endpoint);
    switch (endpoint) {
      case 'user.json':
        return data.map((elem) => {
          return {
            id: elem.id,
            userInfos: elem.userInfos,
            score: elem.todayScore ?? elem.score,
            keyData: elem.keyData,
          };
        });
      case 'userPerformance.json':
        return data.map((elem) => {
          return {
            id: elem.userId,
            kind: elem.kind,
            data: elem.data,
          };
        });
      case 'userAverageSessions.json':
        return data.map((elem) => {
          return {
            id: elem.userId,
            sessions: elem.sessions,
          };
        });
      default:
        return data;
    }
  }
}

const apiService = new Api();
export default apiService;
