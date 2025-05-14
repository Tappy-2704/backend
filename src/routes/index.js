const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes");
const topicRoutes = require("./topicRoutes");
const categoryRoutes = require("./categoryRoutes");
const articleRoutes = require("./articleRoutes");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/topics",
    route: topicRoutes,
  },
  {
    path: "/categories",
    route: categoryRoutes,
  },
  {
    path: "/articles",
    route: articleRoutes,
  },
];
defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
