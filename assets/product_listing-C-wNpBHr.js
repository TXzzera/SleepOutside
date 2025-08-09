import{r as c,l as o,b as a}from"./utils-CetppbQX.js";import{E as n}from"./ExternalServices-BbRvubfJ.js";function l(e){return`
    <li class="product-card">
      <a href="product_pages/?products=${e.Id}">
        <img src="${e.Image.PrimaryMedium}" alt="${e.Name}">
        <h2>${e.Brand.Name}</h2>
        <h3>${e.Name}</h3>
        <p class="product-card__price">$${e.FinalPrice}</p>
      </a>
    </li>
  `}class m{constructor(t,r,s,i=""){this.category=t,this.dataSource=r,this.listElement=s,this.searchTerm=i.toLowerCase()}async init(){let t=await this.dataSource.getData(this.category);this.searchTerm&&(t=t.filter(r=>r.Name.toLowerCase().includes(this.searchTerm)||r.Brand.Name.toLowerCase().includes(this.searchTerm))),this.renderList(t),document.querySelector(".title").textContent=this.category}renderList(t){c(l,this.listElement,t,"afterbegin",!0)}}o();const h=a("category"),d=a("search"),u=new n,g=document.querySelector(".product-list"),y=new m(h,u,g,d);y.init();
