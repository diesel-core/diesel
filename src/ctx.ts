import { Server } from "bun";
// import cookie from 'cookie'

import type { ContextType, CookieOptions, ParseBodyResult } from "./types";
import { getMimeType } from "./utils";

export default function createCtx( req: Request, server: Server, url: URL): ContextType {
  const headers: Headers = new Headers({
    "X-Powered-By": "DieselJS", // Branding header
    "Cache-Control": "no-cache", // Prevent caching for dynamic responses
  });
  headers.set("X-Powered-By", "DieselJS")
  let settedValue: Record<string, string> = {};
  let isAuthenticated: boolean = false;
  let parsedQuery: any;
  let parsedCookie: any = null;
  let parsedParams: any ;
  let parsedBody: ParseBodyResult | null;
  // let responseStatus: number = 200;
  let user: any = {};

  return {
    req,
    server,
    url,
    
    setHeader(key: string, value: any): ContextType {
      headers.set(key, value);
      return this;
    },
    
    getUser() {
      return user;
    },

    setUser(data?: any): void {
      if (data) {
        user = data;
      }
    },

    // status(status: number): ContextType {
    //   responseStatus = status;
    //   return this;
    // },

    getIP() {
      return this.server.requestIP(this.req);
    },

    async getBody(): Promise<any> {
      if (!parsedBody) {
        parsedBody = await parseBody(req);
      }
      if (parsedBody.error) {
        return new Response(JSON.stringify({ error: parsedBody.error }), {
          status: 400,
        });
      }
      return parsedBody;
    },

    set(key: string, value: any): ContextType {
      if (typeof key !== "string") throw new Error("Key must be string type!");
      if (!value)
        throw new Error("value paramter is missing pls pass value after key");
      settedValue[key] = value;
      return this;
    },

    get(key: string): any | null {
      return key ? settedValue[key] : null;
    },

    setAuth(authStatus: boolean): ContextType {
      isAuthenticated = authStatus;
      return this;
    },

    getAuth(): boolean {
      return isAuthenticated;
    },

    // Response methods with optional status
    text(data: string, status?: number) {
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "text/plain; charset=utf-8")
      }
      return new Response(data, {
        status,
        headers
      });
    },

    send(data: any, status?: number): Response {
      if (typeof data === "string") {
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "text/plain; charset=utf-8");
        }
      } else if (typeof data === "object") {
        if (!headers.has("Content-Type")) { 
          headers.set("Content-Type", "application/json; charset=utf-8");
        }
        data = JSON.stringify(data);
      } else if (data instanceof Uint8Array || data instanceof ArrayBuffer) {
        if (!headers.has("Content-Type")) {
          headers.set("Content-Type", "application/octet-stream");
        }
      }
      return new Response(data, {
        status,
        headers,
      });
    },    

    json(data: any, status?: number): Response {
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json; charset=utf-8");
      }
      return new Response(JSON.stringify(data), {
        status,
        headers
      });
    },

    // html(filepath: string, status?: number): Response {
    //   return new Response(Bun.file(filepath), {
    //     status: status ?? responseStatus,
    //     headers,
    //   });
    // },

    file(filePath: string, status: number = 200,mime_Type?:string): Response{
      const mimeType = getMimeType(filePath);
      const file = Bun.file(filePath);
    
      const headers = new Headers();
      if (!headers.has("Content-Type")) {
        headers.set("Content-Type", mime_Type ?? mimeType);
      }
    
      return new Response(file, {
        status,
        headers,
      });
    },    

    redirect(path: string, status?: number): Response {
      headers.set("Location", path);
      return new Response(null, {
        status: status ?? 302,
        headers,
      });
    },

    setCookie(
      name: string,
      value: string,
      options: CookieOptions = {}
    ): ContextType {
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
        value
      )}`;

      // Add options to cookie string (e.g., expiration, path, HttpOnly, etc.)
      if (options.maxAge) cookieString += `; Max-Age=${options.maxAge}`;
      if (options.expires)
        cookieString += `; Expires=${options.expires.toUTCString()}`;
      if (options.path) cookieString += `; Path=${options.path}`;
      if (options.domain) cookieString += `; Domain=${options.domain}`;
      if (options.secure) cookieString += `; Secure`;
      if (options.httpOnly) cookieString += `; HttpOnly`;
      if (options.sameSite) cookieString += `; SameSite=${options.sameSite}`;

      headers?.append("Set-Cookie", cookieString);

      return this;
    },

    getParams(props: string): string | Record<string, string> | undefined {
      if (!parsedParams && req?.routePattern) {
        parsedParams = extractDynamicParams(req?.routePattern, url?.pathname);
      }
      if (props) {
        if (parsedParams) {
          return parsedParams[props]
        }else{
          return undefined;
        }
      }
      if (parsedParams) {
        return props
      } else{
        return undefined;
      }
    },

    getQuery(props?: any): string | Record<string, string> | undefined {
      try {
        if (!parsedQuery) {
          parsedQuery = Object.fromEntries(url.searchParams);
        }
        if (props) {
          return parsedQuery[props] ?? undefined;
        }
        return parsedQuery;
      } catch (error) {
        return undefined;
      }
    },

    getCookie(cookieName?: string): string | null | undefined {
      if (!parsedCookie) {
        const cookieHeader = req.headers.get("cookie");
        if (cookieHeader) {
          parsedCookie = parseCookie(cookieHeader);
        } else return undefined;
      }
      if (!parsedCookie) return undefined;

      if (cookieName) {
        return parsedCookie[cookieName] ?? undefined;
      } else {
        return parsedCookie;
      }
    },
  };
}

function parseCookie(cookieHeader: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {};

  const cookiesArray = cookieHeader?.split(";")!;

  for (let i = 0; i < cookiesArray?.length!; i++) {
    const [cookieName, ...cookieValeParts] = cookiesArray[i].trim().split("=");
    const cookieVale = cookieValeParts?.join("=").trim();
    if (cookieName) {
      cookies[cookieName.trim()] = decodeURIComponent(cookieVale);
    }
  }

  return cookies;
}

function extractDynamicParams(
  routePattern: any,
  path: string
): Record<string, string> | null {
  const object: Record<string, string> = {};
  const routeSegments = routePattern.split("/");
  const [pathWithoutQuery] = path.split("?");
  const pathSegments = pathWithoutQuery.split("/");

  if (routeSegments.length !== pathSegments.length) {
    return null;
  }

  for (let i = 0; i < routeSegments.length; i++) {
    if (routeSegments[i].startsWith(":")) {
      // const dynamicKey = routeSegments[i].slice(1);
      // object[dynamicKey] = pathSegments[i];
      // OR
      object[routeSegments[i].slice(1)] = pathSegments[i];
    }
  }

  return object;
}

async function parseBody(req: Request): Promise<ParseBodyResult> {
  const contentType: string = req.headers.get("Content-Type")!;

  if (!contentType) return {};

  try {
    if (contentType.startsWith("application/json")) {
      return await req.json();
    }

    if (contentType.startsWith("application/x-www-form-urlencoded")) {
      const body = await req.text();
      return Object.fromEntries(new URLSearchParams(body));
    }

    if (contentType.startsWith("multipart/form-data")) {
      const formData: any = await req.formData();
      const obj: Record<string, string> = {};
      for (const [key, value] of formData.entries()) {
        obj[key] = value;
      }
      return obj;
    }

    return { error: "Unknown request body type" };
  } catch (error) {
    return { error: "Invalid request body format" };
  }
}
