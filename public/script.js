const API = "https://bikastore-api.onrender.com";

const PRICES = {
  MLBB: {
    "11":800,"22":1600,"33":2350,"55":3600,"86":4800,"112":8200,
    "172":9800,"257":14500,"343":20000,"429":25000,"514":29900,
    "600":34500,"706":39900,"792":44500,"878":48500,"963":53000,
    "1049":59900,"1135":63500,"1412":77000,"1584":88000,"1669":94000,
    "2195":118900,"3158":172000,"3688":202000,"4390":237000,
    "5100":280000,"5532":300000,"6055":330000,
    "wp1":5900,"wp2":11800,"wp3":17700,"wp4":23600,"wp5":29500,
    "web":3500,"meb":16500
  },
  PUBG: {
    "60":4500,"325":19500,"660":38000,"1800":90500,
    "3850":185000,"8100":363000,
    "Prime1m":4500,"Primeplus":39500
  }
};

const gameSel = document.getElementById("game");
const pkgSel = document.getElementById("package");
const priceInp = document.getElementById("price");
const mlbb = document.getElementById("mlbbFields");
const pubg = document.getElementById("pubgFields");

let cart = [];
let orderId = Math.floor(1000 + Math.random() * 9000);
document.getElementById("orderId").value = orderId;

function init() {
  gameSel.innerHTML = `<option>MLBB</option><option>PUBG</option>`;
  loadPackages();
}
init();

gameSel.onchange = () => {
  mlbb.style.display = gameSel.value === "MLBB" ? "block" : "none";
  pubg.style.display = gameSel.value === "PUBG" ? "block" : "none";
  loadPackages();
};

pkgSel.onchange = updatePrice;

function loadPackages() {
  pkgSel.innerHTML = "";
  Object.keys(PRICES[gameSel.value]).forEach(p=>{
    pkgSel.innerHTML += `<option value="${p}">${p}</option>`;
  });
  updatePrice();
}

function updatePrice() {
  priceInp.value = PRICES[gameSel.value][pkgSel.value];
}

function addOrder() {
  cart.push({
    game: gameSel.value,
    pkg: pkgSel.value,
    price: priceInp.value
  });
  render();
}

function render() {
  const box = document.getElementById("orders");
  let total = 0;
  box.innerHTML = "";
  cart.forEach(o=>{
    total += Number(o.price);
    box.innerHTML += `<div>${o.game} - ${o.pkg} = ${o.price} Ks</div>`;
  });
  document.getElementById("total").textContent = total;
}

async function submitOrder() {
  if (!cart.length) return alert("No orders");

  for (const o of cart) {
    await fetch(`${API}/api/orders`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        orderId,
        userId: Date.now(),
        username: "web_user",
        game: o.game,
        mlbbId: document.getElementById("mlbbId").value,
        mlbbServerId: document.getElementById("mlbbServer").value,
        pubgId: document.getElementById("pubgId").value,
        packageName: o.pkg,
        price: o.price
      })
    });
  }

  const file = document.getElementById("slip").files[0];
  if (!file) return alert("Upload slip");

  const form = new FormData();
  form.append("orderId", orderId);
  form.append("file", file);

  await fetch(`${API}/api/payments/upload`, {
    method: "POST",
    body: form
  });

  alert("✅ Order submitted! Telegram Bot ထဲစစ်ပါ");
  window.location.href = "https://t.me/BikaButtonBot";
}
