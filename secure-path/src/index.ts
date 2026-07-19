import type { R2Bucket } from "@cloudflare/workers-types";

interface Env {
  COUNTRY_FLAG_BUCKET: R2Bucket;
}

export default {
  // request: An instance of the standard Web Request API. 
  // It includes HTTP headers, method, body parameters, and custom properties 
  // added by Cloudflare like request.cf (geographic and network data).
  async fetch(request: {
    headers: any; url: string | URL; cf: { country: any; };
  }, env: Env) {
    const url = new URL(request.url);
    const requestTimestamp = Date.now();
    const country = request.cf.country;
    const userEmail = request.headers.get("Cf-Access-Authenticated-User-Email");

    if (url.pathname === "/secure" || url.pathname === "/secure/") {

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Hello from the Edge</title>
        </head>
        <body>
            <h1>Welcome to my Cloudflare Worker!</h1>
            <p>
              ${userEmail} authenticated at ${requestTimestamp} (${new Date(requestTimestamp).toISOString()}) from <a href="/secure/${country}">${country}<a>
            </p>
        <pre>Cloudflare-specific metadata : ${JSON.stringify(request.cf, null, 2)}</p><pre>
      </body>
    </html>
    `;

      return new Response(htmlContent, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    } else if (url.pathname.startsWith("/secure/")) {
      const countryCode = url.pathname.slice("/secure/".length).toLowerCase();
      if (!countryCode || countryCode !== country?.toLowerCase()) {
        return new Response("Forbidden", { status: 403 });
      }
      const object = await env.COUNTRY_FLAG_BUCKET.get(`${countryCode}.svg`);
      if (object === null) {
        return new Response("Object Not Found", { status: 404 });
      }

      const svgBytes = new Uint8Array(await object.arrayBuffer());
      const svgBase64 = btoa(String.fromCodePoint(...svgBytes));
      const imageDataUri = `data:image/svg+xml;base64,${svgBase64}`;

      const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Hello from the Edge</title>
        </head>
        <body>
            <h1>Welcome! Visitors from ${country}</h1>
            <p>
              Verified at ${requestTimestamp} (${new Date(requestTimestamp).toISOString()}) - visitor country matches requested country: ${country}
            </p>
            <img src="${imageDataUri}" alt="${country} flag" />
      </body>
    </html>
    `;

      return new Response(htmlContent, {
        headers: {
          "content-type": "text/html;charset=UTF-8",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
