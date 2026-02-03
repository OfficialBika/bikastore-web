const API_BASE = "https://bikastore-api.onrender.com";

// Game change → show / hide fields
document.getElementById("game").addEventListener("change", () => {
  const game = document.getElementById("game").value;

  document.getElementById("mlbbId").style.display = game === "MLBB" ? "block" : "none";
  document.getElementById("mlbbServerId").style.display = game === "MLBB" ? "block" : "none";
  document.getElementById("pubgId").style.display = game === "PUBG" ? "block" : "none";
});

// Submit order
document.getElementById("orderForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const game = document.getElementById("game").value;

  const payload = {
    userId: Date.now(), // temp user id
    username: "web_user",
    game: game,
    mlbbId: game === "MLBB" ? document.getElementById("mlbbId").value : null,
    mlbbServerId: game === "MLBB" ? document.getElementById("mlbbServerId").value : null,
    pubgId: game === "PUBG" ? document.getElementById("pubgId").value : null,
    packageName: document.getElementById("package").value,
    price: Number(document.getElementById("price").value),
  };

  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Order တင်ပြီးပါပြီ! Telegram Bot ထဲသွားပါ");
      window.location.href = "https://t.me/BikaStoreBot";
    } else {
      alert("❌ Order မအောင်မြင်ပါ");
    }
  } catch (err) {
    alert("❌ API ချိတ်ဆက်မရပါ");
    console.error(err);
  }
document.getElementById("slipForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const orderId = document.getElementById("orderId").value;
  const slip = document.getElementById("slip").files[0];

  const formData = new FormData();
  formData.append("orderId", orderId);
  formData.append("slip", slip);

  try {
    const res = await fetch(`${API_BASE}/api/payments/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Slip ပို့ပြီးပါပြီ! Admin confirm စောင့်ပါ");
      window.location.href = "https://t.me/BikaStoreBot";
    } else {
      alert("❌ Slip upload မအောင်မြင်ပါ");
    }
  } catch (err) {
    alert("❌ Server error");
    console.error(err);
  }
});
