const BASE_URL = 'http://localhost:3000/user/';

class Api {
  constructor() {
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

  // /**
  //  * This function normalize data by changing properties name to ensure the same
  //  * format for each query.
  //  * As the queryID will change, we have to use a regex like [0-9]+{apiEndpoint}
  //  * where [0-9]+ will match the user id.
  //  * @param {object} data
  //  * @param {string} endpoint
  //  * @returns {object}
  //  */
  // normalizeData(data, endpoint) {
  //   switch (true) {
  //     case /[0-9]+$/gm.test(endpoint):
  //       return {
  //         id: data.data.id,
  //         userInfos: data.data.userInfos,
  //         score: data.data.todayScore ?? data.data.score,
  //         keyData: data.data.keyData,
  //       };
  //     case /[0-9]+\/performance$/gm.test(endpoint):
  //       console.log(data);
  //       return {
  //         id: data.data.userId,
  //         kind: data.data.kind,
  //         data: data.data.data,
  //       };
  //     // acitivity and average-sessions data share the same properties name
  //     case /[0-9]+\/(activity$|average-sessions$)/gm.test(endpoint):
  //       return {
  //         id: data.data.userId,
  //         sessions: data.data.sessions,
  //       };
  //     default:
  //       return data.data;
  //   }
  // }
}

const apiService = new Api();
export default apiService;
