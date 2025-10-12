import api from "@/lib/axios.service";

export const topicsAPI = {
  getAllTopics: async () => {
    const response = await api.get('/topics');
    return response.data;
  },

  getTopic: async (id:string) => {
    const response = await api.get(`/topics/${id}`);
    return response.data;
  },

  toggleSubTopic: async (subTopicId:string) => {
    const response = await api.post(`/topics/subtopics/${subTopicId}/complete`);
    return response.data;
  },

  getUserProgress: async () => {
    const response = await api.get('/topics/progress');
    return response.data;
  }
};