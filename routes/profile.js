const ProfileController = require("./../controllers/ProfileController");
const { Auth } = require("./../middlewares/Auth");

const ProfileRoutes = async (router) => {
  await router
    .route("/profiles")
    .get(Auth.verifyToken, ProfileController.retrieveAllUsers);

  await router.route("/profile/signUp").post(ProfileController.signUp);

  await router.route("/profile/login").post(ProfileController.login);

  await router
    .route("/profile/updateProfile/:id")
    .patch(ProfileController.UpdateProfile);

  // await router.route('/profile/updateProfile')
  //   .patch(Auth.verifyToken, ProfileController.updateProfile);
};

module.exports = ProfileRoutes;
