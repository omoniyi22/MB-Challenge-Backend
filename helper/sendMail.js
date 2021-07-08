const email_temp = require('email-templates')
const { Auth } = require('../middlewares/Auth')
const jwt = require('jsonwebtoken')
var xoauth2 = require("xoauth2"),
  xoauth2gen;
const nodemailer = require('nodemailer');
const {
  SITE_URL,
  EMAIL, PASSWORD,
  APP_SECRET,
  Client_ID,
  Client_secret
} = require("./../config")



module.exports.Mail = {
  async resetPassword(user, req, res) {
    const { email } = req.body;
    const token = Auth.generateToken(user);
  },

  async verifySigup(req, res) {
    const { email } = req.body;
    xoauth2gen = xoauth2.createXOAuth2Generator({
      user: "omoniyioluwaseun@gmail.com",
      service: 'gmail',
      scope: 'https://mail.google.com/',
      privateKey: "Kz3QDOIj8g9QkxiofdSRuSzo"
    });
    xoauth2gen.getToken(function (err, token) {
      if (err) {
        return console.log(err);
      }
      console.log("AUTH XOAUTH2 " + token);
    });

    const token = await Auth.generateToken(req.body);
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: EMAIL,
        pass: PASSWORD,
        type: 'OAuth2',
        clientId: Client_ID,
        clientSecret: Client_secret,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    let mailOptions = {
      from: "Benny Tech",
      to: email,
      subject: "Email Verification",
    }

    transporter.sendMail(mailOptions)
      .then((resp) => {
        return res.status(200).json({
          msg: 'Please check your mail for the reset link!',
          resp
        });
      }).catch(err => {
        if (err) {
          console.log(err)
          return res.status(501).json({
            msg: 'Failure delivery'
          });
        }
      })
  }
}