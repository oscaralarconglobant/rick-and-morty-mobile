import axios, {AxiosResponse} from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character';

export class API {
  static async getCharacters(
    page: number = 1,
    nameFilter?: string,
  ): Promise<AxiosResponse<any>> {
    const params = {
      page,
      name: nameFilter,
    };

    const response = await axios.get(API_URL, {params});
    return response;
  }

  static async getCharacter(id: number): Promise<AxiosResponse<any>> {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  }
}
