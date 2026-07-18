export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		if (url.pathname === "/secure") {
			const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Hello from the Edge</title>
    </head>
    <body>
        <h1>Welcome to my Cloudflare Worker!</h1>
        <p>This HTML is generated dynamically at the Edge.</p>
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
