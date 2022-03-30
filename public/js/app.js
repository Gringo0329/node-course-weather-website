console.log("Client side javascript file loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

messageOne.textContent = "Waiting for input...";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "Loading result...";
  messageTwo.textContent = "";

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          messageTwo = "";
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecastData;
        }
      });
    }
  );
});
