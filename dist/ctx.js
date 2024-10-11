async function H(F){const G={};if(!F)return G;return F.split(";").forEach((L)=>{const[X,M]=L.trim().split("=");G[X]=M.split(" ")[0]}),G}async function K(F,G){const z={},L=F.split("/"),[X]=G.split("?"),M=X.split("/");if(L.length!==M.length)return null;return L.forEach((U,Y)=>{if(U.startsWith(":")){const Z=U.slice(1);z[Z]=M[Y]}}),z}async function W(F){const G=F.headers.get("Content-Type");if(G.includes("application/json"))try{return await F.json()}catch(z){return new Response({error:"Invalid JSON format"})}else if(G.startsWith("application/x-www-form-urlencoded")){const z=await F.text();return Object.fromEntries(new URLSearchParams(z))}else if(G.startsWith("multipart/form-data")){const z=await F.formData();return O(z)}else return new Response({error:"unknown request body"})}function O(F){const G={};for(let[z,L]of F.entries())G[z]=L;return G}function $(F,G){let z={},L={},X=!1,M=null,U=null,Y=null,Z=null,J=200;return{req:F,url:G,next:()=>{},status(w){return J=w,this},async body(){if(!Z)Z=await W(F);return Z},setHeader(w,E){return z[w]=E,this},set(w,E){return L[w]=E,this},get(w){return L[w]},setAuth(w){return X=w,this},getAuth(){return X},text(w,E){if(E)J=E;return new Response(w,{status:J,headers:z})},json(w,E){if(E)J=E;return new Response(JSON.stringify(w),{status:J,headers:{"Content-Type":"application/json",...z}})},html(w,E){if(E)J=E;return new Response(Bun.file(w),{status:J,headers:{...z}})},file(w,E){if(E)J=E;return new Response(Bun.file(w),{status:J,headers:{...z}})},redirect(w,E){if(E)J=E;return new Response(null,{status:J,headers:{Location:w,...z}})},async getParams(w){if(!Y)Y=await K(F.routePattern,G.pathname);return w?Y[w]:Y},getQuery(w){if(!M)M=Object.fromEntries(G.searchParams.entries());return w?M[w]:M},cookie(w,E,I={}){let R=`${encodeURIComponent(w)}=${encodeURIComponent(E)}`;if(I.maxAge)R+=`; Max-Age=${I.maxAge}`;if(I.expires)R+=`; Expires=${I.expires.toUTCString()}`;if(I.path)R+=`; Path=${I.path}`;if(I.domain)R+=`; Domain=${I.domain}`;if(I.secure)R+="; Secure";if(I.httpOnly)R+="; HttpOnly";if(I.sameSite)R+=`; SameSite=${I.sameSite}`;if(z["Set-Cookie"]){const _=Array.isArray(z["Set-Cookie"])?z["Set-Cookie"]:[z["Set-Cookie"]];_.push(R),z["Set-Cookie"]=_}else z["Set-Cookie"]=R;return this},async getCookie(w){if(!U)U=await H(F.headers.get("cookie"));return w?U[w]:U}}}export{$ as default};