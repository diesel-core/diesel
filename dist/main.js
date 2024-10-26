class A{constructor(){this.children={},this.isEndOfWord=!1,this.handler=[],this.isDynamic=!1,this.pattern="",this.path="",this.method=[],this.subMiddlewares=new Map}}class K{constructor(){this.root=new A}insert(G,J){let z=this.root,U=G.split("/").filter(Boolean);if(G==="/"){z.isEndOfWord=!0,z.handler.push(J.handler),z.path=G,z.method.push(J.method);return}for(let Y of U){let Z=!1,X=Y;if(Y.startsWith(":"))Z=!0,X=":";if(!z.children[X])z.children[X]=new A;z=z.children[X],z.isDynamic=Z,z.pattern=Y,z.method.push(J.method),z.handler.push(J.handler),z.path=G}z.isEndOfWord=!0,z.method.push(J.method),z.handler.push(J.handler),z.path=G}search(G,J){let z=this.root,U=G.split("/").filter(Boolean);for(let Z of U){let X=Z;if(!z.children[X])if(z.children[":"])z=z.children[":"];else return null;else z=z.children[X]}let Y=z.method.indexOf(J);if(Y!==-1)return{path:z.path,handler:z.handler[Y],isDynamic:z.isDynamic,pattern:z.pattern,method:z.method[Y]};return{path:z.path,handler:z.handler,isDynamic:z.isDynamic,pattern:z.pattern,method:z.method[Y]}}}var N=function(G,J,z,U){function Y(Z){return Z instanceof z?Z:new z(function(X){X(Z)})}return new(z||(z=Promise))(function(Z,X){function F(E){try{V(U.next(E))}catch(Q){X(Q)}}function L(E){try{V(U.throw(E))}catch(Q){X(Q)}}function V(E){E.done?Z(E.value):Y(E.value).then(F,L)}V((U=U.apply(G,J||[])).next())})};function M(G,J,z){let U=new Headers,Y={},Z=!1,X,F=null,L,V,E=200,Q={};return{req:G,server:J,url:z,getUser(){return Q},setUser($){if($)Q=$},status($){return E=$,this},getIP(){return this.server.requestIP(this.req)},body(){return N(this,void 0,void 0,function*(){if(!V)V=yield O(G);if(V.error)return new Response(JSON.stringify({error:V.error}),{status:400});return V})},setHeader($,W){return U.set($,W),this},set($,W){return Y[$]=W,this},get($){return Y[$]||null},setAuth($){return Z=$,this},getAuth(){return Z},text($,W){return new Response($,{status:W!==null&&W!==void 0?W:E,headers:U})},send($,W){return new Response($,{status:W!==null&&W!==void 0?W:E,headers:U})},json($,W){return new Response(JSON.stringify($),{status:W!==null&&W!==void 0?W:E,headers:U})},html($,W){return new Response(Bun.file($),{status:W!==null&&W!==void 0?W:E,headers:U})},file($,W){return new Response(Bun.file($),{status:W!==null&&W!==void 0?W:E,headers:U})},redirect($,W){return U.set("Location",$),new Response(null,{status:W!==null&&W!==void 0?W:302,headers:U})},getParams($){if(!L)L=I(G===null||G===void 0?void 0:G.routePattern,z===null||z===void 0?void 0:z.pathname);return $?L[$]||{}:L},getQuery($){try{if(!X)X=Object.fromEntries(z.searchParams);return $?X[$]||{}:X}catch(W){return{}}},cookie($,W,B={}){let D=`${encodeURIComponent($)}=${encodeURIComponent(W)}`;if(B.maxAge)D+=`; Max-Age=${B.maxAge}`;if(B.expires)D+=`; Expires=${B.expires.toUTCString()}`;if(B.path)D+=`; Path=${B.path}`;if(B.domain)D+=`; Domain=${B.domain}`;if(B.secure)D+="; Secure";if(B.httpOnly)D+="; HttpOnly";if(B.sameSite)D+=`; SameSite=${B.sameSite}`;return U===null||U===void 0||U.append("Set-Cookie",D),this},getCookie($){var W;if(!F||Object.keys(F).length===0){let B=(W=G.headers)===null||W===void 0?void 0:W.get("cookie");if(B)F=j(B);else return null}if(!F)return null;return $?F[$]!==void 0?F[$]:null:F}}}function j(G){let J={};if(!G)return J;return G.split(";").forEach((U)=>{var Y;let[Z,X]=(Y=U===null||U===void 0?void 0:U.trim())===null||Y===void 0?void 0:Y.split("=");if(Z&&X)J[Z.trim()]=X.split(" ")[0].trim()}),J}function I(G,J){let z={},U=G.split("/"),[Y]=J.split("?"),Z=Y.split("/");if(U.length!==Z.length)return null;return U.forEach((X,F)=>{if(X.startsWith(":")){let L=X.slice(1);z[L]=Z[F]}}),z}function O(G){return N(this,void 0,void 0,function*(){let J=G.headers.get("Content-Type")||"";if(!J)return{};try{if(J.startsWith("application/json"))return yield G.json();if(J.startsWith("application/x-www-form-urlencoded")){let z=yield G.text();return Object.fromEntries(new URLSearchParams(z))}if(J.startsWith("multipart/form-data")){let z=yield G.formData();return S(z)}return{error:"Unknown request body type"}}catch(z){return{error:"Invalid request body format"}}})}function S(G){let J={};for(let[z,U]of G.entries())J[z]=U;return J}var b=function(G,J,z,U){function Y(Z){return Z instanceof z?Z:new z(function(X){X(Z)})}return new(z||(z=Promise))(function(Z,X){function F(E){try{V(U.next(E))}catch(Q){X(Q)}}function L(E){try{V(U.throw(E))}catch(Q){X(Q)}}function V(E){E.done?Z(E.value):Y(E.value).then(F,L)}V((U=U.apply(G,J||[])).next())})};function T(G,J,z,U){return b(this,void 0,void 0,function*(){var Y,Z,X;let F=U.trie.search(z.pathname,G.method);if(!F||F.method!==G.method)return new Response(F?"Method not allowed":`Route not found for ${z.pathname}`,{status:F?405:404});if(F.isDynamic)G.routePattern=F.path;let L=M(G,J,z);if(U.corsConfig){let E=w(G,L,U.corsConfig);if(E)return E}if(U.hasOnReqHook&&U.hooks.onRequest)U.hooks.onRequest(L,J);if(U.hasFilterEnabled){let E=(Y=G.routePattern)!==null&&Y!==void 0?Y:z.pathname;if(U.filters.includes(E)===!1)if(U.filterFunction)try{let $=yield U.filterFunction(L,J);if($)return $}catch($){return console.error("Error in filterFunction:",$),new Response(JSON.stringify({message:"Internal Server Error"}),{status:500})}else return new Response(JSON.stringify({message:"Authentication required"}),{status:400})}if(U.hasMiddleware){for(let Q of U.globalMiddlewares){let $=yield Q(L,J);if($)return $}let E=U.middlewares.get(z.pathname)||[];for(let Q of E){let $=yield Q(L,J);if($)return $}}if(U.hasPreHandlerHook&&U.hooks.preHandler){let E=yield U.hooks.preHandler(L);if(E)return E}let V=U.hasPreHandlerHook?yield(X=(Z=U.hooks).preHandler)===null||X===void 0?void 0:X.call(Z,L):null;if(V)return V;try{let E=yield F.handler(L);if(U.hasPostHandlerHook&&U.hooks.postHandler)yield U.hooks.postHandler(L);if(U.hasOnSendHook&&U.hooks.onSend){let Q=yield U.hooks.onSend(L,E);if(Q)return Q}return E!==null&&E!==void 0?E:new Response("No response from handler",{status:204})}catch(E){return new Response("Internal Server Error",{status:500})}})}function w(G,J,z={}){var U,Y,Z,X,F;let L=(U=G.headers.get("origin"))!==null&&U!==void 0?U:"*",V=z===null||z===void 0?void 0:z.origin,E=(Y=z===null||z===void 0?void 0:z.allowedHeaders)!==null&&Y!==void 0?Y:["Content-Type","Authorization"],Q=(Z=z===null||z===void 0?void 0:z.methods)!==null&&Z!==void 0?Z:["GET","POST","PUT","DELETE","OPTIONS"],$=(X=z===null||z===void 0?void 0:z.credentials)!==null&&X!==void 0?X:!1,W=(F=z===null||z===void 0?void 0:z.exposedHeaders)!==null&&F!==void 0?F:[];if(J.setHeader("Access-Control-Allow-Methods",Q),J.setHeader("Access-Control-Allow-Headers",E),J.setHeader("Access-Control-Allow-Credentials",$),W.length)J.setHeader("Access-Control-Expose-Headers",W);if(V==="*")J.setHeader("Access-Control-Allow-Origin","*");else if(Array.isArray(V))if(L&&V.includes(L))J.setHeader("Access-Control-Allow-Origin",L);else if(V.includes("*"))J.setHeader("Access-Control-Allow-Origin","*");else return J.status(403).json({message:"CORS not allowed"});else if(typeof V==="string")if(L===V)J.setHeader("Access-Control-Allow-Origin",L);else return J.status(403).json({message:"CORS not allowed"});else return J.status(403).json({message:"CORS not allowed"});if(J.setHeader("Access-Control-Allow-Origin",L),G.method==="OPTIONS")return J.setHeader("Access-Control-Max-Age","86400"),J.status(204).text("");return null}function C(G){let{time:J=60000,max:z=100,message:U="Rate limit exceeded. Please try again later."}=G,Y=new Map;return(Z)=>{let X=new Date,F=Z.getIP().address;if(!Y.has(F))Y.set(F,{count:0,startTime:X});let L=Y.get(F);if(L)if(X-L.startTime>J)L.count=1,L.startTime=X;else L.count++;if(L&&L.count>z)return Z.status(429).json({error:U})}}var H=function(G,J,z,U){function Y(Z){return Z instanceof z?Z:new z(function(X){X(Z)})}return new(z||(z=Promise))(function(Z,X){function F(E){try{V(U.next(E))}catch(Q){X(Q)}}function L(E){try{V(U.throw(E))}catch(Q){X(Q)}}function V(E){E.done?Z(E.value):Y(E.value).then(F,L)}V((U=U.apply(G,J||[])).next())})};class R{constructor(){this.routes=[],this.globalMiddlewares=[],this.middlewares=new Map,this.trie=new K,this.corsConfig=null,this.hasMiddleware=!1,this.hasOnReqHook=!1,this.hasPreHandlerHook=!1,this.hasPostHandlerHook=!1,this.hasOnSendHook=!1,this.hooks={onRequest:null,preHandler:null,postHandler:null,onSend:null,onError:null,onClose:null},this.filters=[],this.filterFunction=null,this.hasFilterEnabled=!1,this.wss=null}filter(){return this.hasFilterEnabled=!0,{routeMatcher:(...G)=>{return this.routes=G.sort(),this.filter()},permitAll:()=>{for(let G of this===null||this===void 0?void 0:this.routes)this.filters.push(G);return this.filter()},require:(G)=>{if(G)this.filterFunction=G}}}cors(G){this.corsConfig=G}addHooks(G,J){if(typeof G!=="string")throw new Error("hookName must be a string");if(typeof J!=="function")throw new Error("callback must be a instance of function");if(this.hooks.hasOwnProperty(G))this.hooks[G]=J;else throw new Error(`Unknown hook type: ${G}`)}compile(){if(this.globalMiddlewares.length>0)this.hasMiddleware=!0;for(let[G,J]of this.middlewares.entries())if(J.length>0){this.hasMiddleware=!0;break}if(this.hooks.onRequest)this.hasOnReqHook=!0;if(this.hooks.preHandler)this.hasPreHandlerHook=!0;if(this.hooks.postHandler)this.hasPostHandlerHook=!0;if(this.hooks.onSend)this.hasOnSendHook=!0}listen(G,J,{sslCert:z=null,sslKey:U=null}={}){if(typeof Bun==="undefined")throw new Error(".listen() is designed to run on Bun only...");if(typeof G!=="number")throw new Error("Port must be a numeric value");this.compile();let Y={port:G,fetch:(X,F)=>H(this,void 0,void 0,function*(){let L=new URL(X.url);try{return yield T(X,F,L,this)}catch(V){return new Response("Internal Server Error",{status:500})}}),onClose(){console.log("Server is shutting down...")}};if(z&&U)Y.certFile=z,Y.keyFile=U;let Z=Bun.serve(Y);if(Bun===null||Bun===void 0||Bun.gc(!1),typeof J==="function")return J();if(z&&U)console.log(`HTTPS server is running on https://localhost:${G}`);else console.log(`HTTP server is running on http://localhost:${G}`);return Z}register(G,J){if(typeof G!=="string")throw new Error("path must be a string");if(typeof J!=="object")throw new Error("handler parameter should be a instance of router object",J);let z=Object.entries(J.trie.root.children);J.trie.root.subMiddlewares.forEach((U,Y)=>{if(!this.middlewares.has(G+Y))this.middlewares.set(G+Y,[]);U===null||U===void 0||U.forEach((Z)=>{var X,F;if(!((X=this.middlewares.get(G+Y))===null||X===void 0?void 0:X.includes(Z)))(F=this.middlewares.get(G+Y))===null||F===void 0||F.push(Z)})});for(let[U,Y]of z){let Z=G+(Y===null||Y===void 0?void 0:Y.path),X=Y.handler[0],F=Y.method[0];this.trie.insert(Z,{handler:X,method:F})}J.trie=new K}addRoute(G,J,z){if(typeof J!=="string")throw new Error("Path must be a string type");if(typeof G!=="string")throw new Error("method must be a string type");let U=z.slice(0,-1),Y=z[z.length-1];if(!this.middlewares.has(J))this.middlewares.set(J,[]);U.forEach((Z)=>{var X,F;if(J==="/"){if(!this.globalMiddlewares.includes(Z))this.globalMiddlewares.push(Z)}else if(!((X=this.middlewares.get(J))===null||X===void 0?void 0:X.includes(Z)))(F=this.middlewares.get(J))===null||F===void 0||F.push(Z)}),this.trie.insert(J,{handler:Y,method:G})}use(G,J){var z,U;if(typeof G==="function"){if(!this.globalMiddlewares.includes(G))this.globalMiddlewares.push(G);return}let Y=G;if(!this.middlewares.has(Y))this.middlewares.set(Y,[]);if(J){if(!((z=this.middlewares.get(Y))===null||z===void 0?void 0:z.includes(J)))(U=this.middlewares.get(Y))===null||U===void 0||U.push(J)}}get(G,...J){return this.addRoute("GET",G,J),this}post(G,...J){return this.addRoute("POST",G,J),this}put(G,...J){return this.addRoute("PUT",G,J),this}patch(G,...J){return this.addRoute("PATCH",G,J),this}delete(G,...J){return this.addRoute("DELETE",G,J),this}}export{C as rateLimit,R as default};
