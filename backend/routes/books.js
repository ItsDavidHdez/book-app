const { Router, request } = require("express");
const router = Router();

router.get("/api/books", (request, response) =>
  response.json({ text: "Hello World" })
);

module.exports = router;
