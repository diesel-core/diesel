export const isPromise = (v: any): boolean | any =>
    v !== null && typeof v === "object" && typeof (v as any).then === "function";

export const isResponse = (v: any): v is Response =>
    v !== null &&
    typeof v === "object" &&
    typeof (v as any).status === "number" &&
    typeof (v as any).headers === "object";



export const strip_body = (res: Response | undefined) => {
  return new Response(null, {
    status: res?.status,
    headers: res?.headers,
    statusText: res?.statusText,
  })
}
