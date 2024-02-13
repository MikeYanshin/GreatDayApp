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
      throw new Error(error as any);
    }
  },

  async createEvent(params: any): Promise<any> {
    try {
      await instance.post(`/events`, params);
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async getEventById(id: string): Promise<any> {
    try {
      const response = await instance.get(`/events/${id}?populate=*`);

      return response.data.data.attributes;
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async deleteEventById(id: string): Promise<any> {
    try {
      await instance.delete(`/events/${id}`);
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async getEventList(): Promise<any> {
    try {
      const response = await instance.get("/events?populate=*");

      return response.data.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async updateRemind(id: number, params: any): Promise<any> {
    try {
      await instance.put(`/reminds/${id}`, params);
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async createRemind(params: any): Promise<any> {
    try {
      await instance.post(`/reminds`, params);
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async getRemindsList(params?: string): Promise<any> {
    try {
      const response = await instance.get(`/reminds${params}`);

      const reminds = response.data.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));
      const doneReminds = countDoneTasks(reminds);
      const todayReminds = countTasksWithTodayDate(reminds);

      return {
        reminds: {
          ...reminds,
        },
        doneReminds,
        todayReminds,
        total: response.data.meta.pagination.total - doneReminds,
      };
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async getRemindById(id: string): Promise<any> {
    try {
      const response = await instance.get(`/reminds/${id}`);

      return response.data.data.attributes;
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async deleteRemindById(id: string): Promise<any> {
    try {
      await instance.delete(`/reminds/${id}`);
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async getTagsList(): Promise<any> {
    try {
      const response = await instance.get("/tags");

      return response.data.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
      }));
    } catch (error) {
      throw new Error(error as any);
    }
  },

  async createTag(params: any): Promise<any> {
    try {
      const response = await instance.post("/tags", params);
      return {
        id: response.data.data.id,
        name: response.data.data.attributes.name,
      };
    } catch (error) {
      throw new Error(error as any);
    }
  },

  // Добавьте другие запросы по мере необходимости
};

function countDoneTasks(tasks: any) {
  let count = 0;
  tasks.forEach((task: any) => {
    if (task.done === true) {
      count++;
    }
  });
  return count;
}

function countTasksWithTodayDate(tasks: any) {
  const today = new Date().toISOString().slice(0, 10); // Получаем сегодняшнюю дату в формате 'YYYY-MM-DD'
  const doneTasksToday = tasks.filter(
    (task: any) => !task.done && task.date.slice(0, 10) === today
  );
  return doneTasksToday.length;
}
