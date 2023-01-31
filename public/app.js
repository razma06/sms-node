const form = document.getElementById("form");
const senderName = document.getElementById("senderName");
const phoneNumber = document.getElementById("phoneNumber");
const message = document.getElementById("message");

form.onsubmit = function (e) {
    const data = {
        senderName: senderName.value,
        phoneNumber: phoneNumber.value,
        message: message.value,
    };
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }).then((res) => {
        console.log(res);
    });
    e.preventDefault();
};
