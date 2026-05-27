

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const response = await fetch("/login", {
    method: "POST",
    body: new URLSearchParams(formData)
  });

  const result = await response.json();
  const msg = document.getElementById("msg");

  if (result.status === "success") {

    if (result.attackDetected) {
      localStorage.setItem("attack", "true");
      localStorage.setItem("user", result.user);
      msg.style.color = "orange";
      msg.innerHTML =
        `⚠ Welcome <b>${result.user}</b><br>Suspicious SQL Injection Detected`;
    } else {
      localStorage.setItem("attack", "false");
      localStorage.setItem("user", result.user);
      msg.style.color = "#00ffcc";
      msg.innerHTML = `Welcome <b>${result.user}</b>`;
    }

    setTimeout(() => {
      window.location.href = "/home.html";
    }, 2000);

  } else {
   
    msg.style.color = "red";
    msg.innerHTML = "Invalid username or password";
  }
});



const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "010101010101010101";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 50);
