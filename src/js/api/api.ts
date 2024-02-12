import axios from "axios";

const token =
  "8faaf335a1c7a71788191f54a932ae036c598c9948a509cc09b204f0261f3bcf1c11151634e807fdf9ceb9fb991057b8118a54fdb18b6f0bf3b5399a7c16e4ab54a97a1c93eb39c7a473f248af6fb531a505b751fd0a07f175893756243c594e3a44b2865f4eb8228d7a9df9f0f83422e9108c50f519a788bef585b855e97634";

const instance = axios.create({
  baseURL: "http://localhost:1337/api", // ваш базовый URL API
  timeout: 10000, // время ожидания запроса в миллисекундах
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    // Добавьте любые другие заголовки, которые вам нужны
  },
});

export const api = {
  async fetchData(): Promise<any> {
    try {
      const response = await instance.get("/data");
      return response.data;
    } catch (error) {
      // throw new Error(error);
      console.error(error);
    }
  },

  async createEvent(data: any): Promise<any> {
    try {
      const response = await instance.post("/event", data);
      return response.data;
    } catch (error) {
      // throw new Error(error);
      console.error(error);
    }
  },

  async getEventList(): Promise<any> {
    try {
      const response = await instance.get("/events");

      return response.data.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));
    } catch (error) {
      // throw new Error(error);
      console.error(error);
    }
  },

  // Добавьте другие запросы по мере необходимости
};
