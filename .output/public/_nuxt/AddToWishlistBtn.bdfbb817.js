import{u as h,N as m,r as f,o as n,g as l,h as g,Q as w,R as _,m as k,S as y}from"./entry.4b723449.js";const v={key:0,src:w,alt:"Remove from wishlist"},S={key:1,src:_,alt:"Add to wishlist"},C={__name:"AddToWishlistBtn",props:{product:{type:Object}},setup(r){const c=r,s=h(),d=m();let a;const o=f(s.wishlist.find(e=>e===c.product.code||e===c.product.productCode));async function u(e){const i={"Content-Type":"application/json"};if(s.pending=!0,!s.isAuthenticated)return d.toggleForm();o.value?a="pull":a="push";try{await k("wishlist",()=>$fetch("/api/wishlist",{headers:i,body:{product:e.code,token:y("token").value,action:a},method:"POST"}).then(t=>{t.message==="pushed"?(s.wishlist.push(e.code),o.value=!0):t.message==="pulled"&&(s.wishlist=s.wishlist.filter(p=>p!==e.code),o.value=!1),s.pending=!1}))}catch(t){console.log(t.message)}}return(e,i)=>(n(),l("button",{class:"add-to-wishlist",onClick:i[0]||(i[0]=t=>u(r.product))},[g(o)?(n(),l("img",v)):(n(),l("img",S))]))}};export{C as _};
