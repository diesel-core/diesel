function A(L){switch(L.split(".").pop()?.toLowerCase()){case"js":return"application/javascript";case"css":return"text/css";case"html":return"text/html";case"json":return"application/json";case"png":return"image/png";case"jpg":case"jpeg":return"image/jpeg";case"svg":return"image/svg+xml";case"gif":return"image/gif";case"woff":return"font/woff";case"woff2":return"font/woff2";default:return"application/octet-stream"}}function Q(L,G,J){let z=new Headers({"X-Powered-By":"DieselJS","Cache-Control":"no-cache"});z.set("X-Powered-By","DieselJS");let U={},X=!1,$,Y=null,K,W,D={};return{req:L,server:G,url:J,setHeader(E,Z){return z.set(E,Z),this},getUser(){return D},setUser(E){if(E)D=E},getIP(){return this.server.requestIP(this.req)},async getBody(){if(!W)W=await O(L);if(W.error)return new Response(JSON.stringify({error:W.error}),{status:400});return W},set(E,Z){if(typeof E!=="string")throw new Error("Key must be string type!");if(!Z)throw new Error("value paramter is missing pls pass value after key");return U[E]=Z,this},get(E){return E?U[E]:null},setAuth(E){return X=E,this},getAuth(){return X},text(E,Z){if(!z.has("Content-Type"))z.set("Content-Type","text/plain; charset=utf-8");return new Response(E,{status:Z,headers:z})},send(E,Z){if(typeof E==="string"){if(!z.has("Content-Type"))z.set("Content-Type","text/plain; charset=utf-8")}else if(typeof E==="object"){if(!z.has("Content-Type"))z.set("Content-Type","application/json; charset=utf-8");E=JSON.stringify(E)}else if(E instanceof Uint8Array||E instanceof ArrayBuffer){if(!z.has("Content-Type"))z.set("Content-Type","application/octet-stream")}return new Response(E,{status:Z,headers:z})},json(E,Z){if(!z.has("Content-Type"))z.set("Content-Type","application/json; charset=utf-8");return new Response(JSON.stringify(E),{status:Z,headers:z})},file(E,Z=200,F){let _=A(E),V=Bun.file(E),j=new Headers;if(!j.has("Content-Type"))j.set("Content-Type",F??_);return new Response(V,{status:Z,headers:j})},redirect(E,Z){return z.set("Location",E),new Response(null,{status:Z??302,headers:z})},setCookie(E,Z,F={}){let _=`${encodeURIComponent(E)}=${encodeURIComponent(Z)}`;if(F.maxAge)_+=`; Max-Age=${F.maxAge}`;if(F.expires)_+=`; Expires=${F.expires.toUTCString()}`;if(F.path)_+=`; Path=${F.path}`;if(F.domain)_+=`; Domain=${F.domain}`;if(F.secure)_+="; Secure";if(F.httpOnly)_+="; HttpOnly";if(F.sameSite)_+=`; SameSite=${F.sameSite}`;return z?.append("Set-Cookie",_),this},getParams(E){if(!K&&L?.routePattern)K=B(L?.routePattern,J?.pathname);if(E)if(K)return K[E];else return;if(K)return E;else return},getQuery(E){try{if(!$)$=Object.fromEntries(J.searchParams);if(E)return $[E]??void 0;return $}catch(Z){return}},getCookie(E){if(!Y){let Z=L.headers.get("cookie");if(Z)Y=N(Z);else return}if(!Y)return;if(E)return Y[E]??void 0;else return Y}}}function N(L){let G={},J=L?.split(";");for(let z=0;z<J?.length;z++){let[U,...X]=J[z].trim().split("="),$=X?.join("=").trim();if(U)G[U.trim()]=decodeURIComponent($)}return G}function B(L,G){let J={},z=L.split("/"),[U]=G.split("?"),X=U.split("/");if(z.length!==X.length)return null;for(let $=0;$<z.length;$++)if(z[$].startsWith(":"))J[z[$].slice(1)]=X[$];return J}async function O(L){let G=L.headers.get("Content-Type");if(!G)return{};try{if(G.startsWith("application/json"))return await L.json();if(G.startsWith("application/x-www-form-urlencoded")){let J=await L.text();return Object.fromEntries(new URLSearchParams(J))}if(G.startsWith("multipart/form-data")){let J=await L.formData(),z={};for(let[U,X]of J.entries())z[U]=X;return z}return{error:"Unknown request body type"}}catch(J){return{error:"Invalid request body format"}}}async function M(L,G,J,z){let U=z.trie.search(J.pathname,L.method);if(U?.isDynamic)L.routePattern=U.path;let X=Q(L,G,J);if(z.corsConfig){let Y=R(L,X,z.corsConfig);if(Y)return Y}if(z.hasOnReqHook&&z.hooks.onRequest)z.hooks.onRequest(L,J,G);if(z.hasFilterEnabled){let Y=L.routePattern??J.pathname,K=await I(z,Y,X,G);if(K)return K}if(z.hasMiddleware){let Y=z.globalMiddlewares;for(let W=0;W<Y.length;W++){let D=await Y[W](X,G);if(D)return D}let K=z.middlewares.get(J.pathname)||[];for(let W=0;W<K.length;W++){let D=await K[W](X,G);if(D)return D}}if(!U||U.method!==L.method){let Y=z.trie.search("*",L.method);if(Y){if(!z.staticFiles)throw new Error("Static files directory is not configured.");if(J.pathname.endsWith(".js")||J.pathname.endsWith(".css")||J.pathname.endsWith(".html")){let E=`${z.staticFiles}${J.pathname}`,Z=A(E);return X.file(E,200,Z)}return await Y.handler(X)}let K=U?405:404,W=U?"Method not allowed":`Route not found for ${J.pathname}`;return new Response(JSON.stringify({error:!0,message:W,status:K}),{status:K,headers:{"Content-Type":"application/json"}})}if(z.hasPreHandlerHook&&z.hooks.preHandler){let Y=await z.hooks.preHandler(X);if(Y)return Y}let $=await U.handler(X);if(z.hasPostHandlerHook&&z.hooks.postHandler)await z.hooks.postHandler(X);if(z.hasOnSendHook&&z.hooks.onSend){let Y=await z.hooks.onSend(X,$);if(Y)return Y}return $??X.json({error:!0,message:"No response from this handler",status:204},204)}function R(L,G,J={}){let z=L.headers.get("origin")??"*",U=J?.origin,X=J?.allowedHeaders??["Content-Type","Authorization"],$=J?.methods??["GET","POST","PUT","DELETE","OPTIONS"],Y=J?.credentials??!1,K=J?.exposedHeaders??[];if(G.setHeader("Access-Control-Allow-Methods",$),G.setHeader("Access-Control-Allow-Headers",X),G.setHeader("Access-Control-Allow-Credentials",Y),K.length)G.setHeader("Access-Control-Expose-Headers",K);if(U==="*"||z==="*")G.setHeader("Access-Control-Allow-Origin","*");else if(Array.isArray(U))if(z&&U.includes(z))G.setHeader("Access-Control-Allow-Origin",z);else if(U.includes("*"))G.setHeader("Access-Control-Allow-Origin","*");else return G.json({message:"CORS not allowed"},403);else if(typeof U==="string")if(z===U)G.setHeader("Access-Control-Allow-Origin",z);else return G.json({message:"CORS not allowed"},403);else return G.json({message:"CORS not allowed"},403);if(G.setHeader("Access-Control-Allow-Origin",z),L.method==="OPTIONS")return G.setHeader("Access-Control-Max-Age","86400"),G.text("",204);return null}async function I(L,G,J,z){if(!L.filters.has(G))if(L.filterFunction.length)for(let U of L.filterFunction){let X=await U(J,z);if(X)return X}else return J.json({error:!0,message:"Protected route,authentication required",status:401},401)}export{M as default};
