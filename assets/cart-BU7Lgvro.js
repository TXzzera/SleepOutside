import{g as r}from"./utils-D5god50N.js";/* empty css              */function o(){const a=r("so-cart").map(c=>s(c));document.querySelector(".product-list").innerHTML=a.join("")}function s(t){return`<li class="cart-card divider">
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
</li>`}o();function n(){const a=(r("so-cart")||[]).reduce((c,e)=>c+Number(e.FinalPrice),0);document.querySelector("#cartTotal").textContent=`$${a.toFixed(2)}`}n();
