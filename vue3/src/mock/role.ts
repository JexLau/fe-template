import { MockMethod, Recordable } from "vite-plugin-mock";
export default [
  {
    url: "/api/getRoleById",
    method: "get",
    response: ({ query }: Recordable<{ id: number }>) => {
      return {
        code: 0,
        message: "ok",
        data: {
          roleName: "admin",
          roleValue: "admin",
        },
      };
    },
  },
  {
    url: "/api/testRestful/:id",
    method: "get",
    response: ({ query }: Recordable<{ id: number }>) => {
      return {
        code: 0,
        message: "ok",
        data: {
          roleName: "admin",
          roleValue: "admin",
        },
      };
    },
  },
  {
    url: "/api/testRestful/:id",
    method: "post",
    response: ({ query, body }: Recordable) => {
      return {
        code: 0,
        message: "ok",
        data: {
          roleName: "admin",
          roleValue: "admin",
        },
      };
    },
  },
] as MockMethod[];
