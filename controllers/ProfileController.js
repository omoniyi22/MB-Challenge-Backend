const { Profile, profile } = require("./../models/profile");
const {
  registerValidator,
  loginValidator,
  profileValidator,
} = require("./../validator/profile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("./../config/index");
const { Auth } = require("./../middlewares/Auth");

const ProfileController = {
  async retrieveAllUsers(req, res) {
    try {
      const allProfile = await Profile.find();
      await res.status(200).json({
        msg: "Fetched successfully",
        data: allProfile,
      });
    } catch (error) {
      res.status(400).json({
        msg: error,
      });
    }
  },

  async signUp(req, res) {
    const { error } = registerValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else {
      const emailExist = await Profile.findOne({ email: req.body.email });
      if (emailExist)
        return res.status(400).json({ msg: "Email already exists" });
      else
        try {
          let { email, password, phone } = req.body;
          let verifiedData = { email, password, phone };

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          let start_auth = {
            ...verifiedData,
            full_name: req.body.full_name,
            password: hashedPassword,
          };
          let newProfile = new Profile(start_auth);
          let savedProfile = await newProfile.save();
          let { full_name } = savedProfile;

          let token = await Auth.generateToken(savedProfile);
          res.header("benny-token", token).json({
            msg: `Welcome ${full_name}, you have signed up succesfully`,
            token,
            data: newProfile,
          });
        } catch (error) {
          console.log({ error });
          res.status(401).send({
            msg: "An error occured",
            err: error,
          });
        }
    }
  },

  async login(req, res) {
    const { error } = loginValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else {
      let user = (use = await Profile.findOne({ email: req.body.email }));
      let userProfile = await Profile.findOne({ email: req.body.email });
      if (!user) res.status(400).json({ msg: "Email address not found" });
      else {
        user = await bcrypt.compare(req.body.password, user.password);
        if (!user) return res.status(400).json({ msg: "Incorrect password" });
        try {
          let token = await Auth.generateToken(user);
          res.header("benny-token", token).json({ token, user: userProfile });
        } catch (error) {
          res.send(400).json({ msg: "" });
        }
      }
    }
  },

  async UpdateProfile(req, res) {
    let { income, payment_duration, rent_amount, accommodation_status } =
      await req.body;
    let { error } = profileValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else
      try {
        let user_profile = await Profile.findById(req.params.id);

        user_profile.income =
          (await income) !== null ? income : user_profile.income || 0;
        user_profile.payment_duration =
          (await payment_duration) !== null
            ? payment_duration
            : user_profile.payment_duration || 0;

        user_profile.rent_amount =
          (await rent_amount) !== null
            ? rent_amount
            : user_profile.rent_amount || 0;

        user_profile.accommodation_status =
          (await accommodation_status) !== null
            ? accommodation_status
            : user_profile.accommodation_status || 0;

        let data = await user_profile.save();
        res.status(200).json({
          msg: "Successfully registered, we will get back to you",
          data,
        });
      } catch (error) {
        console.log(error);
        res.status(400).send({
          msg: "An error occured",
          err: error,
        });
      }
  },
};

module.exports = ProfileController;
