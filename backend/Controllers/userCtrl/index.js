const { upload } = require("../../Config/cloudinaryStore");
const checkIsLogin = require("../../Middlewares/Auth/checkIsLogin");
const checkIsNotLogin = require("../../Middlewares/Auth/checkIsNotLogin");
const checkUserExist = require("../../Middlewares/Auth/checkUserExist");
const dualFactorAuthCtrl = require("./Main/dualFactorAuthCtrl");
const enableDualFactorAuthCtrl = require("./Main/enableDualFactorAuthCtrl");
const loginCtrl = require("./Main/loginCtrl");
const logoutCtrl = require("./Main/logoutCtrl");
const notificationSubscribeCtrl = require("./Main/notificationSubscribeCtrl");
const profileCtrl = require("./Main/profileCtrl");
const registerCtrl = require("./Main/registerCtrl");
const resetPasswordCtrl = require("./Main/resetPasswordCtrl");
const updateAvatarCtrl = require("./Main/updateAvatarCtrl");
const updateEmailCtrl = require("./Main/updateEmailCtrl");
const updatePasswordCtrl = require("./Main/updatePasswordCtrl");
const updateUserInfoCtrl = require("./Main/updateUserInfoCtrl");
const uploadAvatarCtrl = require("./Main/uploadAvatarCtrl");
module.exports = [
  {
    url: "/register",
    method: "post",
    action: registerCtrl, 
    mid: [checkIsNotLogin, checkUserExist],
  },
  {
    url: "/reset-password",
    method: "post",
    action: resetPasswordCtrl,
    mid: [checkIsNotLogin],
  },

  {
    url: "/enable-dfa",
    method: "post",
    action: enableDualFactorAuthCtrl,
    mid: [checkIsLogin],
  },

  {
    url: "/dfa",
    method: "post",
    action: dualFactorAuthCtrl,
    mid: [checkIsNotLogin],
  },
  { url: "/login", method: "post", action: loginCtrl, mid:[checkIsNotLogin] },
  { url: "/logout", method: "get", action: logoutCtrl, mid: [checkIsLogin] },
  {
    url: "/update",
    method: "put",
    action: updateUserInfoCtrl,
    mid: [checkIsLogin],
  },
  {
    url: "/subscribe",
    method: "post",
    action: notificationSubscribeCtrl,
    mid: [checkIsLogin],
  },
  {
    url: "/update-password",
    method: "put",
    action: updatePasswordCtrl,
    mid: [checkIsLogin],
  },
  {
    url: "/update-email",
    method: "put",
    action: updateEmailCtrl,
    mid: [checkIsLogin, checkUserExist],
  },
  {
    url: "/upload-avatar",
    method: "post",
    action: uploadAvatarCtrl,
    mid: [checkIsLogin, upload.single("avatar")],
  }, 
  {
    url: "/update-avatar",
    method: "put",
    action: updateAvatarCtrl,
    mid: [checkIsLogin, upload.single("avatar")],
  },
  {
    url: "",
    method: "get",
    action: profileCtrl,
    mid: [checkIsLogin],
  },
];
