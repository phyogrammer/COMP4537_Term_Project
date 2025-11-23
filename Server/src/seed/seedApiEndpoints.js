import mongoose from "mongoose";
import ApiStats from "../models/apiModel.js";

const apiEndpointsData = [
  { method: "POST", endpoint: "/api/users/register" },
  { method: "POST", endpoint: "/api/users/login" },
  { method: "POST", endpoint: "/api/users/logout" },
  { method: "GET", endpoint: "/api/users/apicallsleft" },
  { method: "PUT", endpoint: "/api/users/getnewapikey" },
  { method: "GET", endpoint: "/api/users/getapikey" },
  { method: "POST", endpoint: "/api/users/sqlinjcheck" },
  { method: "GET", endpoint: "/api/admin/getusersinfo" },
  { method: "DELETE", endpoint: "/api/admin/delete/:id" },
  { method: "GET", endpoint: "/api/admin/getapistats" },
];

export default async function seedApiEndpoints() {
  try {
    for (const apiEndpoint of apiEndpointsData) {
      const existingEndpoint = await ApiStats.findOne({
        method: apiEndpoint.method,
        endpoint: apiEndpoint.endpoint,
      });
      if (!existingEndpoint) {
        const newApiEndpoint = new ApiStats(apiEndpoint);
        await newApiEndpoint.save();
      }
    }
  } catch (error) {
    console.error("Error seeding API endpoints:", error);
  }
}
