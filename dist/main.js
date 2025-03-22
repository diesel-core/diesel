var I=Object.create;var{getPrototypeOf:l,defineProperty:M,getOwnPropertyNames:q}=Object;var P=Object.prototype.hasOwnProperty;var k=(i,v,A)=>{A=i!=null?I(l(i)):{};let n=v||!i||!i.__esModule?M(A,"default",{value:i,enumerable:!0}):A;for(let E of q(i))if(!P.call(n,E))M(n,E,{get:()=>i[E],enumerable:!0});return n};var r=((i)=>typeof require!=="undefined"?require:typeof Proxy!=="undefined"?new Proxy(i,{get:(v,A)=>(typeof require!=="undefined"?require:v)[A]}):i)(function(i){if(typeof require!=="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+i+'" is not supported')});class B{children;isEndOfWord;handler;isDynamic;pattern;path;method;constructor(){this.children={},this.isEndOfWord=!1,this.handler=[],this.isDynamic=!1,this.pattern="",this.path="",this.method=[]}}class w{root;constructor(){this.root=new B}insert(i,v){let A=this.root,n=i.split("/").filter(Boolean);if(i==="/"){A.isEndOfWord=!0,A.handler.push(v.handler),A.path=i,A.method.push(v.method);return}for(let E of n){let N=!1,f=E;if(E.startsWith(":"))N=!0,f=":";if(!A.children[f])A.children[f]=new B;A=A.children[f],A.isDynamic=N,A.pattern=E}A.isEndOfWord=!0,A.path=i,A.method.push(v.method),A.handler.push(v.handler)}search(i,v){let A=this.root,n=i.split("/").filter(Boolean),E=n.length;for(let g of n){let C=g;if(!A.children[C])if(A.children[":"])A=A.children[":"];else return null;else A=A.children[C]}let N=A.path.split("/").filter(Boolean);if(E!==N.length)return null;let f=A.method.indexOf(v);if(f!==-1)return{path:A.path,handler:A.handler[f],isDynamic:A.isDynamic,pattern:A.pattern,method:A.method[f]};return{path:A.path,handler:A.handler,isDynamic:A.isDynamic,pattern:A.pattern,method:A.method[f]}}}function o(i){let{time:v=60000,max:A=100,message:n="Rate limit exceeded. Please try again later."}=i,E=new Map;return(N)=>{let f=new Date,g=N.ip;if(!E.has(g))E.set(g,{count:0,startTime:f});let C=E.get(g);if(C)if(f-C.startTime>v)C.count=1,C.startTime=f;else C.count++;if(C&&C.count>A)return N.json({error:n},429)}}function J(i){switch(i.split(".").pop()?.toLowerCase()){case"js":return"application/javascript";case"css":return"text/css";case"html":return"text/html";case"json":return"application/json";case"png":return"image/png";case"jpg":case"jpeg":return"image/jpeg";case"svg":return"image/svg+xml";case"gif":return"image/gif";case"woff":return"font/woff";case"woff2":return"font/woff2";default:return"application/octet-stream"}}function O(i,v){if(!i)throw new Error("JWT library is not defined, please provide jwt to authenticateJwt Function");return(A)=>{try{let n=A.cookies?.accessToken||A.req?.headers?.get("Authorization");if(!n)return A.json({message:"Unauthorized: No token provided"},401);if(n.startsWith("Bearer "))n=n.slice(7);let E=i?.verify(n,v);if(!E)return A.json({message:"Unauthorized: Invalid token"},401);A.set("user",E);return}catch(n){return A.json({message:"Unauthorized: Invalid token",error:n?.message},401)}}}function U(i,v,A){if(!i)throw new Error("JWT library is not defined, please provide jwt to authenticateJwtDB Function");if(!v)throw new Error("User model is not defined, please provide UserModel to authenticateJwtDB Function");return async(n)=>{try{let E=n.cookies?.accessToken||n.req?.headers?.get("Authorization");if(!E)return n.json({message:"Unauthorized: No token provided"},401);if(E.startsWith("Bearer "))E=E.slice(7);let N=i?.verify(E,A);if(!N)return n.json({message:"Unauthorized: Invalid token"},401);let f=await v.findById(N._id).select("-password -refreshToken");if(!f)return n.json({message:"Unauthorized: User not found"},401);n.set("user",f);return}catch(E){return n.json({message:"Unauthorized: Authentication failed",error:E?.message},401)}}}function Q(i,v,A){let n=new Headers({"Cache-Control":"no-cache"}),E=null,N=null,f=null,g=null,C={};return{req:i,server:v,url:A,status:200,setHeader(b,z){return n.set(b,z),this},removeHeader(b){return n.delete(b),this},get ip(){return this.server.requestIP(this.req)?.address??null},get query(){if(!E)try{E=Object.fromEntries(this.url.searchParams)}catch(b){throw new Error("Failed to parse query parameters")}return E},get params(){if(!N&&this.req.routePattern)try{N=h(this.req.routePattern,this.url.pathname)}catch(b){throw new Error("Failed to extract route parameters")}return N??{}},get body(){if(this.req.method==="GET")return Promise.resolve({});if(!g)g=(async()=>{let b=await s(this.req);if(b.error)throw new Error(b.error);return Object.keys(b).length===0?null:b})();return g},set(b,z){return C[b]=z,this},get(b){return C[b]},text(b,z){if(z)this.status=z;if(!n.has("Content-Type"))n.set("Content-Type","text/plain; charset=utf-8");return new Response(b,{status:this.status,headers:n})},send(b,z){if(z)this.status=z;let F=new Map([["string","text/plain; charset=utf-8"],["object","application/json; charset=utf-8"],["Uint8Array","application/octet-stream"],["ArrayBuffer","application/octet-stream"]]),L=b instanceof Uint8Array?"Uint8Array":b instanceof ArrayBuffer?"ArrayBuffer":typeof b;if(!n.has("Content-Type"))n.set("Content-Type",F.get(L)??"text/plain; charset=utf-8");let $=L==="object"&&b!==null?JSON.stringify(b):b;return new Response($,{status:this.status,headers:n})},json(b,z){if(z)this.status=z;if(!n.has("Content-Type"))n.set("Content-Type","application/json; charset=utf-8");return new Response(JSON.stringify(b),{status:this.status,headers:n})},file(b,z,F){if(F)this.status=F;let L=Bun.file(b);if(!n.has("Content-Type"))n.set("Content-Type",z??J(b));return new Response(L,{status:this.status,headers:n})},async ejs(b,z={},F){if(F)this.status=F;let L;try{L=await import("ejs"),L=L.default||L}catch($){return console.error("EJS not installed! Please run `bun add ejs`"),new Response("EJS not installed! Please run `bun add ejs`",{status:500})}try{let $=await Bun.file(b).text(),X=L.render($,z),Y=new Headers({"Content-Type":"text/html; charset=utf-8"});return new Response(X,{status:this.status,headers:Y})}catch($){return console.error("EJS Rendering Error:",$),new Response("Error rendering template",{status:500})}},redirect(b,z){if(z)this.status=z;else this.status=302;return n.set("Location",b),new Response(null,{status:this.status,headers:n})},setCookie(b,z,F={}){let L=`${encodeURIComponent(b)}=${encodeURIComponent(z)}`;if(F.maxAge)L+=`; Max-Age=${F.maxAge}`;if(F.expires)L+=`; Expires=${F.expires.toUTCString()}`;if(F.path)L+=`; Path=${F.path}`;if(F.domain)L+=`; Domain=${F.domain}`;if(F.secure)L+="; Secure";if(F.httpOnly)L+="; HttpOnly";if(F.sameSite)L+=`; SameSite=${F.sameSite}`;return n.append("Set-Cookie",L),this},get cookies(){if(!f){let b=this.req.headers.get("cookie");f=b?p(b):{}}return f}}}function p(i){return Object.fromEntries(i.split(";").map((v)=>{let[A,...n]=v.trim().split("=");return[A,decodeURIComponent(n.join("="))]}))}function h(i,v){let A={},n=i.split("/"),[E]=v.split("?"),N=E.split("/");if(n.length!==N.length)return null;for(let f=0;f<n.length;f++)if(n[f].startsWith(":"))A[n[f].slice(1)]=N[f];return A}async function s(i){let v=i.headers.get("Content-Type");if(!v)return{};if(i.headers.get("Content-Length")==="0"||!i.body)return{};try{if(v.startsWith("application/json"))return await i.json();if(v.startsWith("application/x-www-form-urlencoded")){let n=await i.text();return Object.fromEntries(new URLSearchParams(n))}if(v.startsWith("multipart/form-data")){let n=await i.formData(),E={};for(let[N,f]of n.entries())E[N]=f;return E}return{error:"Unknown request body type"}}catch(n){return{error:"Invalid request body format"}}}async function D(i,v,A,n){let E=Q(i,v,A),N=n.trie.search(A.pathname,i.method);i.routePattern=N?.path;try{if(n.hasFilterEnabled){let C=i.routePattern??A.pathname,b=await t(n,C,E,v);if(b)return b}if(n.hasMiddleware){let C=await R(n.globalMiddlewares,E,v);if(C)return C;let b=n.middlewares.get(A.pathname)||[],z=await R(b,E,v);if(z)return z}if(!N?.handler||N.method!==i.method){if(n.staticPath){let C=await d(n,A.pathname,E);if(C)return C;let b=n.trie.search("*",i.method);if(b?.handler)return await b.handler(E)}if(n.hooks.routeNotFound&&!N?.handler){let C=await n.hooks.routeNotFound(E);if(C)return C}if(!N||!N?.handler?.length)return m(404,`Route not found for ${A.pathname}`);if(N?.method!==i.method)return m(405,"Method not allowed")}if(n.hooks.preHandler){let C=await n.hooks.preHandler(E);if(C)return C}let f=N.handler(E),g=f instanceof Promise?await f:f;if(n.hooks.onSend){let C=await n.hooks.onSend(E,g);if(C)return C}return g??m(204,"No response from this handler")}catch(f){return n.hooks.onError?n.hooks.onError(f,i,A,v):m(500,"Internal Server Error")}finally{if(n.hooks.postHandler)n.hooks.postHandler(E)}}async function R(i,v,A){for(let n of i){let E=await n(v,A);if(E)return E}return null}async function t(i,v,A,n){if(!i.filters.has(v))if(i.filterFunction.length)for(let E of i.filterFunction){let N=await E(A,n);if(N)return N}else return A.json({error:!0,message:"Protected route, authentication required",status:401},401)}function m(i,v){return new Response(JSON.stringify({error:!0,message:v,status:i}),{status:i,headers:{"Content-Type":"application/json"}})}async function d(i,v,A){if(!i.staticPath)return null;let n=`${i.staticPath}${v}`;if(await Bun.file(n).exists()){let N=J(n);return A.file(n,N,200)}return null}var{create:a,defineProperty:S,getOwnPropertyDescriptor:e,getOwnPropertyNames:i1,getPrototypeOf:f1}=Object,v1=Object.prototype.hasOwnProperty,n1=(i,v)=>()=>(v||i((v={exports:{}}).exports,v),v.exports),A1=(i,v,A,n)=>{if(v&&typeof v=="object"||typeof v=="function")for(let E of i1(v))!v1.call(i,E)&&E!==A&&S(i,E,{get:()=>v[E],enumerable:!(n=e(v,E))||n.enumerable});return i},g1=(i,v,A)=>(A=i!=null?a(f1(i)):{},A1(v||!i||!i.__esModule?S(A,"default",{value:i,enumerable:!0}):A,i)),C1=n1((i,v)=>{function A(f){if(typeof f!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(f))}function n(f,g){for(var C="",b=0,z=-1,F=0,L,$=0;$<=f.length;++$){if($<f.length)L=f.charCodeAt($);else{if(L===47)break;L=47}if(L===47){if(!(z===$-1||F===1))if(z!==$-1&&F===2){if(C.length<2||b!==2||C.charCodeAt(C.length-1)!==46||C.charCodeAt(C.length-2)!==46){if(C.length>2){var X=C.lastIndexOf("/");if(X!==C.length-1){X===-1?(C="",b=0):(C=C.slice(0,X),b=C.length-1-C.lastIndexOf("/")),z=$,F=0;continue}}else if(C.length===2||C.length===1){C="",b=0,z=$,F=0;continue}}g&&(C.length>0?C+="/..":C="..",b=2)}else C.length>0?C+="/"+f.slice(z+1,$):C=f.slice(z+1,$),b=$-z-1;z=$,F=0}else L===46&&F!==-1?++F:F=-1}return C}function E(f,g){var C=g.dir||g.root,b=g.base||(g.name||"")+(g.ext||"");return C?C===g.root?C+b:C+f+b:b}var N={resolve:function(){for(var f="",g=!1,C,b=arguments.length-1;b>=-1&&!g;b--){var z;b>=0?z=arguments[b]:(C===void 0&&(C=process.cwd()),z=C),A(z),z.length!==0&&(f=z+"/"+f,g=z.charCodeAt(0)===47)}return f=n(f,!g),g?f.length>0?"/"+f:"/":f.length>0?f:"."},normalize:function(f){if(A(f),f.length===0)return".";var g=f.charCodeAt(0)===47,C=f.charCodeAt(f.length-1)===47;return f=n(f,!g),f.length===0&&!g&&(f="."),f.length>0&&C&&(f+="/"),g?"/"+f:f},isAbsolute:function(f){return A(f),f.length>0&&f.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var f,g=0;g<arguments.length;++g){var C=arguments[g];A(C),C.length>0&&(f===void 0?f=C:f+="/"+C)}return f===void 0?".":N.normalize(f)},relative:function(f,g){if(A(f),A(g),f===g||(f=N.resolve(f),g=N.resolve(g),f===g))return"";for(var C=1;C<f.length&&f.charCodeAt(C)===47;++C);for(var b=f.length,z=b-C,F=1;F<g.length&&g.charCodeAt(F)===47;++F);for(var L=g.length,$=L-F,X=z<$?z:$,Y=-1,G=0;G<=X;++G){if(G===X){if($>X){if(g.charCodeAt(F+G)===47)return g.slice(F+G+1);if(G===0)return g.slice(F+G)}else z>X&&(f.charCodeAt(C+G)===47?Y=G:G===0&&(Y=0));break}var _=f.charCodeAt(C+G),H=g.charCodeAt(F+G);if(_!==H)break;_===47&&(Y=G)}var V="";for(G=C+Y+1;G<=b;++G)(G===b||f.charCodeAt(G)===47)&&(V.length===0?V+="..":V+="/..");return V.length>0?V+g.slice(F+Y):(F+=Y,g.charCodeAt(F)===47&&++F,g.slice(F))},_makeLong:function(f){return f},dirname:function(f){if(A(f),f.length===0)return".";for(var g=f.charCodeAt(0),C=g===47,b=-1,z=!0,F=f.length-1;F>=1;--F)if(g=f.charCodeAt(F),g===47){if(!z){b=F;break}}else z=!1;return b===-1?C?"/":".":C&&b===1?"//":f.slice(0,b)},basename:function(f,g){if(g!==void 0&&typeof g!="string")throw new TypeError('"ext" argument must be a string');A(f);var C=0,b=-1,z=!0,F;if(g!==void 0&&g.length>0&&g.length<=f.length){if(g.length===f.length&&g===f)return"";var L=g.length-1,$=-1;for(F=f.length-1;F>=0;--F){var X=f.charCodeAt(F);if(X===47){if(!z){C=F+1;break}}else $===-1&&(z=!1,$=F+1),L>=0&&(X===g.charCodeAt(L)?--L===-1&&(b=F):(L=-1,b=$))}return C===b?b=$:b===-1&&(b=f.length),f.slice(C,b)}else{for(F=f.length-1;F>=0;--F)if(f.charCodeAt(F)===47){if(!z){C=F+1;break}}else b===-1&&(z=!1,b=F+1);return b===-1?"":f.slice(C,b)}},extname:function(f){A(f);for(var g=-1,C=0,b=-1,z=!0,F=0,L=f.length-1;L>=0;--L){var $=f.charCodeAt(L);if($===47){if(!z){C=L+1;break}continue}b===-1&&(z=!1,b=L+1),$===46?g===-1?g=L:F!==1&&(F=1):g!==-1&&(F=-1)}return g===-1||b===-1||F===0||F===1&&g===b-1&&g===C+1?"":f.slice(g,b)},format:function(f){if(f===null||typeof f!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof f);return E("/",f)},parse:function(f){A(f);var g={root:"",dir:"",base:"",ext:"",name:""};if(f.length===0)return g;var C=f.charCodeAt(0),b=C===47,z;b?(g.root="/",z=1):z=0;for(var F=-1,L=0,$=-1,X=!0,Y=f.length-1,G=0;Y>=z;--Y){if(C=f.charCodeAt(Y),C===47){if(!X){L=Y+1;break}continue}$===-1&&(X=!1,$=Y+1),C===46?F===-1?F=Y:G!==1&&(G=1):F!==-1&&(G=-1)}return F===-1||$===-1||G===0||G===1&&F===$-1&&F===L+1?$!==-1&&(L===0&&b?g.base=g.name=f.slice(1,$):g.base=g.name=f.slice(L,$)):(L===0&&b?(g.name=f.slice(1,F),g.base=f.slice(1,$)):(g.name=f.slice(L,F),g.base=f.slice(L,$)),g.ext=f.slice(F,$)),L>0?g.dir=f.slice(0,L-1):b&&(g.dir="/"),g},sep:"/",delimiter:":",win32:null,posix:null};N.posix=N,v.exports=N}),c=g1(C1()),K=c,b1=c,j=function(i){return i},u=function(){throw new Error("Not implemented")};K.parse??=u;b1.parse??=u;var Z={resolve:K.resolve.bind(K),normalize:K.normalize.bind(K),isAbsolute:K.isAbsolute.bind(K),join:K.join.bind(K),relative:K.relative.bind(K),toNamespacedPath:j,dirname:K.dirname.bind(K),basename:K.basename.bind(K),extname:K.extname.bind(K),format:K.format.bind(K),parse:K.parse.bind(K),sep:"/",delimiter:":",win32:void 0,posix:void 0,_makeLong:j},x={sep:"\\",delimiter:";",win32:void 0,...Z,posix:Z};Z.win32=x.win32=x;Z.posix=Z;var W=Z;var{default:T}=(()=>({}));class y{tempRoutes;globalMiddlewares;middlewares;trie;hasOnReqHook;hasMiddleware;hasPreHandlerHook;hasPostHandlerHook;hasOnSendHook;hasOnError;hooks;corsConfig;FilterRoutes;filters;filterFunction;hasFilterEnabled;serverInstance;staticPath;staticFiles;user_jwt_secret;baseApiUrl;constructor({jwtSecret:i="",baseApiUrl:v=""}={}){this.baseApiUrl=v||"",this.user_jwt_secret=i||process.env.DIESEL_JWT_SECRET||"feault_diesel_secret_for_jwt",this.tempRoutes=new Map,this.globalMiddlewares=[],this.middlewares=new Map,this.trie=new w,this.corsConfig=null,this.hasMiddleware=!1,this.hasOnReqHook=!1,this.hasPreHandlerHook=!1,this.hasPostHandlerHook=!1,this.hasOnSendHook=!1,this.hasOnError=!1,this.hooks={onRequest:null,preHandler:null,postHandler:null,onSend:null,onError:null,onClose:null,routeNotFound:null},this.FilterRoutes=[],this.filters=new Set,this.filterFunction=[],this.hasFilterEnabled=!1,this.serverInstance=null,this.staticPath=null,this.staticFiles={}}setupFilter(){return this.hasFilterEnabled=!0,{routeMatcher:(...i)=>{return this.FilterRoutes=i,this.setupFilter()},permitAll:()=>{for(let i of this?.FilterRoutes)this.filters.add(i);return this.FilterRoutes=null,this.setupFilter()},authenticate:(i)=>{if(i?.length)for(let v of i)this.filterFunction.push(v)},authenticateJwt:(i)=>{this.filterFunction.push(O(i,this.user_jwt_secret))},authenticateJwtDB:(i,v)=>{this.filterFunction.push(U(i,v,this.user_jwt_secret))}}}redirect(i,v,A){return this.any(i,(n)=>{let E=n.params,N=v;if(E)for(let g in E)N=N.replace(`:${g}`,E[g]);let f=n.url.search;if(f)N+=f;return n.redirect(N,A)}),this}serveStatic(i){return this.staticPath=i,this}static(i){return this.staticFiles={...this.staticFiles,...i},this}addHooks(i,v){if(typeof i!=="string")throw new Error("hookName must be a string");if(typeof v!=="function")throw new Error("callback must be a instance of function");switch(i){case"onRequest":this.hooks.onRequest=v;break;case"preHandler":this.hooks.preHandler=v;break;case"postHandler":this.hooks.postHandler=v;break;case"onSend":this.hooks.onSend=v;break;case"onError":this.hooks.onError=v;break;case"onClose":this.hooks.onClose=v;break;case"routeNotFound":this.hooks.routeNotFound=v;break;default:throw new Error(`Unknown hook type: ${i}`)}return this}compile(){if(this.globalMiddlewares.length>0)this.hasMiddleware=!0;for(let[A,n]of this.middlewares.entries())if(n.length>0){this.hasMiddleware=!0;break}let i=process.cwd(),v=W.join(i,"src","routes");if(T?.existsSync(v))this.loadRoutes(v,"");setTimeout(()=>{this.tempRoutes=null},2000)}async registerFileRoutes(i,v,A){let n=await import(i),E;if(A===".ts")E=W.basename(i,".ts");else if(A===".js")E=W.basename(i,".js");let N=v+"/"+E;if(N.endsWith("/index"))N=v;else if(N.endsWith("/api"))N=v;N=N.replace(/\[(.*?)\]/g,":$1");let f=["GET","POST","PUT","PATCH","DELETE","ANY","HEAD","OPTIONS","PROPFIND"];for(let g of f)if(n[g]){let C=g,b=n[g];this[C.toLocaleLowerCase()](`${this.baseApiUrl}${N}`,b)}}async loadRoutes(i,v){let A=await T.promises.readdir(i);for(let n of A){let E=W.join(i,n);if((await T.promises.stat(E)).isDirectory())this.loadRoutes(E,v+"/"+n);else if(n.endsWith(".ts"))this.registerFileRoutes(E,v,".ts");else if(n.endsWith(".js"))this.registerFileRoutes(E,v,".js")}}listen(i,...v){if(typeof Bun==="undefined")throw new Error(".listen() is designed to run on Bun only...");let A="0.0.0.0",n=void 0,E={};for(let f of v)if(typeof f==="string")A=f;else if(typeof f==="function")n=f;else if(typeof f==="object"&&f!==null)E=f;this.compile();let N={port:i,hostname:A,fetch:async(f,g)=>{let C=new URL(f.url);if(this.hooks.onRequest)this.hooks.onRequest(f,C,g);return await D(f,g,C,this)},static:this.staticFiles,development:!0};if(E.sslCert&&E.sslKey)N.certFile=E.sslCert,N.keyFile=E.sslKey;if(this.serverInstance=Bun?.serve(N),E.sslCert&&E.sslKey)console.log(`HTTPS server is running on https://localhost:${i}`);if(n)return n();return this.serverInstance}close(i){if(this.serverInstance)this.serverInstance.stop(!0),this.serverInstance=null,i?i():console.log("Server has been stopped");else console.warn("Server is not running.")}route(i,v){if(!i||typeof i!=="string")throw new Error("Path must be a string");let A=Object.fromEntries(v.tempRoutes);return Object.entries(A).forEach(([E,N])=>{let f=E.replace(/::\w+$/,""),g=`${i}${f}`;if(!this.middlewares.has(g))this.middlewares.set(g,[]);N.handlers.slice(0,-1).forEach((F)=>{if(!this.middlewares.get(g)?.includes(F))this.middlewares.get(g)?.push(F)});let b=N.handlers[N.handlers.length-1],z=N.method;try{this.trie.insert(g,{handler:b,method:z})}catch(F){console.error(`Error inserting ${g}:`,F)}}),v=null,this}register(i,v){return this.route(i,v)}addRoute(i,v,A){if(typeof v!=="string")throw new Error(`Error in ${A[A.length-1]}: Path must be a string. Received: ${typeof v}`);if(typeof i!=="string")throw new Error(`Error in addRoute: Method must be a string. Received: ${typeof i}`);this.tempRoutes?.set(v+"::"+i,{method:i,handlers:A});let n=A.slice(0,-1),E=A[A.length-1];if(!this.middlewares.has(v))this.middlewares.set(v,[]);n.forEach((N)=>{if(v==="/")this.globalMiddlewares=[...new Set([...this.globalMiddlewares,...n])];else if(!this.middlewares.get(v)?.includes(N))this.middlewares.get(v)?.push(N)});try{if(i==="ANY"){let N=["GET","POST","PUT","DELETE","PATCH","OPTIONS","HEAD","PROPFIND"];for(let f of N)this.trie.insert(v,{handler:E,method:f})}this.trie.insert(v,{handler:E,method:i})}catch(N){console.error(`Error inserting ${v}:`,N)}}use(i,v){if(Array.isArray(i))i.forEach((n)=>{if(typeof n==="function")this.globalMiddlewares.push(n)});if(typeof i==="function"){if(this.globalMiddlewares.push(i),Array.isArray(v))v.forEach((n)=>{this.globalMiddlewares.push(n)});return}return(Array.isArray(i)?i.filter((n)=>typeof n==="string"):[i].filter((n)=>typeof n==="string")).forEach((n)=>{if(!this.middlewares.has(n))this.middlewares.set(n,[]);if(v)(Array.isArray(v)?v:[v]).forEach((N)=>{this.middlewares.get(n)?.push(N)})}),this}get(i,...v){return this.addRoute("GET",i,v),this}post(i,...v){return this.addRoute("POST",i,v),this}put(i,...v){return this.addRoute("PUT",i,v),this}patch(i,...v){return this.addRoute("PATCH",i,v),this}delete(i,...v){return this.addRoute("DELETE",i,v),this}any(i,...v){return this.addRoute("ANY",i,v),this}head(i,...v){return this.addRoute("HEAD",i,v),this}options(i,...v){return this.addRoute("OPTIONS",i,v),this}propfind(i,...v){return this.addRoute("PROPFIND",i,v),this}}export{y as default};
