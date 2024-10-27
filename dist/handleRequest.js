var Q=function(L,G,F,z){function K(Y){return Y instanceof F?Y:new F(function(U){U(Y)})}return new(F||(F=Promise))(function(Y,U){function Z(I){try{$(z.next(I))}catch(W){U(W)}}function X(I){try{$(z.throw(I))}catch(W){U(W)}}function $(I){I.done?Y(I.value):K(I.value).then(Z,X)}$((z=z.apply(L,G||[])).next())})};function D(L,G,F){let z=new Headers,K={},Y=!1,U,Z=null,X,$,I=200,W={};return{req:L,server:G,url:F,getUser(){return W},setUser(E){if(E)W=E},status(E){return I=E,this},getIP(){return this.server.requestIP(this.req)},getBody(){return Q(this,void 0,void 0,function*(){if(!$)$=yield A(L);if($.error)return new Response(JSON.stringify({error:$.error}),{status:400});return $})},setHeader(E,J){return z.set(E,J),this},set(E,J){return K[E]=J,this},get(E){return K[E]||null},setAuth(E){return Y=E,this},getAuth(){return Y},text(E,J){return new Response(E,{status:J!==null&&J!==void 0?J:I,headers:z})},send(E,J){return new Response(E,{status:J!==null&&J!==void 0?J:I,headers:z})},json(E,J){return new Response(JSON.stringify(E),{status:J!==null&&J!==void 0?J:I,headers:z})},html(E,J){return new Response(Bun.file(E),{status:J!==null&&J!==void 0?J:I,headers:z})},file(E,J){return new Response(Bun.file(E),{status:J!==null&&J!==void 0?J:I,headers:z})},redirect(E,J){return z.set("Location",E),new Response(null,{status:J!==null&&J!==void 0?J:302,headers:z})},getParams(E){if(!X)X=B(L===null||L===void 0?void 0:L.routePattern,F===null||F===void 0?void 0:F.pathname);return E?X[E]||{}:X},getQuery(E){try{if(!U)U=Object.fromEntries(F.searchParams);return E?U[E]||{}:U}catch(J){return{}}},setCookie(E,J,M={}){let V=`${encodeURIComponent(E)}=${encodeURIComponent(J)}`;if(M.maxAge)V+=`; Max-Age=${M.maxAge}`;if(M.expires)V+=`; Expires=${M.expires.toUTCString()}`;if(M.path)V+=`; Path=${M.path}`;if(M.domain)V+=`; Domain=${M.domain}`;if(M.secure)V+="; Secure";if(M.httpOnly)V+="; HttpOnly";if(M.sameSite)V+=`; SameSite=${M.sameSite}`;return z===null||z===void 0||z.append("Set-Cookie",V),this},getCookie(E){var J;if(!Z||Object.keys(Z).length===0){let M=(J=L.headers)===null||J===void 0?void 0:J.get("cookie");if(M)Z=T(M);else return null}if(!Z)return null;return E?Z[E]!==void 0?Z[E]:null:Z}}}function T(L){let G={};if(!L)return G;return L.split(";").forEach((z)=>{var K;let[Y,U]=(K=z===null||z===void 0?void 0:z.trim())===null||K===void 0?void 0:K.split("=");if(Y&&U)G[Y.trim()]=U.split(" ")[0].trim()}),G}function B(L,G){let F={},z=L.split("/"),[K]=G.split("?"),Y=K.split("/");if(z.length!==Y.length)return null;return z.forEach((U,Z)=>{if(U.startsWith(":")){let X=U.slice(1);F[X]=Y[Z]}}),F}function A(L){return Q(this,void 0,void 0,function*(){let G=L.headers.get("Content-Type")||"";if(!G)return{};try{if(G.startsWith("application/json"))return yield L.json();if(G.startsWith("application/x-www-form-urlencoded")){let F=yield L.text();return Object.fromEntries(new URLSearchParams(F))}if(G.startsWith("multipart/form-data")){let F=yield L.formData();return N(F)}return{error:"Unknown request body type"}}catch(F){return{error:"Invalid request body format"}}})}function N(L){let G={};for(let[F,z]of L.entries())G[F]=z;return G}var O=function(L,G,F,z){function K(Y){return Y instanceof F?Y:new F(function(U){U(Y)})}return new(F||(F=Promise))(function(Y,U){function Z(I){try{$(z.next(I))}catch(W){U(W)}}function X(I){try{$(z.throw(I))}catch(W){U(W)}}function $(I){I.done?Y(I.value):K(I.value).then(Z,X)}$((z=z.apply(L,G||[])).next())})};function R(L,G,F,z){return O(this,void 0,void 0,function*(){var K,Y,U;let Z=z.trie.search(F.pathname,L.method);if(!Z||Z.method!==L.method)return new Response(Z?"Method not allowed":`Route not found for ${F.pathname}`,{status:Z?405:404});if(Z.isDynamic)L.routePattern=Z.path;let X=D(L,G,F);if(z.corsConfig){let I=C(L,X,z.corsConfig);if(I)return I}if(z.hasOnReqHook&&z.hooks.onRequest)z.hooks.onRequest(X,G);if(z.hasFilterEnabled){let I=(K=L.routePattern)!==null&&K!==void 0?K:F.pathname;if(z.filters.includes(I)===!1)if(z.filterFunction)try{let E=yield z.filterFunction(X,G);if(E)return E}catch(E){return console.error("Error in filterFunction:",E),new Response(JSON.stringify({message:"Internal Server Error"}),{status:500})}else return new Response(JSON.stringify({message:"Authentication required"}),{status:400})}if(z.hasMiddleware){for(let W of z.globalMiddlewares){let E=yield W(X,G);if(E)return E}let I=z.middlewares.get(F.pathname)||[];for(let W of I){let E=yield W(X,G);if(E)return E}}if(z.hasPreHandlerHook&&z.hooks.preHandler){let I=yield z.hooks.preHandler(X);if(I)return I}let $=z.hasPreHandlerHook?yield(U=(Y=z.hooks).preHandler)===null||U===void 0?void 0:U.call(Y,X):null;if($)return $;try{let I=yield Z.handler(X);if(z.hasPostHandlerHook&&z.hooks.postHandler)yield z.hooks.postHandler(X);if(z.hasOnSendHook&&z.hooks.onSend){let W=yield z.hooks.onSend(X,I);if(W)return W}return I!==null&&I!==void 0?I:new Response("No response from handler",{status:204})}catch(I){return new Response("Internal Server Error",{status:500})}})}function C(L,G,F={}){var z,K,Y,U,Z;let X=(z=L.headers.get("origin"))!==null&&z!==void 0?z:"*",$=F===null||F===void 0?void 0:F.origin,I=(K=F===null||F===void 0?void 0:F.allowedHeaders)!==null&&K!==void 0?K:["Content-Type","Authorization"],W=(Y=F===null||F===void 0?void 0:F.methods)!==null&&Y!==void 0?Y:["GET","POST","PUT","DELETE","OPTIONS"],E=(U=F===null||F===void 0?void 0:F.credentials)!==null&&U!==void 0?U:!1,J=(Z=F===null||F===void 0?void 0:F.exposedHeaders)!==null&&Z!==void 0?Z:[];if(G.setHeader("Access-Control-Allow-Methods",W),G.setHeader("Access-Control-Allow-Headers",I),G.setHeader("Access-Control-Allow-Credentials",E),J.length)G.setHeader("Access-Control-Expose-Headers",J);if($==="*")G.setHeader("Access-Control-Allow-Origin","*");else if(Array.isArray($))if(X&&$.includes(X))G.setHeader("Access-Control-Allow-Origin",X);else if($.includes("*"))G.setHeader("Access-Control-Allow-Origin","*");else return G.status(403).json({message:"CORS not allowed"});else if(typeof $==="string")if(X===$)G.setHeader("Access-Control-Allow-Origin",X);else return G.status(403).json({message:"CORS not allowed"});else return G.status(403).json({message:"CORS not allowed"});if(G.setHeader("Access-Control-Allow-Origin",X),L.method==="OPTIONS")return G.setHeader("Access-Control-Max-Age","86400"),G.status(204).text("");return null}export{R as default};
