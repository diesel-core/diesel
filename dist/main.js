var P=Object.create;var{getPrototypeOf:l,defineProperty:Y,getOwnPropertyNames:k}=Object;var e=Object.prototype.hasOwnProperty;var p=(n,i,f)=>{f=n!=null?P(l(n)):{};let g=i||!n||!n.__esModule?Y(f,"default",{value:n,enumerable:!0}):f;for(let t of k(n))if(!e.call(g,t))Y(g,t,{get:()=>n[t],enumerable:!0});return g};var h=((n)=>typeof require!=="undefined"?require:typeof Proxy!=="undefined"?new Proxy(n,{get:(i,f)=>(typeof require!=="undefined"?require:i)[f]}):n)(function(n){if(typeof require!=="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+n+'" is not supported')});class S{children;isEndOfWord;handler;isDynamic;pattern;path;method;constructor(){this.children={},this.isEndOfWord=!1,this.handler=[],this.isDynamic=!1,this.pattern="",this.path="",this.method=[]}}class z{root;constructor(){this.root=new S}insert(n,i){let f=this.root,g=n.split("/").filter(Boolean);if(n==="/"){f.isEndOfWord=!0,f.handler.push(i.handler),f.path=n,f.method.push(i.method);return}for(let t of g){let m=!1,o=t;if(t.startsWith(":"))m=!0,o=":";if(!f.children[o])f.children[o]=new S;f=f.children[o],f.isDynamic=m,f.pattern=t}f.isEndOfWord=!0,f.path=n,f.method.push(i.method),f.handler.push(i.handler)}search(n,i){let f=this.root,g=n.split("/").filter(Boolean),t=g.length;for(let u of g){let r=u;if(!f.children[r])if(f.children[":"])f=f.children[":"];else return null;else f=f.children[r]}let m=f.path.split("/").filter(Boolean);if(t!==m.length)return null;let o=f.method.indexOf(i);if(o!==-1)return{path:f.path,handler:f.handler[o],isDynamic:f.isDynamic,pattern:f.pattern,method:f.method[o]};return{path:f.path,handler:f.handler,isDynamic:f.isDynamic,pattern:f.pattern,method:f.method[o]}}}function w(n){switch(n.split(".").pop()?.toLowerCase()){case"js":return"application/javascript";case"css":return"text/css";case"html":return"text/html";case"json":return"application/json";case"png":return"image/png";case"jpg":case"jpeg":return"image/jpeg";case"svg":return"image/svg+xml";case"gif":return"image/gif";case"woff":return"font/woff";case"woff2":return"font/woff2";default:return"application/octet-stream"}}function G(n,i,f){let g=null,t=null,m=null,o=null,u={};return{req:n,server:i,url:f,status:200,headers:new Headers({"Cache-Control":"no-cache"}),setHeader(r,c){return this.headers.set(r,c),this},removeHeader(r){return this.headers.delete(r),this},get ip(){return this.server.requestIP(this.req)?.address??null},get query(){if(!g)try{g=Object.fromEntries(this.url.searchParams)}catch(r){throw new Error("Failed to parse query parameters")}return g},get params(){if(!t&&this.req.routePattern)try{t=a(this.req.routePattern,this.url.pathname)}catch(r){throw new Error("Failed to extract route parameters")}return t??{}},get body(){if(this.req.method==="GET")return Promise.resolve({});if(!o)o=(async()=>{let r=await nn(this.req);if(r.error)throw new Error(r.error);return Object.keys(r).length===0?null:r})();return o},set(r,c){return u[r]=c,this},get(r){return u[r]},text(r,c){if(c)this.status=c;if(!this.headers.has("Content-Type"))this.headers.set("Content-Type","text/plain; charset=utf-8");return new Response(r,{status:this.status,headers:this.headers})},send(r,c){if(c)this.status=c;let v=new Map([["string","text/plain; charset=utf-8"],["object","application/json; charset=utf-8"],["Uint8Array","application/octet-stream"],["ArrayBuffer","application/octet-stream"]]),C=r instanceof Uint8Array?"Uint8Array":r instanceof ArrayBuffer?"ArrayBuffer":typeof r;if(!this.headers.has("Content-Type"))this.headers.set("Content-Type",v.get(C)??"text/plain; charset=utf-8");let A=C==="object"&&r!==null?JSON.stringify(r):r;return new Response(A,{status:this.status,headers:this.headers})},json(r,c){if(c)this.status=c;if(!this.headers.has("Content-Type"))this.headers.set("Content-Type","application/json; charset=utf-8");return Response.json(r,{status:this.status,headers:this.headers})},file(r,c,v){if(v)this.status=v;let C=Bun.file(r);if(!this.headers.has("Content-Type"))this.headers.set("Content-Type",c??w(r));return new Response(C,{status:this.status,headers:this.headers})},async ejs(r,c={},v){if(v)this.status=v;let C;try{C=await import("ejs"),C=C.default||C}catch(A){return console.error("EJS not installed! Please run `bun add ejs`"),new Response("EJS not installed! Please run `bun add ejs`",{status:500})}try{let A=await Bun.file(r).text(),$=C.render(A,c),F=new Headers({"Content-Type":"text/html; charset=utf-8"});return new Response($,{status:this.status,headers:F})}catch(A){return console.error("EJS Rendering Error:",A),new Response("Error rendering template",{status:500})}},redirect(r,c){if(c)this.status=c;else this.status=302;return this.headers.set("Location",r),new Response(null,{status:this.status,headers:this.headers})},stream(r){let c=new Headers(this.headers),v=new ReadableStream({async start(C){await r(C),C.close()}});return new Response(v,{headers:c})},yieldStream(r){return new Response({async*[Symbol.asyncIterator](){yield*r()}},{headers:this.headers})},setCookie(r,c,v={}){let C=`${encodeURIComponent(r)}=${encodeURIComponent(c)}`;if(v.maxAge)C+=`; Max-Age=${v.maxAge}`;if(v.expires)C+=`; Expires=${v.expires.toUTCString()}`;if(v.path)C+=`; Path=${v.path}`;if(v.domain)C+=`; Domain=${v.domain}`;if(v.secure)C+="; Secure";if(v.httpOnly)C+="; HttpOnly";if(v.sameSite)C+=`; SameSite=${v.sameSite}`;return this.headers.append("Set-Cookie",C),this},get cookies(){if(!m){let r=this.req.headers.get("cookie");m=r?d(r):{}}return m}}}function d(n){return Object.fromEntries(n.split(";").map((i)=>{let[f,...g]=i.trim().split("=");return[f,decodeURIComponent(g.join("="))]}))}function a(n,i){let f={},g=n.split("/"),[t]=i.split("?"),m=t.split("/");if(g.length!==m.length)return null;for(let o=0;o<g.length;o++)if(g[o].startsWith(":"))f[g[o].slice(1)]=m[o];return f}async function nn(n){let i=n.headers.get("Content-Type");if(!i)return{};if(n.headers.get("Content-Length")==="0"||!n.body)return{};try{if(i.startsWith("application/json"))return await n.json();if(i.startsWith("application/x-www-form-urlencoded")){let g=await n.text();return Object.fromEntries(new URLSearchParams(g))}if(i.startsWith("multipart/form-data")){let g=await n.formData(),t={};for(let[m,o]of g.entries())t[m]=o;return t}return{error:"Unknown request body type"}}catch(g){return{error:"Invalid request body format"}}}async function R(n,i,f,g){let t=G(n,i,f),m=g.trie.search(f.pathname,n.method);n.routePattern=m?.path;try{if(f.pathname.startsWith("/favicon"))return t.text("");if(g.hasFilterEnabled){let r=n.routePattern??f.pathname,c=await on(g,r,t,i);if(c)return c}if(g.hasMiddleware){if(g.globalMiddlewares.length){let c=await Z(g.globalMiddlewares,t,i);if(c)return c}let r=g.middlewares.get(f.pathname)||[];if(r?.length){let c=await Z(r,t,i);if(c)return c}}if(!m?.handler||m.method!==n.method){if(g.staticPath){let r=await fn(g,f.pathname,t);if(r)return r;let c=g.trie.search("*",n.method);if(c?.handler)return await c.handler(t)}if(g.hooks.routeNotFound&&Array.isArray(g.hooks.routeNotFound)&&!m?.handler){let r=g.hooks.routeNotFound;for(let c=0;c<r.length;c++){let v=await r[c](t);if(v)return v}}if(!m||!m?.handler?.length)return D(404,`Route not found for ${f.pathname}`);if(m?.method!==n.method)return D(405,"Method not allowed")}if(g.hooks.preHandler?.length&&Array.isArray(g.hooks.preHandler)){let r=g.hooks.preHandler;for(let c=0;c<r.length;c++){let v=await r[c](t);if(v)return v}}let o=m.handler(t);return(o instanceof Promise?await o:o)??D(204,"")}catch(o){if(g.hooks.onError&&Array.isArray(g.hooks.onError)){let u=g.hooks.onError;for(let r=0;r<u.length;r++){let c=g.hooks.onError[r](o,n,f,i);if(c)return c}}return D(500,"Internal Server Error")}finally{if(g.hooks.onSend&&Array.isArray(g.hooks.onSend)){let o=g.hooks.onSend;for(let u=0;u<o.length;u++){let r=await o[u](t);if(r)return r}}}}async function Z(n,i,f){for(let g of n){let t=await g(i,f);if(t)return t}return null}async function N(n,i,f){for(let g of n){let t=await g(i,f);if(t)return t}}async function on(n,i,f,g){if(!n.filters.has(i))if(n.filterFunction.length)for(let t of n.filterFunction){let m=await t(f,g);if(m)return m}else return Response.json({error:!0,message:"Protected route, authentication required",status:401},{status:401})}async function Tn(n,i,f,g){if(!n.filters.has(i))if(n.filterFunction.length)for(let t of n.filterFunction){let m=await t(f,g);if(m)return m}else return Response.json({error:!0,message:"Protected route, authentication required",status:401},{status:401})}function D(n,i){return new Response(JSON.stringify({error:!0,message:i,status:n}),{status:n,headers:{"Content-Type":"application/json"}})}async function fn(n,i,f){if(!n.staticPath)return null;let g=`${n.staticPath}${i}`;if(await Bun.file(g).exists()){let m=w(g);return f.file(g,m,200)}return null}var{create:rn,defineProperty:W,getOwnPropertyDescriptor:gn,getOwnPropertyNames:un,getPrototypeOf:tn}=Object,cn=Object.prototype.hasOwnProperty,mn=(n,i)=>()=>(i||n((i={exports:{}}).exports,i),i.exports),Cn=(n,i,f,g)=>{if(i&&typeof i=="object"||typeof i=="function")for(let t of un(i))!cn.call(n,t)&&t!==f&&W(n,t,{get:()=>i[t],enumerable:!(g=gn(i,t))||g.enumerable});return n},vn=(n,i,f)=>(f=n!=null?rn(tn(n)):{},Cn(i||!n||!n.__esModule?W(f,"default",{value:n,enumerable:!0}):f,n)),$n=mn((n,i)=>{function f(o){if(typeof o!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(o))}function g(o,u){for(var r="",c=0,v=-1,C=0,A,$=0;$<=o.length;++$){if($<o.length)A=o.charCodeAt($);else{if(A===47)break;A=47}if(A===47){if(!(v===$-1||C===1))if(v!==$-1&&C===2){if(r.length<2||c!==2||r.charCodeAt(r.length-1)!==46||r.charCodeAt(r.length-2)!==46){if(r.length>2){var F=r.lastIndexOf("/");if(F!==r.length-1){F===-1?(r="",c=0):(r=r.slice(0,F),c=r.length-1-r.lastIndexOf("/")),v=$,C=0;continue}}else if(r.length===2||r.length===1){r="",c=0,v=$,C=0;continue}}u&&(r.length>0?r+="/..":r="..",c=2)}else r.length>0?r+="/"+o.slice(v+1,$):r=o.slice(v+1,$),c=$-v-1;v=$,C=0}else A===46&&C!==-1?++C:C=-1}return r}function t(o,u){var r=u.dir||u.root,c=u.base||(u.name||"")+(u.ext||"");return r?r===u.root?r+c:r+o+c:c}var m={resolve:function(){for(var o="",u=!1,r,c=arguments.length-1;c>=-1&&!u;c--){var v;c>=0?v=arguments[c]:(r===void 0&&(r=process.cwd()),v=r),f(v),v.length!==0&&(o=v+"/"+o,u=v.charCodeAt(0)===47)}return o=g(o,!u),u?o.length>0?"/"+o:"/":o.length>0?o:"."},normalize:function(o){if(f(o),o.length===0)return".";var u=o.charCodeAt(0)===47,r=o.charCodeAt(o.length-1)===47;return o=g(o,!u),o.length===0&&!u&&(o="."),o.length>0&&r&&(o+="/"),u?"/"+o:o},isAbsolute:function(o){return f(o),o.length>0&&o.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var o,u=0;u<arguments.length;++u){var r=arguments[u];f(r),r.length>0&&(o===void 0?o=r:o+="/"+r)}return o===void 0?".":m.normalize(o)},relative:function(o,u){if(f(o),f(u),o===u||(o=m.resolve(o),u=m.resolve(u),o===u))return"";for(var r=1;r<o.length&&o.charCodeAt(r)===47;++r);for(var c=o.length,v=c-r,C=1;C<u.length&&u.charCodeAt(C)===47;++C);for(var A=u.length,$=A-C,F=v<$?v:$,y=-1,L=0;L<=F;++L){if(L===F){if($>F){if(u.charCodeAt(C+L)===47)return u.slice(C+L+1);if(L===0)return u.slice(C+L)}else v>F&&(o.charCodeAt(r+L)===47?y=L:L===0&&(y=0));break}var X=o.charCodeAt(r+L),q=u.charCodeAt(C+L);if(X!==q)break;X===47&&(y=L)}var x="";for(L=r+y+1;L<=c;++L)(L===c||o.charCodeAt(L)===47)&&(x.length===0?x+="..":x+="/..");return x.length>0?x+u.slice(C+y):(C+=y,u.charCodeAt(C)===47&&++C,u.slice(C))},_makeLong:function(o){return o},dirname:function(o){if(f(o),o.length===0)return".";for(var u=o.charCodeAt(0),r=u===47,c=-1,v=!0,C=o.length-1;C>=1;--C)if(u=o.charCodeAt(C),u===47){if(!v){c=C;break}}else v=!1;return c===-1?r?"/":".":r&&c===1?"//":o.slice(0,c)},basename:function(o,u){if(u!==void 0&&typeof u!="string")throw new TypeError('"ext" argument must be a string');f(o);var r=0,c=-1,v=!0,C;if(u!==void 0&&u.length>0&&u.length<=o.length){if(u.length===o.length&&u===o)return"";var A=u.length-1,$=-1;for(C=o.length-1;C>=0;--C){var F=o.charCodeAt(C);if(F===47){if(!v){r=C+1;break}}else $===-1&&(v=!1,$=C+1),A>=0&&(F===u.charCodeAt(A)?--A===-1&&(c=C):(A=-1,c=$))}return r===c?c=$:c===-1&&(c=o.length),o.slice(r,c)}else{for(C=o.length-1;C>=0;--C)if(o.charCodeAt(C)===47){if(!v){r=C+1;break}}else c===-1&&(v=!1,c=C+1);return c===-1?"":o.slice(r,c)}},extname:function(o){f(o);for(var u=-1,r=0,c=-1,v=!0,C=0,A=o.length-1;A>=0;--A){var $=o.charCodeAt(A);if($===47){if(!v){r=A+1;break}continue}c===-1&&(v=!1,c=A+1),$===46?u===-1?u=A:C!==1&&(C=1):u!==-1&&(C=-1)}return u===-1||c===-1||C===0||C===1&&u===c-1&&u===r+1?"":o.slice(u,c)},format:function(o){if(o===null||typeof o!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof o);return t("/",o)},parse:function(o){f(o);var u={root:"",dir:"",base:"",ext:"",name:""};if(o.length===0)return u;var r=o.charCodeAt(0),c=r===47,v;c?(u.root="/",v=1):v=0;for(var C=-1,A=0,$=-1,F=!0,y=o.length-1,L=0;y>=v;--y){if(r=o.charCodeAt(y),r===47){if(!F){A=y+1;break}continue}$===-1&&(F=!1,$=y+1),r===46?C===-1?C=y:L!==1&&(L=1):C!==-1&&(L=-1)}return C===-1||$===-1||L===0||L===1&&C===$-1&&C===A+1?$!==-1&&(A===0&&c?u.base=u.name=o.slice(1,$):u.base=u.name=o.slice(A,$)):(A===0&&c?(u.name=o.slice(1,C),u.base=o.slice(1,$)):(u.name=o.slice(A,C),u.base=o.slice(A,$)),u.ext=o.slice(C,$)),A>0?u.dir=o.slice(0,A-1):c&&(u.dir="/"),u},sep:"/",delimiter:":",win32:null,posix:null};m.posix=m,i.exports=m}),B=vn($n()),E=B,An=B,U=function(n){return n},J=function(){throw new Error("Not implemented")};E.parse??=J;An.parse??=J;var s={resolve:E.resolve.bind(E),normalize:E.normalize.bind(E),isAbsolute:E.isAbsolute.bind(E),join:E.join.bind(E),relative:E.relative.bind(E),toNamespacedPath:U,dirname:E.dirname.bind(E),basename:E.basename.bind(E),extname:E.extname.bind(E),format:E.format.bind(E),parse:E.parse.bind(E),sep:"/",delimiter:":",win32:void 0,posix:void 0,_makeLong:U},V={sep:"\\",delimiter:";",win32:void 0,...s,posix:s};s.win32=V.win32=V;s.posix=s;var T=s;var{default:K}=(()=>({}));var b={reset:"\x1B[0m",info:"\x1B[34m",warn:"\x1B[33m",error:"\x1B[31m",method:{GET:"\x1B[32m",POST:"\x1B[36m",PUT:"\x1B[35m",DELETE:"\x1B[31m"}},I=(n,i,f)=>{let g=b[n]||b.reset,t=f?.method?b.method[f.method]||b.reset:b.reset,m=f?.status?f.status>=500?b.error:f.status>=400?b.warn:b.info:b.reset;console.log(`
${g}[${n.toUpperCase()}]${b.reset} ${i} - ${t}${f?.method||""}${b.reset}`);let o={timestamp:new Date().toISOString(),...f,status:f?.status?`${m}${f.status}${b.reset}`:void 0,method:f?.method?`${t}${f.method}${b.reset}`:void 0};console.log(JSON.stringify(o,null,2)+`
`)},Q=(n)=>{n.addHooks("onRequest",async(i,f)=>{i.startTime=Date.now(),I("info","Incoming Request",{method:i.method,url:f.toString(),headers:{"user-agent":i.headers.get("user-agent"),"content-type":i.headers.get("Content-Type")}})}),n.addHooks("onSend",(i)=>{let f=`${Date.now()-i.req.startTime}ms`;I("info","Response Sent",{method:i.req.method,url:i.url,status:i.status,duration:f,headers:{"content-type":i.headers.get("Content-Type")}})})},O=(n,i,f,g=0,t)=>{let m=b.method[i]||b.reset,o=g>=500?b.error:g>=400?b.warn:b.info,u=n==="<--"?`${n} ${m}${i}${b.reset} ${f}`:`${n} ${m}${i}${b.reset} ${f} ${o}${g}${b.reset} ${t||""}`;console.log(u)},Ln=(n)=>{let i=Date.now()-n;return i<1000?`${i}ms`:`${Math.round(i/1000)}s`},_=(n)=>{n.addHooks("onRequest",(i,f)=>{i.startTime=Date.now(),O("<--",i.method,new URL(f).pathname)}),n.addHooks("onSend",async(i)=>{let{method:f,url:g}=i.req,t=new URL(g).pathname;O("-->",f,t,i.status,Ln(i.req.startTime))}),n.addHooks("routeNotFound",(i)=>{O("[routeNotFound]",i.req.method,i.url.pathname,404)}),n.addHooks("onError",(i,f,g)=>{O(i?.message,f.method,g.toString(),500)})};function j(n,i){if(!n)throw new Error("JWT library is not defined, please provide jwt to authenticateJwt Function");return(f)=>{try{let g=f.cookies?.accessToken||f.req?.headers?.get("Authorization");if(!g)return f.json({message:"Unauthorized: No token provided"},401);if(g.startsWith("Bearer "))g=g.slice(7);let t=n?.verify(g,i);if(!t)return f.json({message:"Unauthorized: Invalid token"},401);f.set("user",t)}catch(g){return console.error("JWT verification error:",g),f.json({message:"Unauthorized: Invalid token",error:g?.message},401)}}}function H(n,i,f){if(!n)throw new Error("JWT library is not defined, please provide jwt to authenticateJwtDB Function");if(!i)throw new Error("User model is not defined, please provide UserModel to authenticateJwtDB Function");return async(g)=>{try{let t=g.cookies?.accessToken||g.req?.headers?.get("Authorization");if(!t)return g.json({message:"Unauthorized: No token provided"},401);if(t.startsWith("Bearer "))t=t.slice(7);let m=n?.verify(t,f);if(!m)return g.json({message:"Unauthorized: Invalid token"},401);let o=await i.findById(m._id).select("-password -refreshToken");if(!o)return g.json({message:"Unauthorized: User not found"},401);g.set("user",o);return}catch(t){return g.json({message:"Unauthorized: Authentication failed",error:t?.message},401)}}}class M{routes;tempRoutes;globalMiddlewares;middlewares;trie;hasOnReqHook;hasMiddleware;hasPreHandlerHook;hasPostHandlerHook;hasOnSendHook;hasOnError;hooks;corsConfig;FilterRoutes;filters;filterFunction;hasFilterEnabled;serverInstance;staticPath;staticFiles;user_jwt_secret;baseApiUrl;enableFileRouter;idleTimeOut;constructor({jwtSecret:n,baseApiUrl:i,enableFileRouting:f,idleTimeOut:g}={}){this.routes={},this.idleTimeOut=g??10,this.enableFileRouter=f??!1,this.baseApiUrl=i||"",this.user_jwt_secret=n||process.env.DIESEL_JWT_SECRET||"feault_diesel_secret_for_jwt",this.tempRoutes=new Map,this.globalMiddlewares=[],this.middlewares=new Map,this.trie=new z,this.corsConfig=null,this.hasMiddleware=!1,this.hasOnReqHook=!1,this.hasPreHandlerHook=!1,this.hasPostHandlerHook=!1,this.hasOnSendHook=!1,this.hasOnError=!1,this.hooks={onRequest:[],preHandler:[],postHandler:[],onSend:[],onError:[],onClose:[],routeNotFound:[]},this.FilterRoutes=[],this.filters=new Set,this.filterFunction=[],this.hasFilterEnabled=!1,this.serverInstance=null,this.staticPath=null,this.staticFiles={}}setupFilter(){return this.hasFilterEnabled=!0,{routeMatcher:(...n)=>{return this.FilterRoutes=n,this.setupFilter()},permitAll:()=>{for(let n of this?.FilterRoutes)this.filters.add(n);return this.FilterRoutes=null,this.setupFilter()},authenticate:(n)=>{if(n?.length)for(let i of n)this.filterFunction.push(i)},authenticateJwt:(n)=>{this.filterFunction.push(j(n,this.user_jwt_secret))},authenticateJwtDB:(n,i)=>{this.filterFunction.push(H(n,i,this.user_jwt_secret))}}}redirect(n,i,f){return this.any(n,(g)=>{let t=g.params,m=i;if(t)for(let u in t)m=m.replace(`:${u}`,t[u]);let o=g.url.search;if(o)m+=o;return g.redirect(m,f)}),this}serveStatic(n){return this.staticPath=n,this}static(n){return this.staticFiles={...this.staticFiles,...n},this}addHooks(n,i){if(typeof n!=="string")throw new Error("hookName must be a string");if(typeof i!=="function")throw new Error("callback must be a instance of function");switch(n){case"onRequest":this.hooks.onRequest?.push(i);break;case"preHandler":this.hooks.preHandler?.push(i);break;case"postHandler":this.hooks.postHandler?.push(i);break;case"onSend":this.hooks.onSend?.push(i);break;case"onError":this.hooks.onError?.push(i);break;case"onClose":this.hooks.onClose?.push(i);break;case"routeNotFound":this.hooks.routeNotFound?.push(i);break;default:throw new Error(`Unknown hook type: ${n}`)}return this}compile(){if(this.globalMiddlewares.length>0)this.hasMiddleware=!0;for(let[n,i]of this.middlewares.entries())if(i.length>0){this.hasMiddleware=!0;break}if(this.enableFileRouter){let n=process.cwd(),i=T.join(n,"src","routes");if(K?.existsSync(i))this.loadRoutes(i,"")}setTimeout(()=>{this.tempRoutes=null},2000)}async registerFileRoutes(n,i,f){let g=await import(n),t;if(f===".ts")t=T.basename(n,".ts");else if(f===".js")t=T.basename(n,".js");let m=i+"/"+t;if(m.endsWith("/index"))m=i;else if(m.endsWith("/api"))m=i;m=m.replace(/\[(.*?)\]/g,":$1");let o=["GET","POST","PUT","PATCH","DELETE","ANY","HEAD","OPTIONS","PROPFIND"];for(let u of o)if(g[u]){let r=u.toLowerCase(),c=g[u];this[r](`${this.baseApiUrl}${m}`,c)}}async loadRoutes(n,i){let f=await K.promises.readdir(n);for(let g of f){let t=T.join(n,g);if((await K.promises.stat(t)).isDirectory())this.loadRoutes(t,i+"/"+g);else if(g.endsWith(".ts"))this.registerFileRoutes(t,i,".ts");else if(g.endsWith(".js"))this.registerFileRoutes(t,i,".js")}}useLogger(n){return _(n),this}useAdvancedLogger(n){return Q(n),this}BunRoute(n,i,...f){if(!i||typeof i!=="string")throw new Error("give a path in string format");if(f.length===1){let g=f[0];this.routes[i]=async(t,m)=>{if(this.hasMiddleware){if(this.globalMiddlewares.length){let r=await N(this.globalMiddlewares,t,m);if(r)return r}let u=this.middlewares.get(i)||[];if(u?.length){let r=await N(u,t,m);if(r)return r}}if(n!==t.method)return new Response("Method Not Allowed",{status:405});let o=await g(t,m);if(o instanceof Promise)return await o??new Response("Not Found",{status:404});return o??new Response("Not Found",{status:404})}}else this.routes[i]=async(g,t)=>{if(this.hasMiddleware){if(this.globalMiddlewares.length){let o=await N(this.globalMiddlewares,g,t);if(o)return o}let m=this.middlewares.get(i)||[];if(m?.length){let o=await N(m,g,t);if(o)return o}}if(n!==g.method)return new Response("Method Not Allowed",{status:405});for(let m=0;m<f.length;m++){let o=f[m](g,t);if(o instanceof Promise)return await o??new Response("Not Found",{status:404});return o??new Response("Not Found",{status:404})}}}listen(n,...i){if(typeof Bun==="undefined")throw new Error(".listen() is designed to run on Bun only...");let f="0.0.0.0",g=void 0,t={};for(let o of i)if(typeof o==="string")f=o;else if(typeof o==="function")g=o;else if(typeof o==="object"&&o!==null)t=o;this.compile();let m={port:n,hostname:f,idleTimeOut:this.idleTimeOut,fetch:async(o,u)=>{let r=new URL(o.url);if(this.hooks.onRequest){let c=this.hooks.onRequest;for(let v=0;v<c.length;v++)await c[v](o,r,u)}return R(o,u,r,this)},static:this.staticFiles,routes:this.routes};if(t.sslCert&&t.sslKey)m.certFile=t.sslCert,m.keyFile=t.sslKey;if(this.serverInstance=Bun?.serve(m),t.sslCert&&t.sslKey)console.log(`HTTPS server is running on https://localhost:${n}`);if(g)return g();return this.serverInstance}close(n){if(this.serverInstance)this.serverInstance.stop(!0),this.serverInstance=null,n?n():console.log("Server has been stopped");else console.warn("Server is not running.")}route(n,i){if(!n||typeof n!=="string")throw new Error("Path must be a string");let f=Object.fromEntries(i.tempRoutes);return Object.entries(f).forEach(([t,m])=>{let o=t.replace(/::\w+$/,""),u=`${n}${o}`;if(!this.middlewares.has(u))this.middlewares.set(u,[]);m.handlers.slice(0,-1).forEach((C)=>{if(!this.middlewares.get(u)?.includes(C))this.middlewares.get(u)?.push(C)});let c=m.handlers[m.handlers.length-1],v=m.method;try{this.trie.insert(u,{handler:c,method:v})}catch(C){console.error(`Error inserting ${u}:`,C)}}),i=null,this}register(n,i){return this.route(n,i)}addRoute(n,i,f){if(typeof i!=="string")throw new Error(`Error in ${f[f.length-1]}: Path must be a string. Received: ${typeof i}`);if(typeof n!=="string")throw new Error(`Error in addRoute: Method must be a string. Received: ${typeof n}`);this.tempRoutes?.set(i+"::"+n,{method:n,handlers:f});let g=f.slice(0,-1),t=f[f.length-1];if(!this.middlewares.has(i))this.middlewares.set(i,[]);g.forEach((m)=>{if(i==="/")this.globalMiddlewares=[...new Set([...this.globalMiddlewares,...g])];else if(!this.middlewares.get(i)?.includes(m))this.middlewares.get(i)?.push(m)});try{if(n==="ANY"){let m=["GET","POST","PUT","DELETE","PATCH","OPTIONS","HEAD","PROPFIND"];for(let o of m)this.trie.insert(i,{handler:t,method:o})}this.trie.insert(i,{handler:t,method:n})}catch(m){console.error(`Error inserting ${i}:`,m)}}use(n,i){if(Array.isArray(n))n.forEach((g)=>{if(typeof g==="function")this.globalMiddlewares.push(g)});if(typeof n==="function"){if(this.globalMiddlewares.push(n),Array.isArray(i))i.forEach((g)=>{this.globalMiddlewares.push(g)});return}return(Array.isArray(n)?n.filter((g)=>typeof g==="string"):[n].filter((g)=>typeof g==="string")).forEach((g)=>{if(!this.middlewares.has(g))this.middlewares.set(g,[]);if(i)(Array.isArray(i)?i:[i]).forEach((m)=>{this.middlewares.get(g)?.push(m)})}),this}get(n,...i){return this.addRoute("GET",n,i),this}post(n,...i){return this.addRoute("POST",n,i),this}put(n,...i){return this.addRoute("PUT",n,i),this}patch(n,...i){return this.addRoute("PATCH",n,i),this}delete(n,...i){return this.addRoute("DELETE",n,i),this}any(n,...i){return this.addRoute("ANY",n,i),this}head(n,...i){return this.addRoute("HEAD",n,i),this}options(n,...i){return this.addRoute("OPTIONS",n,i),this}propfind(n,...i){return this.addRoute("PROPFIND",n,i),this}}export{M as default};
