var H=Object.create;var{getPrototypeOf:l,defineProperty:M,getOwnPropertyNames:q}=Object;var P=Object.prototype.hasOwnProperty;var k=(n,r,o)=>{o=n!=null?H(l(n)):{};let g=r||!n||!n.__esModule?M(o,"default",{value:n,enumerable:!0}):o;for(let m of q(n))if(!P.call(g,m))M(g,m,{get:()=>n[m],enumerable:!0});return g};var p=((n)=>typeof require!=="undefined"?require:typeof Proxy!=="undefined"?new Proxy(n,{get:(r,o)=>(typeof require!=="undefined"?require:r)[o]}):n)(function(n){if(typeof require!=="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});class O{children;isEndOfWord;handler;isDynamic;pattern;path;method;constructor(){this.children={},this.isEndOfWord=!1,this.handler=[],this.isDynamic=!1,this.pattern="",this.path="",this.method=[]}}class T{root;constructor(){this.root=new O}insert(n,r){let o=this.root,g=n.split("/").filter(Boolean);if(n==="/"){o.isEndOfWord=!0,o.handler.push(r.handler),o.path=n,o.method.push(r.method);return}for(let m of g){let s=!1,i=m;if(m.startsWith(":"))s=!0,i=":";if(!o.children[i])o.children[i]=new O;o=o.children[i],o.isDynamic=s,o.pattern=m}o.isEndOfWord=!0,o.path=n,o.method.push(r.method),o.handler.push(r.handler)}search(n,r){let o=this.root,g=n.split("/").filter(Boolean),m=g.length;for(let u of g){let f=u;if(!o.children[f])if(o.children[":"])o=o.children[":"];else return null;else o=o.children[f]}let s=o.path.split("/").filter(Boolean);if(m!==s.length)return null;let i=o.method.indexOf(r);if(i!==-1)return{path:o.path,handler:o.handler[i],isDynamic:o.isDynamic,pattern:o.pattern,method:o.method[i]};return{path:o.path,handler:o.handler,isDynamic:o.isDynamic,pattern:o.pattern,method:o.method[i]}}}function x(n){switch(n.split(".").pop()?.toLowerCase()){case"js":return"application/javascript";case"css":return"text/css";case"html":return"text/html";case"json":return"application/json";case"png":return"image/png";case"jpg":case"jpeg":return"image/jpeg";case"svg":return"image/svg+xml";case"gif":return"image/gif";case"woff":return"font/woff";case"woff2":return"font/woff2";default:return"application/octet-stream"}}function D(n,r,o){let g=null,m=null,s=null,i=null,u={};return{req:n,server:r,url:o,status:200,headers:new Headers({"Cache-Control":"no-cache"}),setHeader(f,t){return this.headers.set(f,t),this},removeHeader(f){return this.headers.delete(f),this},get ip(){return this.server.requestIP(this.req)?.address??null},get query(){if(!g)try{g=Object.fromEntries(this.url.searchParams)}catch(f){throw new Error("Failed to parse query parameters")}return g},get params(){if(!m&&this.req.routePattern)try{m=d(this.req.routePattern,this.url.pathname)}catch(f){throw new Error("Failed to extract route parameters")}return m??{}},get body(){if(this.req.method==="GET")return Promise.resolve({});if(!i)i=(async()=>{let f=await a(this.req);if(f.error)throw new Error(f.error);return Object.keys(f).length===0?null:f})();return i},set(f,t){return u[f]=t,this},get(f){return u[f]},text(f,t){if(t)this.status=t;if(!this.headers.has("Content-Type"))this.headers.set("Content-Type","text/plain; charset=utf-8");return new Response(f,{status:this.status,headers:this.headers})},send(f,t){if(t)this.status=t;let C=new Map([["string","text/plain; charset=utf-8"],["object","application/json; charset=utf-8"],["Uint8Array","application/octet-stream"],["ArrayBuffer","application/octet-stream"]]),v=f instanceof Uint8Array?"Uint8Array":f instanceof ArrayBuffer?"ArrayBuffer":typeof f;if(!this.headers.has("Content-Type"))this.headers.set("Content-Type",C.get(v)??"text/plain; charset=utf-8");let $=v==="object"&&f!==null?JSON.stringify(f):f;return new Response($,{status:this.status,headers:this.headers})},json(f,t){if(t)this.status=t;if(!this.headers.has("Content-Type"))this.headers.set("Content-Type","application/json; charset=utf-8");return Response.json(f,{status:this.status,headers:this.headers})},file(f,t,C){if(C)this.status=C;let v=Bun.file(f);if(!this.headers.has("Content-Type"))this.headers.set("Content-Type",t??x(f));return new Response(v,{status:this.status,headers:this.headers})},async ejs(f,t={},C){if(C)this.status=C;let v;try{v=await import("ejs"),v=v.default||v}catch($){return console.error("EJS not installed! Please run `bun add ejs`"),new Response("EJS not installed! Please run `bun add ejs`",{status:500})}try{let $=await Bun.file(f).text(),c=v.render($,t),E=new Headers({"Content-Type":"text/html; charset=utf-8"});return new Response(c,{status:this.status,headers:E})}catch($){return console.error("EJS Rendering Error:",$),new Response("Error rendering template",{status:500})}},redirect(f,t){if(t)this.status=t;else this.status=302;return this.headers.set("Location",f),new Response(null,{status:this.status,headers:this.headers})},stream(f){let t=new Headers(this.headers),C=new ReadableStream({async start(v){await f(v),v.close()}});return new Response(C,{headers:t})},yieldStream(f){return new Response({async*[Symbol.asyncIterator](){yield*f()}},{headers:this.headers})},setCookie(f,t,C={}){let v=`${encodeURIComponent(f)}=${encodeURIComponent(t)}`;if(C.maxAge)v+=`; Max-Age=${C.maxAge}`;if(C.expires)v+=`; Expires=${C.expires.toUTCString()}`;if(C.path)v+=`; Path=${C.path}`;if(C.domain)v+=`; Domain=${C.domain}`;if(C.secure)v+="; Secure";if(C.httpOnly)v+="; HttpOnly";if(C.sameSite)v+=`; SameSite=${C.sameSite}`;return this.headers.append("Set-Cookie",v),this},get cookies(){if(!s){let f=this.req.headers.get("cookie");s=f?h(f):{}}return s}}}function h(n){return Object.fromEntries(n.split(";").map((r)=>{let[o,...g]=r.trim().split("=");return[o,decodeURIComponent(g.join("="))]}))}function d(n,r){let o={},g=n.split("/"),[m]=r.split("?"),s=m.split("/");if(g.length!==s.length)return null;for(let i=0;i<g.length;i++)if(g[i].startsWith(":"))o[g[i].slice(1)]=s[i];return o}async function a(n){let r=n.headers.get("Content-Type");if(!r)return{};if(n.headers.get("Content-Length")==="0"||!n.body)return{};try{if(r.startsWith("application/json"))return await n.json();if(r.startsWith("application/x-www-form-urlencoded")){let g=await n.text();return Object.fromEntries(new URLSearchParams(g))}if(r.startsWith("multipart/form-data")){let g=await n.formData(),m={};for(let[s,i]of g.entries())m[s]=i;return m}return{error:"Unknown request body type"}}catch(g){return{error:"Invalid request body format"}}}async function G(n,r,o,g){let m=D(n,r,o),s=g.trie.search(o.pathname,n.method);n.routePattern=s?.path;try{if(o.pathname.startsWith("/favicon"))return;if(g.hasFilterEnabled){let f=n.routePattern??o.pathname,t=await nn(g,f,m,r);if(t)return t}if(g.hasMiddleware){if(g.globalMiddlewares.length){let t=await S(g.globalMiddlewares,m,r);if(t)return t}let f=g.middlewares.get(o.pathname)||[];if(f?.length){let t=await S(f,m,r);if(t)return t}}if(!s?.handler||s.method!==n.method){if(g.staticPath){let f=await rn(g,o.pathname,m);if(f)return f;let t=g.trie.search("*",n.method);if(t?.handler)return await t.handler(m)}if(g.hooks.routeNotFound&&Array.isArray(g.hooks.routeNotFound)&&!s?.handler){let f=g.hooks.routeNotFound;for(let t=0;t<f.length;t++){let C=await f[t](m);if(C)return C}}if(!s||!s?.handler?.length)return z(404,`Route not found for ${o.pathname}`);if(s?.method!==n.method)return z(405,"Method not allowed")}if(g.hooks.preHandler?.length&&Array.isArray(g.hooks.preHandler)){let f=g.hooks.preHandler;for(let t=0;t<f.length;t++){let C=await f[t](m);if(C)return C}}let i=s.handler(m);return(i instanceof Promise?await i:i)??z(204,"")}catch(i){if(g.hooks.onError&&Array.isArray(g.hooks.onError)){let u=g.hooks.onError;for(let f=0;f<u.length;f++){let t=g.hooks.onError[f](i,n,o,r);if(t)return t}}return z(500,"Internal Server Error")}finally{if(g.hooks.onSend&&Array.isArray(g.hooks.onSend)){let i=g.hooks.onSend;for(let u=0;u<i.length;u++){let f=await i[u](m);if(f)return f}}}}async function S(n,r,o){for(let g of n){let m=await g(r,o);if(m)return m}return null}async function nn(n,r,o,g){if(!n.filters.has(r))if(n.filterFunction.length)for(let m of n.filterFunction){let s=await m(o,g);if(s)return s}else return o.json({error:!0,message:"Protected route, authentication required",status:401},401)}function z(n,r){return new Response(JSON.stringify({error:!0,message:r,status:n}),{status:n,headers:{"Content-Type":"application/json"}})}async function rn(n,r,o){if(!n.staticPath)return null;let g=`${n.staticPath}${r}`;if(await Bun.file(g).exists()){let s=x(g);return o.file(g,s,200)}return null}var{create:on,defineProperty:Z,getOwnPropertyDescriptor:fn,getOwnPropertyNames:gn,getPrototypeOf:un}=Object,tn=Object.prototype.hasOwnProperty,mn=(n,r)=>()=>(r||n((r={exports:{}}).exports,r),r.exports),vn=(n,r,o,g)=>{if(r&&typeof r=="object"||typeof r=="function")for(let m of gn(r))!tn.call(n,m)&&m!==o&&Z(n,m,{get:()=>r[m],enumerable:!(g=fn(r,m))||g.enumerable});return n},sn=(n,r,o)=>(o=n!=null?on(un(n)):{},vn(r||!n||!n.__esModule?Z(o,"default",{value:n,enumerable:!0}):o,n)),Cn=mn((n,r)=>{function o(i){if(typeof i!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(i))}function g(i,u){for(var f="",t=0,C=-1,v=0,$,c=0;c<=i.length;++c){if(c<i.length)$=i.charCodeAt(c);else{if($===47)break;$=47}if($===47){if(!(C===c-1||v===1))if(C!==c-1&&v===2){if(f.length<2||t!==2||f.charCodeAt(f.length-1)!==46||f.charCodeAt(f.length-2)!==46){if(f.length>2){var E=f.lastIndexOf("/");if(E!==f.length-1){E===-1?(f="",t=0):(f=f.slice(0,E),t=f.length-1-f.lastIndexOf("/")),C=c,v=0;continue}}else if(f.length===2||f.length===1){f="",t=0,C=c,v=0;continue}}u&&(f.length>0?f+="/..":f="..",t=2)}else f.length>0?f+="/"+i.slice(C+1,c):f=i.slice(C+1,c),t=c-C-1;C=c,v=0}else $===46&&v!==-1?++v:v=-1}return f}function m(i,u){var f=u.dir||u.root,t=u.base||(u.name||"")+(u.ext||"");return f?f===u.root?f+t:f+i+t:t}var s={resolve:function(){for(var i="",u=!1,f,t=arguments.length-1;t>=-1&&!u;t--){var C;t>=0?C=arguments[t]:(f===void 0&&(f=process.cwd()),C=f),o(C),C.length!==0&&(i=C+"/"+i,u=C.charCodeAt(0)===47)}return i=g(i,!u),u?i.length>0?"/"+i:"/":i.length>0?i:"."},normalize:function(i){if(o(i),i.length===0)return".";var u=i.charCodeAt(0)===47,f=i.charCodeAt(i.length-1)===47;return i=g(i,!u),i.length===0&&!u&&(i="."),i.length>0&&f&&(i+="/"),u?"/"+i:i},isAbsolute:function(i){return o(i),i.length>0&&i.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var i,u=0;u<arguments.length;++u){var f=arguments[u];o(f),f.length>0&&(i===void 0?i=f:i+="/"+f)}return i===void 0?".":s.normalize(i)},relative:function(i,u){if(o(i),o(u),i===u||(i=s.resolve(i),u=s.resolve(u),i===u))return"";for(var f=1;f<i.length&&i.charCodeAt(f)===47;++f);for(var t=i.length,C=t-f,v=1;v<u.length&&u.charCodeAt(v)===47;++v);for(var $=u.length,c=$-v,E=C<c?C:c,w=-1,A=0;A<=E;++A){if(A===E){if(c>E){if(u.charCodeAt(v+A)===47)return u.slice(v+A+1);if(A===0)return u.slice(v+A)}else C>E&&(i.charCodeAt(f+A)===47?w=A:A===0&&(w=0));break}var K=i.charCodeAt(f+A),j=u.charCodeAt(v+A);if(K!==j)break;K===47&&(w=A)}var F="";for(A=f+w+1;A<=t;++A)(A===t||i.charCodeAt(A)===47)&&(F.length===0?F+="..":F+="/..");return F.length>0?F+u.slice(v+w):(v+=w,u.charCodeAt(v)===47&&++v,u.slice(v))},_makeLong:function(i){return i},dirname:function(i){if(o(i),i.length===0)return".";for(var u=i.charCodeAt(0),f=u===47,t=-1,C=!0,v=i.length-1;v>=1;--v)if(u=i.charCodeAt(v),u===47){if(!C){t=v;break}}else C=!1;return t===-1?f?"/":".":f&&t===1?"//":i.slice(0,t)},basename:function(i,u){if(u!==void 0&&typeof u!="string")throw new TypeError('"ext" argument must be a string');o(i);var f=0,t=-1,C=!0,v;if(u!==void 0&&u.length>0&&u.length<=i.length){if(u.length===i.length&&u===i)return"";var $=u.length-1,c=-1;for(v=i.length-1;v>=0;--v){var E=i.charCodeAt(v);if(E===47){if(!C){f=v+1;break}}else c===-1&&(C=!1,c=v+1),$>=0&&(E===u.charCodeAt($)?--$===-1&&(t=v):($=-1,t=c))}return f===t?t=c:t===-1&&(t=i.length),i.slice(f,t)}else{for(v=i.length-1;v>=0;--v)if(i.charCodeAt(v)===47){if(!C){f=v+1;break}}else t===-1&&(C=!1,t=v+1);return t===-1?"":i.slice(f,t)}},extname:function(i){o(i);for(var u=-1,f=0,t=-1,C=!0,v=0,$=i.length-1;$>=0;--$){var c=i.charCodeAt($);if(c===47){if(!C){f=$+1;break}continue}t===-1&&(C=!1,t=$+1),c===46?u===-1?u=$:v!==1&&(v=1):u!==-1&&(v=-1)}return u===-1||t===-1||v===0||v===1&&u===t-1&&u===f+1?"":i.slice(u,t)},format:function(i){if(i===null||typeof i!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof i);return m("/",i)},parse:function(i){o(i);var u={root:"",dir:"",base:"",ext:"",name:""};if(i.length===0)return u;var f=i.charCodeAt(0),t=f===47,C;t?(u.root="/",C=1):C=0;for(var v=-1,$=0,c=-1,E=!0,w=i.length-1,A=0;w>=C;--w){if(f=i.charCodeAt(w),f===47){if(!E){$=w+1;break}continue}c===-1&&(E=!1,c=w+1),f===46?v===-1?v=w:A!==1&&(A=1):v!==-1&&(A=-1)}return v===-1||c===-1||A===0||A===1&&v===c-1&&v===$+1?c!==-1&&($===0&&t?u.base=u.name=i.slice(1,c):u.base=u.name=i.slice($,c)):($===0&&t?(u.name=i.slice(1,v),u.base=i.slice(1,c)):(u.name=i.slice($,v),u.base=i.slice($,c)),u.ext=i.slice(v,c)),$>0?u.dir=i.slice(0,$-1):t&&(u.dir="/"),u},sep:"/",delimiter:":",win32:null,posix:null};s.posix=s,r.exports=s}),U=sn(Cn()),b=U,cn=U,X=function(n){return n},V=function(){throw new Error("Not implemented")};b.parse??=V;cn.parse??=V;var y={resolve:b.resolve.bind(b),normalize:b.normalize.bind(b),isAbsolute:b.isAbsolute.bind(b),join:b.join.bind(b),relative:b.relative.bind(b),toNamespacedPath:X,dirname:b.dirname.bind(b),basename:b.basename.bind(b),extname:b.extname.bind(b),format:b.format.bind(b),parse:b.parse.bind(b),sep:"/",delimiter:":",win32:void 0,posix:void 0,_makeLong:X},Y={sep:"\\",delimiter:";",win32:void 0,...y,posix:y};y.win32=Y.win32=Y;y.posix=y;var N=y;var{default:e}=(()=>({}));var L={reset:"\x1B[0m",info:"\x1B[34m",warn:"\x1B[33m",error:"\x1B[31m",method:{GET:"\x1B[32m",POST:"\x1B[36m",PUT:"\x1B[35m",DELETE:"\x1B[31m"}},W=(n,r,o)=>{let g=L[n]||L.reset,m=o?.method?L.method[o.method]||L.reset:L.reset,s=o?.status?o.status>=500?L.error:o.status>=400?L.warn:L.info:L.reset;console.log(`
${g}[${n.toUpperCase()}]${L.reset} ${r} - ${m}${o?.method||""}${L.reset}`);let i={timestamp:new Date().toISOString(),...o,status:o?.status?`${s}${o.status}${L.reset}`:void 0,method:o?.method?`${m}${o.method}${L.reset}`:void 0};console.log(JSON.stringify(i,null,2)+`
`)},B=(n)=>{n.addHooks("onRequest",async(r,o)=>{r.startTime=Date.now(),W("info","Incoming Request",{method:r.method,url:o.toString(),headers:{"user-agent":r.headers.get("user-agent"),"content-type":r.headers.get("Content-Type")}})}),n.addHooks("onSend",(r)=>{let o=`${Date.now()-r.req.startTime}ms`;W("info","Response Sent",{method:r.req.method,url:r.url,status:r.status,duration:o,headers:{"content-type":r.headers.get("Content-Type")}})})},R=(n,r,o,g=0,m)=>{let s=L.method[r]||L.reset,i=g>=500?L.error:g>=400?L.warn:L.info,u=n==="<--"?`${n} ${s}${r}${L.reset} ${o}`:`${n} ${s}${r}${L.reset} ${o} ${i}${g}${L.reset} ${m||""}`;console.log(u)},$n=(n)=>{let r=Date.now()-n;return r<1000?`${r}ms`:`${Math.round(r/1000)}s`},J=(n)=>{n.addHooks("onRequest",(r,o)=>{r.startTime=Date.now(),R("<--",r.method,new URL(o).pathname)}),n.addHooks("onSend",async(r)=>{let{method:o,url:g}=r.req,m=new URL(g).pathname;R("-->",o,m,r.status,$n(r.req.startTime))}),n.addHooks("routeNotFound",(r)=>{R("[routeNotFound]",r.req.method,r.url.pathname,404)}),n.addHooks("onError",(r,o,g)=>{R(r?.message,o.method,g.toString(),500)})};function I(n,r){if(!n)throw new Error("JWT library is not defined, please provide jwt to authenticateJwt Function");return(o)=>{try{let g=o.cookies?.accessToken||o.req?.headers?.get("Authorization");if(!g)return o.json({message:"Unauthorized: No token provided"},401);if(g.startsWith("Bearer "))g=g.slice(7);let m=n?.verify(g,r);if(!m)return o.json({message:"Unauthorized: Invalid token"},401);o.set("user",m)}catch(g){return console.error("JWT verification error:",g),o.json({message:"Unauthorized: Invalid token",error:g?.message},401)}}}function Q(n,r,o){if(!n)throw new Error("JWT library is not defined, please provide jwt to authenticateJwtDB Function");if(!r)throw new Error("User model is not defined, please provide UserModel to authenticateJwtDB Function");return async(g)=>{try{let m=g.cookies?.accessToken||g.req?.headers?.get("Authorization");if(!m)return g.json({message:"Unauthorized: No token provided"},401);if(m.startsWith("Bearer "))m=m.slice(7);let s=n?.verify(m,o);if(!s)return g.json({message:"Unauthorized: Invalid token"},401);let i=await r.findById(s._id).select("-password -refreshToken");if(!i)return g.json({message:"Unauthorized: User not found"},401);g.set("user",i);return}catch(m){return g.json({message:"Unauthorized: Authentication failed",error:m?.message},401)}}}class _{tempRoutes;globalMiddlewares;middlewares;trie;hasOnReqHook;hasMiddleware;hasPreHandlerHook;hasPostHandlerHook;hasOnSendHook;hasOnError;hooks;corsConfig;FilterRoutes;filters;filterFunction;hasFilterEnabled;serverInstance;staticPath;staticFiles;user_jwt_secret;baseApiUrl;enableFileRouter;idleTimeOut;constructor({jwtSecret:n,baseApiUrl:r,enableFileRouting:o,idleTimeOut:g}={}){this.idleTimeOut=g??10,this.enableFileRouter=o??!1,this.baseApiUrl=r||"",this.user_jwt_secret=n||process.env.DIESEL_JWT_SECRET||"feault_diesel_secret_for_jwt",this.tempRoutes=new Map,this.globalMiddlewares=[],this.middlewares=new Map,this.trie=new T,this.corsConfig=null,this.hasMiddleware=!1,this.hasOnReqHook=!1,this.hasPreHandlerHook=!1,this.hasPostHandlerHook=!1,this.hasOnSendHook=!1,this.hasOnError=!1,this.hooks={onRequest:[],preHandler:[],postHandler:[],onSend:[],onError:[],onClose:[],routeNotFound:[]},this.FilterRoutes=[],this.filters=new Set,this.filterFunction=[],this.hasFilterEnabled=!1,this.serverInstance=null,this.staticPath=null,this.staticFiles={}}setupFilter(){return this.hasFilterEnabled=!0,{routeMatcher:(...n)=>{return this.FilterRoutes=n,this.setupFilter()},permitAll:()=>{for(let n of this?.FilterRoutes)this.filters.add(n);return this.FilterRoutes=null,this.setupFilter()},authenticate:(n)=>{if(n?.length)for(let r of n)this.filterFunction.push(r)},authenticateJwt:(n)=>{this.filterFunction.push(I(n,this.user_jwt_secret))},authenticateJwtDB:(n,r)=>{this.filterFunction.push(Q(n,r,this.user_jwt_secret))}}}redirect(n,r,o){return this.any(n,(g)=>{let m=g.params,s=r;if(m)for(let u in m)s=s.replace(`:${u}`,m[u]);let i=g.url.search;if(i)s+=i;return g.redirect(s,o)}),this}serveStatic(n){return this.staticPath=n,this}static(n){return this.staticFiles={...this.staticFiles,...n},this}addHooks(n,r){if(typeof n!=="string")throw new Error("hookName must be a string");if(typeof r!=="function")throw new Error("callback must be a instance of function");switch(n){case"onRequest":this.hooks.onRequest?.push(r);break;case"preHandler":this.hooks.preHandler?.push(r);break;case"postHandler":this.hooks.postHandler?.push(r);break;case"onSend":this.hooks.onSend?.push(r);break;case"onError":this.hooks.onError?.push(r);break;case"onClose":this.hooks.onClose?.push(r);break;case"routeNotFound":this.hooks.routeNotFound?.push(r);break;default:throw new Error(`Unknown hook type: ${n}`)}return this}compile(){if(this.globalMiddlewares.length>0)this.hasMiddleware=!0;for(let[n,r]of this.middlewares.entries())if(r.length>0){this.hasMiddleware=!0;break}if(this.enableFileRouter){let n=process.cwd(),r=N.join(n,"src","routes");if(e?.existsSync(r))this.loadRoutes(r,"")}setTimeout(()=>{this.tempRoutes=null},2000)}async registerFileRoutes(n,r,o){let g=await import(n),m;if(o===".ts")m=N.basename(n,".ts");else if(o===".js")m=N.basename(n,".js");let s=r+"/"+m;if(s.endsWith("/index"))s=r;else if(s.endsWith("/api"))s=r;s=s.replace(/\[(.*?)\]/g,":$1");let i=["GET","POST","PUT","PATCH","DELETE","ANY","HEAD","OPTIONS","PROPFIND"];for(let u of i)if(g[u]){let f=u.toLowerCase(),t=g[u];this[f](`${this.baseApiUrl}${s}`,t)}}async loadRoutes(n,r){let o=await e.promises.readdir(n);for(let g of o){let m=N.join(n,g);if((await e.promises.stat(m)).isDirectory())this.loadRoutes(m,r+"/"+g);else if(g.endsWith(".ts"))this.registerFileRoutes(m,r,".ts");else if(g.endsWith(".js"))this.registerFileRoutes(m,r,".js")}}useLogger(n){return J(n),this}useAdvancedLogger(n){return B(n),this}listen(n,...r){if(typeof Bun==="undefined")throw new Error(".listen() is designed to run on Bun only...");let o="0.0.0.0",g=void 0,m={};for(let i of r)if(typeof i==="string")o=i;else if(typeof i==="function")g=i;else if(typeof i==="object"&&i!==null)m=i;this.compile();let s={port:n,hostname:o,idleTimeOut:this.idleTimeOut,fetch:async(i,u)=>{let f=new URL(i.url);if(this.hooks.onRequest){let t=this.hooks.onRequest;for(let C=0;C<t.length;C++)await t[C](i,f,u)}return G(i,u,f,this)},static:this.staticFiles};if(m.sslCert&&m.sslKey)s.certFile=m.sslCert,s.keyFile=m.sslKey;if(this.serverInstance=Bun?.serve(s),m.sslCert&&m.sslKey)console.log(`HTTPS server is running on https://localhost:${n}`);if(g)return g();return this.serverInstance}close(n){if(this.serverInstance)this.serverInstance.stop(!0),this.serverInstance=null,n?n():console.log("Server has been stopped");else console.warn("Server is not running.")}route(n,r){if(!n||typeof n!=="string")throw new Error("Path must be a string");let o=Object.fromEntries(r.tempRoutes);return Object.entries(o).forEach(([m,s])=>{let i=m.replace(/::\w+$/,""),u=`${n}${i}`;if(!this.middlewares.has(u))this.middlewares.set(u,[]);s.handlers.slice(0,-1).forEach((v)=>{if(!this.middlewares.get(u)?.includes(v))this.middlewares.get(u)?.push(v)});let t=s.handlers[s.handlers.length-1],C=s.method;try{this.trie.insert(u,{handler:t,method:C})}catch(v){console.error(`Error inserting ${u}:`,v)}}),r=null,this}register(n,r){return this.route(n,r)}addRoute(n,r,o){if(typeof r!=="string")throw new Error(`Error in ${o[o.length-1]}: Path must be a string. Received: ${typeof r}`);if(typeof n!=="string")throw new Error(`Error in addRoute: Method must be a string. Received: ${typeof n}`);this.tempRoutes?.set(r+"::"+n,{method:n,handlers:o});let g=o.slice(0,-1),m=o[o.length-1];if(!this.middlewares.has(r))this.middlewares.set(r,[]);g.forEach((s)=>{if(r==="/")this.globalMiddlewares=[...new Set([...this.globalMiddlewares,...g])];else if(!this.middlewares.get(r)?.includes(s))this.middlewares.get(r)?.push(s)});try{if(n==="ANY"){let s=["GET","POST","PUT","DELETE","PATCH","OPTIONS","HEAD","PROPFIND"];for(let i of s)this.trie.insert(r,{handler:m,method:i})}this.trie.insert(r,{handler:m,method:n})}catch(s){console.error(`Error inserting ${r}:`,s)}}use(n,r){if(Array.isArray(n))n.forEach((g)=>{if(typeof g==="function")this.globalMiddlewares.push(g)});if(typeof n==="function"){if(this.globalMiddlewares.push(n),Array.isArray(r))r.forEach((g)=>{this.globalMiddlewares.push(g)});return}return(Array.isArray(n)?n.filter((g)=>typeof g==="string"):[n].filter((g)=>typeof g==="string")).forEach((g)=>{if(!this.middlewares.has(g))this.middlewares.set(g,[]);if(r)(Array.isArray(r)?r:[r]).forEach((s)=>{this.middlewares.get(g)?.push(s)})}),this}get(n,...r){return this.addRoute("GET",n,r),this}post(n,...r){return this.addRoute("POST",n,r),this}put(n,...r){return this.addRoute("PUT",n,r),this}patch(n,...r){return this.addRoute("PATCH",n,r),this}delete(n,...r){return this.addRoute("DELETE",n,r),this}any(n,...r){return this.addRoute("ANY",n,r),this}head(n,...r){return this.addRoute("HEAD",n,r),this}options(n,...r){return this.addRoute("OPTIONS",n,r),this}propfind(n,...r){return this.addRoute("PROPFIND",n,r),this}}export{_ as default};
