const Twilio = require("twilio");
const http = require("http");
const express = require("express");
const path = require("path");

const id = "AC8e000f6abb9424633a7ea6722c262bdf";
const token = "bae84d440eef8db4a4a4e7ea71849310";

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
    res.render("index", { message: "Hello world" });
    res.end();
});

const twilio = new Twilio(id, token);

const textIsValid = (text) => {
    const numberOfWords = text.split(" ").length;
    if (numberOfWords < 3) {
        return false;
    }

    return true;
};

const phoneIsValid = (phone) => {
    const regex = /^\d{3}-\d{2}-\d{2}-\d{2}$/;
    return regex.test(phone);
};

const nameIsValid = (name) => {
    const regex = /^[a-zA-Z]+$/;
    return regex.test(name);
};

const throwBadRequest = (res, message) => {
    res.status(400);
    res.render("index", { message: message });
    res.end();
};

app.post("/", (req, res) => {
    const message = req.body;
    const name = message.senderName;
    const phone = message.phoneNumber;
    const text = message.message;

    if (!textIsValid(text)) {
        throwBadRequest(res, "message is not valid");
        return;
    }

    if (!phoneIsValid(phone)) {
        throwBadRequest(res, "phone is not valid");
        return;
    }

    if (!nameIsValid(name)) {
        throwBadRequest(res, "name is not valid");
        return;
    }

    res.write("message sent");
    twilio.messages
        .create({
            from: "+16623378459",
            to: "+995" + phone,
            body: text,
        })
        .then((res) => {
            res.render("index", { message: "message sent" });
            res.end();
        });
});

app.listen(3000);
