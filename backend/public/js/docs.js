"use strict";


function render(container, html) {
  container.insertAdjacentHTML("beforeend", html);
}
const modelsElement = document.querySelector(".models");

const featuresElement = document.querySelector(".features");

const routesElement = document.querySelector(".routes");

// for the features
const features = [
  "Account CRUD operations",
  "Debt CRUD operations",
  "Reminder CRUD operations",
  "Mail sending",
  "Push notification",
];

// render(featuresElement, orderedList)
const ol = document.querySelector(".feature-list");
features.forEach((elem) => {
  const html = `<li> ${elem} </li>`;
  render(ol, html);
});

// Models
const models = [
  {
    name: "User",
    params: [
      { name: "fullname", type: "String" },
      { name: "email", type: "String" },
      { name: "gender", type: "String", enums: "male, female" },
      { name: "notificationSubscriptions", type: "Array" },
      { name: "isActive", type: "Boolean" },
      { name: "Reminders", type: "Array" },
      { name: "Debts", type: "Array" },
      {
        name: "dual_factor_auth",
        type: "Object",
        content: [
          { name: "state", type: "Boolean" },
          { name: "passcode", type: "Number" },
        ],
      },
      { name: "contact", type: "Number" },
      { name: "location", type: "String" },
      { name: "password", type: "String" },
      {
        name: "totalDebtCount",
        type: "Object",
        content: [
          { name: "to_be_paid", type: "Number" },
          { name: "to_be_collected", type: "Number" },
        ],
      },
      {
        name: "totalPaidDebtt",
        type: "Object",
        content: [
          { name: "amount", type: "Number" },
          { name: "count", type: "Number" },
        ],
      },
      {
        name: "totalDebtAmount",
        type: "Object",
        content: [
          { name: "to_be_paid", type: "Number" },
          { name: "to_be_collected", type: "Number" },
        ],
      },
      {
        name: "avatar",
        type: "Object",
        content: [
          { name: "url", type: "String" },
          { name: "public_id", type: "String" },
        ],
      },
    ],
  },
  {
    name: "Debt",
    params: [
      { name: "title", type: "String" },
      { name: "amount", type: "Number" },
      { name: "incuredDate", type: "Date" },
      { name: "deadline", type: "Date" },
      { name: "paid", type: "Boolean" },
      {
        name: "category",
        type: "String",
        enums: "to_be_collected, to_be_paid",
      },
      { name: "debtInfo", type: "String" },
      { name: "isUpdated", type: "Boolean" },
      {
        name: "debtorInfo",
        type: "Object",
        content: [
          { name: "name", type: "String" },
          { name: "location", type: "String" },
          { name: "contact", type: "Number" },
        ],
      },
      {
        name: "creditorInfo",
        type: "Object",
        content: [
          { name: "name", type: "String" },
          { name: "location", type: "String" },
          { name: "contact", type: "Number" },
        ],
      },
    ],
  },
  {
    name: "Reminder",
    params: [
      { name: "title", type: "String" },
      { name: "note", type: "String" },
      { name: "dueDate", type: "Date" },
      { name: "repeat", type: "Boolean" },
      { name: "isUpdated", type: "Boolean" },
      {
        name: "repetitionInterval",
        type: "String",
        enums: "daily, weekly, monthly",
      },
    ],
  },
];

models.forEach((elem, index) => {
  const html = `
    <div class="model">
    
    <h5> ${elem.name} </h5>

    <ul>${elem.params
      .map(
        (item) => `
        <article class="each-model-list">
    <li>Parameter: ${item.name} </li>
    <li> Type: ${item.type} ${item.enums ? `(${item.enums})` : " "} ${
          item.content
            ? `<ul class="list-pikin">
    ${item.content
      .map(
        (content) =>
          `<li> Parameter: ${content.name} </li> <li > Type: ${content.type} ${
            item.enums ? `(${item.enums})` : " "
          } </li>`
      )
      .join("")}</ul>`
            : " "
        } </li>
        </article>
`
      )
      .join("")}
    </ul>
   

    </div>
    `;
  render(modelsElement, html);
});

