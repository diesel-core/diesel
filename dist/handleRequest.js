var Z=Object.create;var{getPrototypeOf:b,defineProperty:G,getOwnPropertyNames:i}=Object;var T=Object.prototype.hasOwnProperty;var V=(f,F,h)=>{h=f!=null?Z(b(f)):{};let n=F||!f||!f.__esModule?G(h,"default",{value:f,enumerable:!0}):h;for(let R of i(f))if(!T.call(n,R))G(n,R,{get:()=>f[R],enumerable:!0});return n};var m=((f)=>typeof require!=="undefined"?require:typeof Proxy!=="undefined"?new Proxy(f,{get:(F,h)=>(typeof require!=="undefined"?require:F)[h]}):f)(function(f){if(typeof require!=="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+f+'" is not supported')});function J(f){let{time:F=60000,max:h=100,message:n="Rate limit exceeded. Please try again later."}=f,R=new Map;return(H)=>{let C=new Date,E=H.ip;if(!R.has(E))R.set(E,{count:0,startTime:C});let N=R.get(E);if(N)if(C-N.startTime>F)N.count=1,N.startTime=C;else N.count++;if(N&&N.count>h)return H.json({error:n},429)}}function O(f){switch(f.split(".").pop()?.toLowerCase()){case"js":return"application/javascript";case"css":return"text/css";case"html":return"text/html";case"json":return"application/json";case"png":return"image/png";case"jpg":case"jpeg":return"image/jpeg";case"svg":return"image/svg+xml";case"gif":return"image/gif";case"woff":return"font/woff";case"woff2":return"font/woff2";default:return"application/octet-stream"}}function P(f,F){if(!f)throw new Error("JWT library is not defined, please provide jwt to authenticateJwt Function");return(h)=>{try{let n=h.cookies?.accessToken||h.req?.headers?.get("Authorization");if(!n)return h.json({message:"Unauthorized: No token provided"},401);if(n.startsWith("Bearer "))n=n.slice(7);let R=f?.verify(n,F);if(!R)return h.json({message:"Unauthorized: Invalid token"},401);h.set("user",R);return}catch(n){return h.json({message:"Unauthorized: Invalid token",error:n?.message},401)}}}function _(f,F,h){if(!f)throw new Error("JWT library is not defined, please provide jwt to authenticateJwtDB Function");if(!F)throw new Error("User model is not defined, please provide UserModel to authenticateJwtDB Function");return async(n)=>{try{let R=n.cookies?.accessToken||n.req?.headers?.get("Authorization");if(!R)return n.json({message:"Unauthorized: No token provided"},401);if(R.startsWith("Bearer "))R=R.slice(7);let H=f?.verify(R,h);if(!H)return n.json({message:"Unauthorized: Invalid token"},401);let C=await F.findById(H._id).select("-password -refreshToken");if(!C)return n.json({message:"Unauthorized: User not found"},401);n.set("user",C);return}catch(R){return n.json({message:"Unauthorized: Authentication failed",error:R?.message},401)}}}function z(f,F,h){let n=new Headers({"Cache-Control":"no-cache"}),R=null,H=null,C=null,E=null,N={};return{req:f,server:F,url:h,status:200,setHeader(l,w){return n.set(l,w),this},removeHeader(l){return n.delete(l),this},get ip(){return this.server.requestIP(this.req)?.address??null},get query(){if(!R)try{R=Object.fromEntries(this.url.searchParams)}catch(l){throw new Error("Failed to parse query parameters")}return R},get params(){if(!H&&this.req.routePattern)try{H=D(this.req.routePattern,this.url.pathname)}catch(l){throw new Error("Failed to extract route parameters")}return H??{}},get body(){if(this.req.method==="GET")return Promise.resolve({});if(!E)E=(async()=>{let l=await B(this.req);if(l.error)throw new Error(l.error);return Object.keys(l).length===0?null:l})();return E},set(l,w){return N[l]=w,this},get(l){return N[l]},text(l,w){if(w)this.status=w;if(!n.has("Content-Type"))n.set("Content-Type","text/plain; charset=utf-8");return new Response(l,{status:this.status,headers:n})},send(l,w){if(w)this.status=w;let M=new Map([["string","text/plain; charset=utf-8"],["object","application/json; charset=utf-8"],["Uint8Array","application/octet-stream"],["ArrayBuffer","application/octet-stream"]]),$=l instanceof Uint8Array?"Uint8Array":l instanceof ArrayBuffer?"ArrayBuffer":typeof l;if(!n.has("Content-Type"))n.set("Content-Type",M.get($)??"text/plain; charset=utf-8");let L=$==="object"&&l!==null?JSON.stringify(l):l;return new Response(L,{status:this.status,headers:n})},json(l,w){if(w)this.status=w;if(!n.has("Content-Type"))n.set("Content-Type","application/json; charset=utf-8");return new Response(JSON.stringify(l),{status:this.status,headers:n})},file(l,w,M){if(M)this.status=M;let $=Bun.file(l);if(!n.has("Content-Type"))n.set("Content-Type",w??O(l));return new Response($,{status:this.status,headers:n})},async ejs(l,w={},M){if(M)this.status=M;let $;try{$=await import("ejs"),$=$.default||$}catch(L){return console.error("EJS not installed! Please run `bun add ejs`"),new Response("EJS not installed! Please run `bun add ejs`",{status:500})}try{let L=await Bun.file(l).text(),X=$.render(L,w),Y=new Headers({"Content-Type":"text/html; charset=utf-8"});return new Response(X,{status:this.status,headers:Y})}catch(L){return console.error("EJS Rendering Error:",L),new Response("Error rendering template",{status:500})}},redirect(l,w){if(w)this.status=w;else this.status=302;return n.set("Location",l),new Response(null,{status:this.status,headers:n})},setCookie(l,w,M={}){let $=`${encodeURIComponent(l)}=${encodeURIComponent(w)}`;if(M.maxAge)$+=`; Max-Age=${M.maxAge}`;if(M.expires)$+=`; Expires=${M.expires.toUTCString()}`;if(M.path)$+=`; Path=${M.path}`;if(M.domain)$+=`; Domain=${M.domain}`;if(M.secure)$+="; Secure";if(M.httpOnly)$+="; HttpOnly";if(M.sameSite)$+=`; SameSite=${M.sameSite}`;return n.append("Set-Cookie",$),this},get cookies(){if(!C){let l=this.req.headers.get("cookie");C=l?W(l):{}}return C}}}function W(f){return Object.fromEntries(f.split(";").map((F)=>{let[h,...n]=F.trim().split("=");return[h,decodeURIComponent(n.join("="))]}))}function D(f,F){let h={},n=f.split("/"),[R]=F.split("?"),H=R.split("/");if(n.length!==H.length)return null;for(let C=0;C<n.length;C++)if(n[C].startsWith(":"))h[n[C].slice(1)]=H[C];return h}async function B(f){let F=f.headers.get("Content-Type");if(!F)return{};if(f.headers.get("Content-Length")==="0"||!f.body)return{};try{if(F.startsWith("application/json"))return await f.json();if(F.startsWith("application/x-www-form-urlencoded")){let n=await f.text();return Object.fromEntries(new URLSearchParams(n))}if(F.startsWith("multipart/form-data")){let n=await f.formData(),R={};for(let[H,C]of n.entries())R[H]=C;return R}return{error:"Unknown request body type"}}catch(n){return{error:"Invalid request body format"}}}async function Q(f,F,h,n){let R=z(f,F,h),H=n.trie.search(h.pathname,f.method);if(f.routePattern=H?.path,n.hasFilterEnabled){let N=f.routePattern??h.pathname,l=await U(n,N,R,F);if(l)return l}if(n.hasMiddleware){let N=await K(n.globalMiddlewares,R,F);if(N)return N;let l=n.middlewares.get(h.pathname)||[],w=await K(l,R,F);if(w)return w}if(!H?.handler||H.method!==f.method){if(n.staticPath){let N=await g(n,h.pathname,R);if(N)return N;let l=n.trie.search("*",f.method);if(l?.handler)return await l.handler(R)}if(n.hooks.routeNotFound&&!H?.handler){let N=await n.hooks.routeNotFound(R);if(N)return N}if(!H||!H?.handler?.length)return A(404,`Route not found for ${h.pathname}`);if(H?.method!==f.method)return A(405,"Method not allowed")}if(n.hooks.preHandler){let N=await n.hooks.preHandler(R);if(N)return N}let C=H.handler(R),E=C instanceof Promise?await C:C;if(n.hooks.postHandler)n.hooks.postHandler(R);if(n.hooks.onSend){let N=await n.hooks.onSend(R,E);if(N)return N}return E??A(204,"No response from this handler")}async function K(f,F,h){for(let n of f){let R=await n(F,h);if(R)return R}return null}async function U(f,F,h,n){if(!f.filters.has(F))if(f.filterFunction.length)for(let R of f.filterFunction){let H=await R(h,n);if(H)return H}else return h.json({error:!0,message:"Protected route, authentication required",status:401},401)}function A(f,F){return new Response(JSON.stringify({error:!0,message:F,status:f}),{status:f,headers:{"Content-Type":"application/json"}})}async function g(f,F,h){if(!f.staticPath)return null;let n=`${f.staticPath}${F}`;if(await Bun.file(n).exists()){let H=O(n);return h.file(n,H,200)}return null}export{g as handleStaticFiles,U as handleFilterRequest,A as generateErrorResponse,Q as default};
