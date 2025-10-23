import axios from "axios";

const clientV1 = axios.create({
  baseURL: "https://api.instatus.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.INSTATUS_API_KEY}`,
    "Content-Type": "application/json",
  },
});

const clientV2 = axios.create({
  baseURL: "https://api.instatus.com/v2",
  headers: {
    Authorization: `Bearer ${process.env.INSTATUS_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export { clientV1, clientV2 };