// Routes
// user routes
const userRoutes = [
  {
    url: "/user/register",
    method: "post",
    request: "fullname, email, password, gender",
    response: "return the user object",
    sect: "User",
  },
  {
    url: "/user/login",
    method: "post",
    request: "password , email",
    response:
      "user object if DFA is not enabled but if it is enabled, you are gonna receive an OTP on your mail",
    sect: "User",
  },
  {
    url: "/user/logout",
    method: "get",
    request: "",
    response: "logged out ...",
    sect: "User",
  },
  {
    url: "/user/enable-dfa",
    method: "post",
    request: "state(Boolean)",
    response: "returns the state of the dfa",
    sect: "User",
  },
  {
    url: "/user/dfa",
    method: "post",
    request: "passcode",
    response: "returns the user",
    sect: "User",
  },

  {
    url: "/user/reset-password",
    method: "post",
    request: "email",
    response:
      "Your new password has been sent to the provided email, if email not delivered click on the reset button again",
    sect: "User",
  },
  {
    url: "/user",
    method: "get",
    request: "",
    response: "return the user object (profile)",
    sect: "User",
  },
  {
    url: "/user/subscribe",
    method: "post",
    request: "subscription",
    response: "body and title is sent back to be handled by the service worker",
    sect: "User",
  },
  {
    url: "/user/update",
    method: "put",
    request: "any of the user properties except the password, avatar and email",
    response: "returns the new user object",
    sect: "User",
  },
  {
    url: "/user/update-password",
    method: "put",
    request: "oldPassword, newPassword",
    response: "password updated if no error",
    sect: "User",
  },
  {
    url: "/user/update-email",
    method: "put",
    request: "email",
    response: "returns the updated user",
    sect: "User",
  },
  {
    url: "/user/upload-avatar",
    method: "post",
    request:
      "image with the name of file with file size less than 1.5mb and can only be jpg, png,jpeg",
    response: "returns the updated user",
    sect: "User",
  },
  {
    url: "/user/update-avatar",
    method: "put",
    request:
      "image with the name of file with file size less than 1.5mb and can only be jpg, png,jpeg",
    response: "returns the updated user",
    sect: "User",
  },
];

// debt routes
 const debtRoutes = [
   {
     url: "/debt/create",
     method: "post",
     request: "all debt properties",
     response: "return the debt object and set a cron job",
     sect: "Debt",
   },
   {
     url: "/debt/update/:id",
     method: "put",
     request: "any debt properties",
     response: "return the debt object and set a cron job",
     sect: "Debt",
   },
   {
     url: "/debt/delete/:id",
     method: "delete",
     request: "",
     response: "debt deleted",
     sect: "Debt",
   },
   {
     url: "/debt/fetch-all",
     method: "get",
     request: "",
     response: "return all the debt object",
     sect: "Debt",
   },
   {
     url: "/debt/:id",
     method: "get",
     request: "",
     response: "return the debt object",
     sect: "Debt",
   },
];
 
// reminder routes
const reminderRoutes = [
  {
    url: "/reminder/create",
    method: "post",
    request: "title, dueDate, repeat, repetitionInterval, note",
    response: "return the reminder object and set a cron job",
    sect: "Reminder",
  },
  {
    url: "/reminder/update/:id",
    method: "put",
    request: "any reminder properties",
    response: "return the reminder object and set a cron job",
    sect: "Reminder",
  },
  {
    url: "/reminder/delete/:id",
    method: "delete",
    request: "",
    response: "reminder deleted",
    sect: "Reminder",
  },
  {
    url: "/reminder/fetch-all",
    method: "get",
    request: "",
    response: "return all the reminder object",
    sect: "Reminder",
  },
  {
    url: "/reminder/:id",
    method: "get",
    request: "",
    response: "return the reminder object",
    sect: "Reminder",
  },
];


const routes = [...userRoutes, ...reminderRoutes, ...debtRoutes];
const sect = ["User", "Debt", "Reminder"];
sect.forEach((elem) => {
  const html = `<section class="sections ${elem}">
            <h5> ${elem} </h5> 
         </section>
            `;
  render(routesElement, html);
});
routes.forEach((elem) => {
  const html = `
    <article class="route">
    <ul>
    <li>Url: ${elem.url} </li>
    <li>Method: ${elem.method} </li>
    <li>Request: ${elem.request} </li>
    <li>Response: ${elem.response} </li>
    </ul>

    </article>
    `;
  const house = document.querySelector(`.${elem.sect}`);
  render(house, html);
});
