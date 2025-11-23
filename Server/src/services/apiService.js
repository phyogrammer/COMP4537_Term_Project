import UserModel from "../models/userModel.js";
import ApiStats from "../models/apiModel.js";

// Each user recieves 20 API calls for free, after that the server tells the
// client app that this user maxed his/her fre API calls and the client displays
// an appropriate warning to user but continues providing service
export default class APIService {
  // generates a base-36 string that contains 30 characters within A-Z and 0-9
  generateApiKey() {
    return [...Array(30)]
      .map((e) => ((Math.random() * 36) | 0).toString(36))
      .join("");
  }

  async decrementApiCallsNum(userId) {
    const user = UserModel.findByIdAndUpdate(userId, {
      $inc: { numOfApiCallsLeft: -1 },
    });

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  }

  // Track API requests for statistics
  async apiRequestsTracker(apiEndpoint) {
    const apiStat = await ApiStats.findOne({ endpoint: apiEndpoint });

    if (apiStat) {
      apiStat.requests += 1;
      await apiStat.save();
    }
  }
}
