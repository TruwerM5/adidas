import{e as h,A as f,D as x,r as v,g as l,b as t,t as _,F as w,l as b,a as i,h as g,o as p,w as y,y as C,p as L}from"./entry.4b723449.js";import{_ as S}from"./products.2b5bedce.js";import"./ProductItem.7b71bb86.js";import"./AddToWishlistBtn.bdfbb817.js";const N={class:"collection mt-[35px]"},B={class:"collection__head px-[15px] mb-[20px]"},D={class:"font-adihaus-cn uppercase text-[24px]"},V={class:"collection__nav relative overflow-x-scroll"},k={class:"collection__nav-list flex h-[50px] items-center"},z={class:"wrapper"},F={__name:"[name]",setup(P){const n=f(),s=x(),r=[{id:1,title:"Ultraboost",href:"ultraboost"},{id:2,title:"NMD",href:"nmd"},{id:3,title:"Gazelle",href:"gazelle"},{id:4,title:"Cleats",href:"cleats"},{id:5,title:"Stan Smith",href:"stan-smith"},{id:6,title:"Samba",href:"samba"}],o=v(n.allProducts.filter(e=>e.short_name?e.short_name.toLowerCase().includes(s.params.name.toLowerCase()):e.name.toLowerCase().includes(s.params.name.toLowerCase())));o.value=n.getUnique(o.value);const d=e=>e.find(c=>s.params.name===c.href).title;return(e,c)=>{const u=L,m=S;return p(),l("div",N,[t("div",B,[t("h1",D,_(d(r))+" shoe collection",1),t("nav",V,[t("ul",k,[(p(),l(w,null,b(r,a=>t("li",{key:a.id,class:"collection__nav-item text-[#767677] mx-[14px] lg:mx-[20px] whitespace-pre flex items-center h-full"},[i(u,{to:{path:a.href},class:"py-[8px]"},{default:y(()=>[C(_(a.title),1)]),_:2},1032,["to"])])),64))])])]),t("div",z,[i(m,{data:g(o)},null,8,["data"])])])}}},A=h(F,[["__scopeId","data-v-b2fc1685"]]);export{A as default};