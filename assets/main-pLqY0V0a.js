import{l as c}from"./utils-BgjtRfnf.js";async function a(){await c();const t=document.querySelector(".header-container");if(t){const r=t.querySelector(".cart"),e=document.createElement("form");e.id="search-form",e.className="search-form",e.innerHTML=`
      <input type="text" id="search-input" placeholder="Search product..." />
      <button type="submit">Search</button>
    `,t.insertBefore(e,r),e.addEventListener("submit",n=>{n.preventDefault();const o=document.querySelector("#search-input").value.trim();o&&(window.location.href=`product-listing.html?search=${encodeURIComponent(o)}`)})}else console.log("Header container not found")}a();
