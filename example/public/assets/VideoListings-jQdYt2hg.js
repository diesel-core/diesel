import{j as a,L as c}from"./index-g6IK7Mpq.js";const u=({imgWidth:m="w-[18vw]",imgHeight:t="h-[11vw]",mainDIvWidth:e="w-screen",titleWidth:h="w-[65%]",titleSize:x="text-[1.2rem]",titleFont:w="font-semibold",showVideoDescription:j=!0,descriptionWidth:N="w-[40vw]",divBorder:$="",video:s})=>{var l,r,n;return console.log(s),a.jsx("div",{className:`${e} ${$} mt-2`,children:a.jsx("div",{className:"",children:a.jsxs("div",{className:"text-white ml-3 py-2 flex",children:[a.jsx(c,{to:`/watchpage/${s==null?void 0:s._id}`,children:a.jsx("img",{className:`${m} ${t} rounded-md shadow-md shadow-blue-50/50`,src:s==null?void 0:s.thumbnail,alt:""})}),a.jsxs("div",{className:"ml-3 w-[37%]",children:[a.jsx("h1",{className:`${w} ${h} ${x}`,children:s==null?void 0:s.title}),a.jsx("p",{className:"mb-1",children:"200k • views"}),a.jsxs("div",{className:"flex items-center mb-2",children:[a.jsx(c,{to:`/channel/${(l=s==null?void 0:s.owner)==null?void 0:l.username}`,children:a.jsx("img",{className:"w-8 h-8 mr-3 rounded-full",src:`${(r=s==null?void 0:s.owner)==null?void 0:r.avatar}`,alt:""})}),a.jsx("p",{children:(n=s==null?void 0:s.owner)==null?void 0:n.username})]}),j&&a.jsx("span",{className:"",children:a.jsx("p",{className:`${N}`,children:s==null?void 0:s.description})})]})]})})})};export{u as V};
