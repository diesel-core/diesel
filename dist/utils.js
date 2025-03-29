var H=Object.create;var{getPrototypeOf:I,defineProperty:G,getOwnPropertyNames:K}=Object;var L=Object.prototype.hasOwnProperty;var N=(q,C,z)=>{z=q!=null?H(I(q)):{};let v=C||!q||!q.__esModule?G(z,"default",{value:q,enumerable:!0}):z;for(let A of K(q))if(!L.call(v,A))G(v,A,{get:()=>q[A],enumerable:!0});return v};var O=((q)=>typeof require!=="undefined"?require:typeof Proxy!=="undefined"?new Proxy(q,{get:(C,z)=>(typeof require!=="undefined"?require:C)[z]}):q)(function(q){if(typeof require!=="undefined")return require.apply(this,arguments);throw Error('Dynamic require of "'+q+'" is not supported')});function R(q){switch(q.split(".").pop()?.toLowerCase()){case"js":return"application/javascript";case"css":return"text/css";case"html":return"text/html";case"json":return"application/json";case"png":return"image/png";case"jpg":case"jpeg":return"image/jpeg";case"svg":return"image/svg+xml";case"gif":return"image/gif";case"woff":return"font/woff";case"woff2":return"font/woff2";default:return"application/octet-stream"}}function S(q,C){if(!q)throw new Error("JWT library is not defined, please provide jwt to authenticateJwt Function");return(z)=>{try{let v=z.cookies?.accessToken||z.req?.headers?.get("Authorization");if(!v)return z.json({message:"Unauthorized: No token provided"},401);if(v.startsWith("Bearer "))v=v.slice(7);let A=q?.verify(v,C);if(!A)return z.json({message:"Unauthorized: Invalid token"},401);z.set("user",A);return}catch(v){return z.json({message:"Unauthorized: Invalid token",error:v?.message},401)}}}function V(q,C,z){if(!q)throw new Error("JWT library is not defined, please provide jwt to authenticateJwtDB Function");if(!C)throw new Error("User model is not defined, please provide UserModel to authenticateJwtDB Function");return async(v)=>{try{let A=v.cookies?.accessToken||v.req?.headers?.get("Authorization");if(!A)return v.json({message:"Unauthorized: No token provided"},401);if(A.startsWith("Bearer "))A=A.slice(7);let E=q?.verify(A,z);if(!E)return v.json({message:"Unauthorized: Invalid token"},401);let F=await C.findById(E._id).select("-password -refreshToken");if(!F)return v.json({message:"Unauthorized: User not found"},401);v.set("user",F);return}catch(A){return v.json({message:"Unauthorized: Authentication failed",error:A?.message},401)}}}export{R as getMimeType,S as authenticateJwtMiddleware,V as authenticateJwtDbMiddleware};
