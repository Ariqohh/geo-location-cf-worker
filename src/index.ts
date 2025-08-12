/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const cf =
			(
				request as Request & {
					cf?: {
						country?: string;
						region?: string;
						regionCode?: string;
						city?: string;
						postalCode?: string;
						timezone?: string;
						latitude?: number;
						longitude?: number;
					};
				}
			).cf || {};

		const geoData = {
			country: cf.country || null, // ISO country code
			region: cf.region || null, // Full region name
			regionCode: cf.regionCode || null, // Region ISO code
			city: cf.city || null, // City name
			postalCode: cf.postalCode || null, // Postal/ZIP
			timezone: cf.timezone || null, // Timezone name
			latitude: cf.latitude || null, // Latitude
			longitude: cf.longitude || null, // Longitude
		};

		return new Response(JSON.stringify(geoData), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*', // Allow browser/WASM access
			},
		});
	},
} satisfies ExportedHandler<Env>;
