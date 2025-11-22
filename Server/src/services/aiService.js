import axios from "axios";

export default class AIService {
  constructor(aiEndpoint) {
    this.aiEndpoint = aiEndpoint;
  }

  async sendDataToAi(userData) {
    try {
      const decodedData = decodeURIComponent(userData);

      const response = await axios.post(this.aiEndpoint, {
        text: `${decodedData}`
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      return response.data;
    } catch (error) {
      console.error("Error communicating with AI service:", error.message);
      throw new Error("Failed to communicate with AI service");
    }
  }
}
