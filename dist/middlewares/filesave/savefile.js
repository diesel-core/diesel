var{create:D,defineProperty:P,getOwnPropertyDescriptor:L,getOwnPropertyNames:$,getPrototypeOf:H}=Object,J=Object.prototype.hasOwnProperty,M=(o,i)=>()=>(i||o((i={exports:{}}).exports,i),i.exports),X=(o,i,l,g)=>{if(i&&typeof i=="object"||typeof i=="function")for(let v of $(i))!J.call(o,v)&&v!==l&&P(o,v,{get:()=>i[v],enumerable:!(g=L(i,v))||g.enumerable});return o},q=(o,i,l)=>(l=o!=null?D(H(o)):{},X(i||!o||!o.__esModule?P(l,"default",{value:o,enumerable:!0}):l,o)),F=M((o,i)=>{function l(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}function g(e,t){for(var r="",a=0,u=-1,n=0,c,s=0;s<=e.length;++s){if(s<e.length)c=e.charCodeAt(s);else{if(c===47)break;c=47}if(c===47){if(!(u===s-1||n===1))if(u!==s-1&&n===2){if(r.length<2||a!==2||r.charCodeAt(r.length-1)!==46||r.charCodeAt(r.length-2)!==46){if(r.length>2){var f=r.lastIndexOf("/");if(f!==r.length-1){f===-1?(r="",a=0):(r=r.slice(0,f),a=r.length-1-r.lastIndexOf("/")),u=s,n=0;continue}}else if(r.length===2||r.length===1){r="",a=0,u=s,n=0;continue}}t&&(r.length>0?r+="/..":r="..",a=2)}else r.length>0?r+="/"+e.slice(u+1,s):r=e.slice(u+1,s),a=s-u-1;u=s,n=0}else c===46&&n!==-1?++n:n=-1}return r}function v(e,t){var r=t.dir||t.root,a=t.base||(t.name||"")+(t.ext||"");return r?r===t.root?r+a:r+e+a:a}var b={resolve:function(){for(var e="",t=!1,r,a=arguments.length-1;a>=-1&&!t;a--){var u;a>=0?u=arguments[a]:(r===void 0&&(r=process.cwd()),u=r),l(u),u.length!==0&&(e=u+"/"+e,t=u.charCodeAt(0)===47)}return e=g(e,!t),t?e.length>0?"/"+e:"/":e.length>0?e:"."},normalize:function(e){if(l(e),e.length===0)return".";var t=e.charCodeAt(0)===47,r=e.charCodeAt(e.length-1)===47;return e=g(e,!t),e.length===0&&!t&&(e="."),e.length>0&&r&&(e+="/"),t?"/"+e:e},isAbsolute:function(e){return l(e),e.length>0&&e.charCodeAt(0)===47},join:function(){if(arguments.length===0)return".";for(var e,t=0;t<arguments.length;++t){var r=arguments[t];l(r),r.length>0&&(e===void 0?e=r:e+="/"+r)}return e===void 0?".":b.normalize(e)},relative:function(e,t){if(l(e),l(t),e===t||(e=b.resolve(e),t=b.resolve(t),e===t))return"";for(var r=1;r<e.length&&e.charCodeAt(r)===47;++r);for(var a=e.length,u=a-r,n=1;n<t.length&&t.charCodeAt(n)===47;++n);for(var c=t.length,s=c-n,f=u<s?u:s,p=-1,d=0;d<=f;++d){if(d===f){if(s>f){if(t.charCodeAt(n+d)===47)return t.slice(n+d+1);if(d===0)return t.slice(n+d)}else u>f&&(e.charCodeAt(r+d)===47?p=d:d===0&&(p=0));break}var k=e.charCodeAt(r+d),z=t.charCodeAt(n+d);if(k!==z)break;k===47&&(p=d)}var y="";for(d=r+p+1;d<=a;++d)(d===a||e.charCodeAt(d)===47)&&(y.length===0?y+="..":y+="/..");return y.length>0?y+t.slice(n+p):(n+=p,t.charCodeAt(n)===47&&++n,t.slice(n))},_makeLong:function(e){return e},dirname:function(e){if(l(e),e.length===0)return".";for(var t=e.charCodeAt(0),r=t===47,a=-1,u=!0,n=e.length-1;n>=1;--n)if(t=e.charCodeAt(n),t===47){if(!u){a=n;break}}else u=!1;return a===-1?r?"/":".":r&&a===1?"//":e.slice(0,a)},basename:function(e,t){if(t!==void 0&&typeof t!="string")throw new TypeError('"ext" argument must be a string');l(e);var r=0,a=-1,u=!0,n;if(t!==void 0&&t.length>0&&t.length<=e.length){if(t.length===e.length&&t===e)return"";var c=t.length-1,s=-1;for(n=e.length-1;n>=0;--n){var f=e.charCodeAt(n);if(f===47){if(!u){r=n+1;break}}else s===-1&&(u=!1,s=n+1),c>=0&&(f===t.charCodeAt(c)?--c===-1&&(a=n):(c=-1,a=s))}return r===a?a=s:a===-1&&(a=e.length),e.slice(r,a)}else{for(n=e.length-1;n>=0;--n)if(e.charCodeAt(n)===47){if(!u){r=n+1;break}}else a===-1&&(u=!1,a=n+1);return a===-1?"":e.slice(r,a)}},extname:function(e){l(e);for(var t=-1,r=0,a=-1,u=!0,n=0,c=e.length-1;c>=0;--c){var s=e.charCodeAt(c);if(s===47){if(!u){r=c+1;break}continue}a===-1&&(u=!1,a=c+1),s===46?t===-1?t=c:n!==1&&(n=1):t!==-1&&(n=-1)}return t===-1||a===-1||n===0||n===1&&t===a-1&&t===r+1?"":e.slice(t,a)},format:function(e){if(e===null||typeof e!="object")throw new TypeError('The "pathObject" argument must be of type Object. Received type '+typeof e);return v("/",e)},parse:function(e){l(e);var t={root:"",dir:"",base:"",ext:"",name:""};if(e.length===0)return t;var r=e.charCodeAt(0),a=r===47,u;a?(t.root="/",u=1):u=0;for(var n=-1,c=0,s=-1,f=!0,p=e.length-1,d=0;p>=u;--p){if(r=e.charCodeAt(p),r===47){if(!f){c=p+1;break}continue}s===-1&&(f=!1,s=p+1),r===46?n===-1?n=p:d!==1&&(d=1):n!==-1&&(d=-1)}return n===-1||s===-1||d===0||d===1&&n===s-1&&n===c+1?s!==-1&&(c===0&&a?t.base=t.name=e.slice(1,s):t.base=t.name=e.slice(c,s)):(c===0&&a?(t.name=e.slice(1,n),t.base=e.slice(1,s)):(t.name=e.slice(c,n),t.base=e.slice(c,s)),t.ext=e.slice(n,s)),c>0?t.dir=e.slice(0,c-1):a&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};b.posix=b,i.exports=b}),N=q(F()),m=N,G=N,I=function(o){return o},T=function(){throw new Error("Not implemented")};m.parse??=T;G.parse??=T;var x={resolve:m.resolve.bind(m),normalize:m.normalize.bind(m),isAbsolute:m.isAbsolute.bind(m),join:m.join.bind(m),relative:m.relative.bind(m),toNamespacedPath:I,dirname:m.dirname.bind(m),basename:m.basename.bind(m),extname:m.extname.bind(m),format:m.format.bind(m),parse:m.parse.bind(m),sep:"/",delimiter:":",win32:void 0,posix:void 0,_makeLong:I},E={sep:"\\",delimiter:";",win32:void 0,...x,posix:x};x.win32=E.win32=E;x.posix=x;var A=x;var h=[];for(let o=0;o<256;++o)h.push((o+256).toString(16).slice(1));function R(o,i=0){return(h[o[i+0]]+h[o[i+1]]+h[o[i+2]]+h[o[i+3]]+"-"+h[o[i+4]]+h[o[i+5]]+"-"+h[o[i+6]]+h[o[i+7]]+"-"+h[o[i+8]]+h[o[i+9]]+"-"+h[o[i+10]]+h[o[i+11]]+h[o[i+12]]+h[o[i+13]]+h[o[i+14]]+h[o[i+15]]).toLowerCase()}var w,K=new Uint8Array(16);function C(){if(!w){if(typeof crypto==="undefined"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");w=crypto.getRandomValues.bind(crypto)}return w(K)}var Q=typeof crypto!=="undefined"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),j={randomUUID:Q};function W(o,i,l){if(j.randomUUID&&!i&&!o)return j.randomUUID();o=o||{};let g=o.random??o.rng?.()??C();if(g.length<16)throw new Error("Random bytes length must be >= 16");if(g[6]=g[6]&15|64,g[8]=g[8]&63|128,i){if(l=l||0,l<0||l+16>i.length)throw new RangeError(`UUID byte range ${l}:${l+15} is out of buffer bounds`);for(let v=0;v<16;++v)i[l+v]=g[v];return i}return R(g)}var O=W;var{default:S}=(()=>({}));var V=import.meta.dir,U=A.resolve(V,"../../public/uploaded");if(!S.existsSync(U))S.mkdirSync(U,{recursive:!0});var le=(o={})=>{let i=o.dest?A.resolve(V,o.dest):U;return async(l)=>{try{let g=await l.body;l.req.files??={};for(let v of o?.fields??[]){let b=g[v];if(!b.name)continue;let e=`${v}_${O()}${A.extname(b?.name)}`,t=A.join(i,e);await Bun.write(t,await b.arrayBuffer()),l.req.files[v]=t}}catch(g){return console.error("File upload error:",g),l.json({status:500,message:"Error uploading files"},500)}}};export{le as fileSaveMiddleware};
