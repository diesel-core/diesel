import { ContextType } from "../../types";
import { RateLimitStore } from "./implementation";
type Props = {
    windowMs?: number;
    max?: number;
    message?: string;
    store?: RateLimitStore;
};
export declare const rateLimit: (props: Props) => (ctx: ContextType) => Promise<Response | void>;
export {};
