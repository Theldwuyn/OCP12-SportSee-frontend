const BASE_URL = 'http://localhost:3000/user/';
const BASE_MOCKED_URL = '../../data/mock';

class Api {
  constructor() {
    this.isMockedData = false;
    this.routes = [
      { path: ':id', handler: this.normalizeUserData },
      { path: ':id/performance', handler: this.normalizePerformanceData },
      { path: ':id/activity', handler: this.normalizeActivityAndAverageData },
      {
        path: ':id/average-sessions',
        handler: this.normalizeActivityAndAverageData,
      },
    ];
  }

  async get(endpoint) {
    if (this.isMockedData) {
      console.log('mocked data');
      const response = await fetch(`${BASE_MOCKED_URL}/${endpoint}`);
      const data = await this.handleResponse(response);
      return data;
    } else {
      console.log('api data');
      const response = await fetch(`${BASE_URL}${endpoint}`);
      const data = await this.handleResponse(response);
      return this.normalizeData(data, endpoint);
    }
  }

  async handleResponse(response) {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }

  normalizeData(data, endpoint) {
    const route = this.matchRoute(endpoint);
    return route ? route.handler(data) : data.data;
  }

  matchRoute(endpoint) {
    for (const route of this.routes) {
      const regex = this.routeToRegex(route.path);
      console.log(regex);
      if (regex.test(endpoint)) {
        return route;
      }
    }
    return null;
  }

  routeToRegex(route) {
    return new RegExp(route.replace(/:id/, '[0-9]+') + '$');
  }

  normalizeUserData(data) {
    return {
      id: data.data.id,
      userInfos: data.data.userInfos,
      score: data.data.todayScore ?? data.data.score,
      keyData: data.data.keyData,
    };
  }

  normalizePerformanceData(data) {
    return {
      id: data.data.userId,
      kind: data.data.kind,
      data: data.data.data,
    };
  }

  normalizeActivityAndAverageData(data) {
    return {
      id: data.data.userId,
      sessions: data.data.sessions,
    };
  }
}

const apiService = new Api();
export default apiService;
