import{r as d,u as n,c as x,j as i,d as f,b as l,e as u}from"./index-g6IK7Mpq.js";const j=()=>{const[h,c]=d.useState(!1),r=n(),{userLikedVideos:s}=x(t=>t.user),o=async()=>{var t,e;try{const a=await l.get("/api/v1/likes/videos",{withCredentials:!0});(t=a==null?void 0:a.data)!=null&&t.data&&(r(u((e=a==null?void 0:a.data)==null?void 0:e.data)),c(!0))}catch{}};return d.useEffect(()=>{s||o()},[s]),i.jsx("div",{className:"text-white flex flex-wrap",children:s==null?void 0:s.map((t,e)=>i.jsx("div",{children:i.jsx(f,{video:t})},e))})};export{j as default};
