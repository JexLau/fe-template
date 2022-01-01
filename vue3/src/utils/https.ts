import { RequestExtraOptions } from "@/typings/request";
import HttpClient, { HttpClientConfig } from "axios-mapper";

const https = (options?: RequestExtraOptions) => {
  const notAuth = options?.notAuth || false
  const config: HttpClientConfig = {
    headers: {
      Authorization: notAuth ? "" : "token",
    },
  };
  return new HttpClient(config);
};

export default https;
