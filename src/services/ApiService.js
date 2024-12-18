const BASE_URL = '../data/mock';

class Api {
  async get(endpoint) {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    return this.handleResponse(response);
  }

  async handleResponse(response) {
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  }
}

const apiService = new Api();
export default apiService;
