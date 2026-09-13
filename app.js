const products=[
{id:1,name:"Strawberry Dream",category:"Gelato",price:7.5,emoji:"🍓",desc:"Creamy strawberry gelato with real fruit."},
{id:2,name:"Pistachio",category:"Gelato",price:7.5,emoji:"💚",desc:"Smooth, nutty and small-batch."},
{id:3,name:"Vanilla Bean",category:"Gelato",price:7.5,emoji:"🍦",desc:"Classic vanilla with fragrant bean specks."},
{id:4,name:"Dark Chocolate",category:"Gelato",price:7.5,emoji:"🍫",desc:"Rich cocoa with a deep chocolate finish."},
{id:5,name:"Original Granola",category:"Granola",price:12,emoji:"🥣",desc:"Crunchy house granola, lightly sweetened."},
{id:6,name:"Berry Granola",category:"Granola",price:14,emoji:"🫐",desc:"House granola with berry pieces."},
{id:7,name:"Iced Latte",category:"Drinks",price:6.5,emoji:"☕",desc:"Smooth espresso with chilled milk."},
{id:8,name:"Strawberry Milk",category:"Drinks",price:6,emoji:"🥛",desc:"Fresh strawberry milk, lightly sweet."},
{id:9,name:"Sparkling Peach",category:"Drinks",price:5.5,emoji:"🍑",desc:"Refreshing peach sparkling drink."}
];
const state={category:"Gelato",cart:JSON.parse(localStorage.getItem("sucreWhiskCart")||"{}")};
const byId=id=>document.getElementById(id);const money=v=>`$${v.toFixed(2)}`;
function saveCart(){localStorage.setItem("sucreWhiskCart",JSON.stringify(state.cart))}
function totalQty(){return Object.values(state.cart).reduce((s,q)=>s+q,0)}
function subtotal(){return Object.entries(state.cart).reduce((s,[id,q])=>{const p=products.find(x=>x.id===Number(id));return s+(p?p.price*q:0)},0)}
function renderTabs(){const cats=["Gelato","Granola","Drinks"];byId("categoryTabs").innerHTML=cats.map(c=>`<button class="tab ${state.category===c?"active":""}" onclick="setCategory('${c}')">${c}</button>`).join("")}
window.setCategory=c=>{state.category=c;renderTabs();renderProducts()};
function renderProducts(){const visible=products.filter(p=>p.category===state.category);byId("productGrid").innerHTML=visible.map(p=>`<article class="product-card"><div class="product-art">${p.emoji}</div><h4>${p.name}</h4><p>${p.desc}</p><div class="product-footer"><span class="price">${money(p.price)}</span><button class="add-button" onclick="addToCart(${p.id})">+ Add</button></div></article>`).join("")}
window.addToCart=id=>{state.cart[id]=(state.cart[id]||0)+1;saveCart();updateCartCount()};
function updateCartCount(){byId("cartCount").textContent=totalQty()}
function showView(id){["shopView","cartView","successView"].forEach(v=>byId(v).classList.add("hidden"));byId(id).classList.remove("hidden");window.scrollTo({top:0,behavior:"smooth"})}
function renderCart(){const entries=Object.entries(state.cart).filter(([,q])=>q>0);if(!entries.length){byId("cartItems").innerHTML='<div class="empty">Your cart is empty. Add a little sweetness first ♡</div>'}else{byId("cartItems").innerHTML=entries.map(([id,q])=>{const p=products.find(x=>x.id===Number(id));return `<div class="cart-item"><div class="cart-thumb">${p.emoji}</div><div><strong>${p.name}</strong><div class="price">${money(p.price)}</div><div class="qty"><button onclick="changeQty(${p.id},-1)">−</button><span>${q}</span><button onclick="changeQty(${p.id},1)">+</button><button class="remove-button" onclick="removeItem(${p.id})">Remove</button></div></div><strong>${money(p.price*q)}</strong></div>`}).join("")}renderTotals()}
window.changeQty=(id,d)=>{state.cart[id]=Math.max(0,(state.cart[id]||0)+d);if(state.cart[id]===0)delete state.cart[id];saveCart();updateCartCount();renderCart()};
window.removeItem=id=>{delete state.cart[id];saveCart();updateCartCount();renderCart()};
function renderTotals(){const sub=subtotal(),gst=sub*.09,total=sub+gst;byId("subtotal").textContent=money(sub);byId("gst").textContent=money(gst);byId("grandTotal").textContent=money(total)}
byId("cartButton").addEventListener("click",()=>{renderCart();showView("cartView")});
byId("backButton").addEventListener("click",()=>showView("shopView"));
byId("payButton").addEventListener("click",()=>{if(totalQty()===0){alert("Your cart is empty.");return}const name=byId("customerName").value.trim(),phone=byId("customerPhone").value.trim();if(!name||!phone){alert("Please enter your name and mobile number.");return}const sub=subtotal(),gst=sub*.09,total=sub+gst,date=byId("pickupDate").value,time=byId("pickupTime").value,orderNo=`SW${Date.now().toString().slice(-8)}`;byId("orderSummary").innerHTML=`<div><span>Order</span><strong>${orderNo}</strong></div><div><span>Name</span><strong>${name}</strong></div><div><span>Pickup</span><strong>${date} · ${time}</strong></div><div><span>Total paid</span><strong>${money(total)}</strong></div>`;state.cart={};saveCart();updateCartCount();showView("successView")});
byId("newOrderButton").addEventListener("click",()=>showView("shopView"));
renderTabs();renderProducts();updateCartCount();
