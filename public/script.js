const API_BASE = "https://bikastore-api.onrender.com";

const gameSelect = document.getElementById("game");
const mlbbFields = document.getElementById("mlbbFields");
const pubgFields = document.getElementById("pubgFields");

gameSelect.addEventListener("change", () => {
  if (gameSelect.value === "MLBB") {
    mlbbFields.style.display = "block";
    pubgFields.style.display = "none";
  } else {
    mlbbFields.style.display = "none";
    pubgFields.style.display = "block";
  }
});

// ORDER
document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    userId: Date.now(),
    username: "web_user",
    game: gameSelect.value,
    mlbbId: document.getElementById("mlbbId").value,
    mlbbServerId: document.getElementById("mlbbServerId").value,
    pubgId: document.getElementById("pubgId").value,
    packageName: document.getElementById("package").value,
    price: Number(document.getElementById("price").value),
  };

  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  alert(data.success ? "✅ Order Success! Bot ထဲသွားပါ" : "❌ Order Failed");
});

// SLIP
document.getElementById("slipForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("orderId", document.getElementById("orderId").value);
  formData.append("slip", document.getElementById("slip").files[0]);

  const res = await fetch(`${API_BASE}/api/payments/upload`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  alert(data.success ? "📸 Slip Uploaded!" : "❌ Upload Failed");
});
