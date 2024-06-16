import { Router } from "zac-api";

new Router({
  path: "/user",
  method: "get",
  execute(req, res) {
    req.body;
  },
});
