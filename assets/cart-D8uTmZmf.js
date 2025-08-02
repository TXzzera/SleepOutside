import{l as o,g as c}from"./utils-BgjtRfnf.js";o();function s(){const a=c("so-cart").map(r=>n(r));document.querySelector(".product-list").innerHTML=a.join("")}function n(t){return`<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${t.Image}"
      alt="${t.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${t.Name}</h2>
  </a>
  <p class="cart-card__color">${t.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${t.FinalPrice}</p>
</li>`}s();function l(){const a=(c("so-cart")||[]).reduce((r,e)=>r+Number(e.FinalPrice),0);document.querySelector("#cartTotal").textContent=`$${a.toFixed(2)}`}l();
