const gameSelect = document.getElementById("game");
const mlbbFields = document.getElementById("mlbbFields");
const pubgFields = document.getElementById("pubgFields");
const form = document.getElementById("orderForm");
const result = document.getElementById("result");

gameSelect.addEventListener("change", () => {
  mlbbFields.classList.add("hidden");
  pubgFields.classList.add("hidden");

  if (gameSelect.value === "MLBB") mlbbFields.classList.remove("hidden");
  if (gameSelect.value === "PUBG") pubgFields.classList.remove("hidden");
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    game: gameSelect.value,
    mlbbId: document.getElementById("mlbbId").value,
    mlbbServerId: document.getElementById("mlbbServerId").value,
    pubgId: document.getElementById("pubgId").value,
    packageName: document.getElementById("packageName").value,
    price: Number(document.getElementById("price").value),
  };

  const res = await fetch("https://bikastore-api.onrender.com/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (data.success) {
    result.classList.remove("hidden");
    result.innerHTML = `
      ✅ Order Created Successfully!<br/><br/>
      👉 Continue in Telegram:<br/>
      <a href="https://t.me/BikaStoreBot" target="_blank">Open @BikaStoreBot</a>
    `;
    form.reset();
  } else {
    alert("Order failed");
  }
});
