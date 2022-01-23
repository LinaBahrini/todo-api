const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/user/list", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.list);
  app.get("/api/user/profile/:userId", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.retrieve);
  app.get("/api/user/profile", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], controller.retrieve);
  app.delete('/api/user/', [authJwt.verifyToken], controller.destroy
  );
  app.delete('/api/user/:userId', [authJwt.verifyToken, authJwt.isAdmin], controller.destroy
  );
};