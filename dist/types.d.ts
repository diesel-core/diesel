import { Server } from "bun";
export type listenCalllBackType = () => void;
export type handlerFunction = (ctx: ContextType, server?: Server) => Response | Promise<Response | null | void>;
export type middlewareFunc = (ctx: ContextType, server?: Server | undefined) => null | void | Response | Promise<Response | void | null>;
export type HookFunction = (ctx: ContextType, result?: Response | null | void, server?: Server) => Response | Promise<Response | null | void> | void;
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
export type HookType = 'onRequest' | 'preHandler' | 'postHandler' | 'onSend' | 'onError' | 'onClose';
export interface onError {
    (error: Error, req: Request, url: URL, server: Server): void | null | Response | Promise<Response | null | void>;
}
export interface onRequest {
    (req: Request, url: URL, server: Server): void | null | Response | Promise<Response | null | void>;
}
export interface Hooks {
    onRequest: onRequest | null;
    preHandler: HookFunction | null;
    postHandler: HookFunction | null;
    onSend: HookFunction | null;
    onError: onError | null;
    onClose: HookFunction | null;
}
export interface ContextType {
    req: Request;
    server: Server;
    url: URL;
    setUser: (data?: any) => void;
    getUser: () => any;
    status: (status: number) => this;
    getIP: () => any;
    getBody: () => Promise<any>;
    setHeader: (key: string, value: any) => this;
    set: (key: string, value: any) => this;
    get: (key: string) => any;
    setAuth: (authStatus: boolean) => this;
    getAuth: () => boolean;
    json: (data: Object, status?: number) => Response;
    text: (data: string, status?: number) => Response;
    send: (data: string, status?: number) => Response;
    html: (filePath: string, status?: number) => Response;
    file: (filePath: string, status?: number) => Response;
    redirect: (path: string, status?: number) => Response;
    getParams: (props?: any) => any;
    getQuery: (props?: any) => any;
    setCookie: (name: string, value: string, options?: CookieOptions) => this;
    getCookie: (cookieName?: string) => any;
}
export interface CookieOptions {
    maxAge?: number;
    expires?: Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "Strict" | "Lax" | "None";
}
export interface RouteNodeType {
    path: string;
    handler: Function[];
    method: string[];
}
export interface RouteHandlerT {
    method: string;
    handler: (ctx: ContextType) => Promise<Response | null | void>;
    isDynamic?: boolean;
    path?: string;
}
export interface DieselT {
    hasOnReqHook: boolean;
    hasMiddleware: boolean;
    hasPreHandlerHook: boolean;
    hasPostHandlerHook: boolean;
    hasOnSendHook: boolean;
    hooks: {
        onRequest: ((req: Request, url: URL, serer: Server) => void) | null;
        preHandler: ((ctx: ContextType, serer?: Server) => Response | Promise<Response | void | null>) | null;
        postHandler: ((ctx: ContextType, serer?: Server) => Response | Promise<Response | void | null>) | null;
        onSend: ((ctx?: ContextType, result?: Response | null | void, serer?: Server) => Response | Promise<Response | void | null>) | null;
        onError: ((error: Error, req: Request, url: URL, server?: Server) => void | Response | Promise<Response | null | void>) | null;
    };
    filters: Set<string>;
    hasFilterEnabled: boolean;
    filterFunction: (ctx: ContextType, serer?: Server) => void | Response | Promise<Response | void | null>;
    corsConfig: corsT | null;
    globalMiddlewares: Array<(ctx: ContextType, serer?: Server) => void | Promise<Response | null | void>>;
    middlewares: Map<string, Array<(ctx: ContextType, serer?: Server) => void | Promise<Response | null | void>>>;
    trie: {
        search: (pathname: string, method: string) => RouteHandlerT | undefined;
    };
}
export interface RouteCache {
    [key: string]: RouteHandlerT | undefined;
}
declare global {
    interface Request {
        routePattern?: string;
        [key: string]: any;
    }
}
export interface ParseBodyResult {
    error?: string;
    data?: any;
}
export interface RouteT {
    method: string;
    handler: handlerFunction;
}
export type corsT = {
    origin?: string | string[] | null;
    methods?: string | string[] | null;
    allowedHeaders?: string | string[] | null;
    exposedHeaders?: string | string[] | null;
    credentials?: boolean | null;
    maxAge?: number;
    preflightContinue?: boolean;
    optionsSuccessStatus?: number;
} | null;
export interface FilterMethods {
    routeMatcher: (...routes: string[]) => FilterMethods;
    permitAll: () => FilterMethods;
    require: (fnc?: middlewareFunc) => Response | void;
}
