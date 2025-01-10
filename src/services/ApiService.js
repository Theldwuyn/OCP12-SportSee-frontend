import filterData from '../utils/filterData';

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
    this.mockedRoutes = [
      { path: 'user.json', handler: this.normalizeUserData },
      {
        path: 'userActivity.json',
        handler: this.normalizeActivityAndAverageData,
      },
      {
        path: 'userAverageSessions.json',
        handler: this.normalizeActivityAndAverageData,
      },
      { path: 'userPerformance.json', handler: this.normalizePerformanceData },
    ];
  }

  async get(endpoint) {
    console.log('api data');
    const response = await fetch(`${BASE_URL}${endpoint}`);
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

  async getMocked(endpoint, id) {
    const response = await fetch(`${BASE_MOCKED_URL}/${endpoint}`);
    const dataToNormalize = await this.handleMockedResponse(response, id);
    const data = { data: dataToNormalize };
    console.log('data', data);
    return this.normalizeMockedData(data, endpoint);
  }

  async handleMockedResponse(response, id) {
    if (!response.ok) {
      throw new Error(`Fetch Error: ${response.status} ${response.statusText}`);
    } else {
      const responseToFilter = await response.json();
      console.log('response', responseToFilter);
      const data = filterData(responseToFilter, id);
      return data;
    }
  }

  normalizeMockedData(data, endpoint) {
    const route = this.mockedRoutes.find((elem) => elem.path === endpoint);
    return route ? route.handler(data) : data.data;
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
