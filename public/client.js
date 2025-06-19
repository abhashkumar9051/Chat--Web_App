const socket = io();
let username, room;

function joinRoom() {
  username = document.getElementById("username").value;
  room = document.getElementById("room").value;

  if (!username || !room) return alert("Enter both name and room");

  socket.emit("join-room", { username, room });

  document.getElementById("login").style.display = "none";
  document.getElementById("chat").style.display = "block";
  document.getElementById("room-name").textContent = `Room: ${room}`;
}

const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", { room, msg: `${username}: ${input.value}` });
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});
