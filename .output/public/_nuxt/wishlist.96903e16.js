import{_ as m}from"./products.55eb5d76.js";import{u as d,r as f,E as w,a as n,f as h,b as s,t as x,e as g,g as y,k,o as c}from"./entry.af05fe6f.js";import"./ProductItem.0e972350.js";import"./AddToWishlistBtn.7b6b5331.js";const v={class:"wishlist max-w-[90%] md:max-w-[60%] mx-auto mt-[30px]"},B=h("h1",{class:"wishlist__title uppercase font-adineue text-[30px]"},"My wishlist",-1),N={class:"wishlist__quantity uppercase"},S={key:0},V={key:1},j={__name:"wishlist",async setup(A){let a,l;const r=d(),t=f([]),{data:p}=([a,l]=w(()=>k("wishlist",()=>$fetch("/api/list/"+r.wishlist))),a=await a,l(),a);let i=p.value,_=r.wishlist;for(let o=0;o<_.length;o++)for(let e=0;e<i.length;e++)i[e].code===_[o]&&t.value.push(i[e]);return t.value.reverse(),(o,e)=>{const u=m;return c(),n("div",v,[B,h("p",N,[s(t).length>1||s(t).length==0?(c(),n("span",S,x(s(t).length)+" items",1)):s(t).length==1?(c(),n("span",V,"1 item")):g("",!0)]),y(u,{data:s(t)},null,8,["data"])])}}};export{j as default};
