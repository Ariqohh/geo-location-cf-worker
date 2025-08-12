# 🌍 Geo Locations Worker

A privacy-first Cloudflare Worker that returns **country**, **region**, **city**, and **other geo information** about the incoming request — without exposing the raw IP address.
Built with GDPR/CCPA-compliant practices at its core, it ensures zero personal data leakage while still enabling accurate location insights.

By leveraging edge computing, the lookup and response happen ultra-fast, directly at Cloudflare’s global network, minimizing latency and delivering real-time geo data for analytics, personalization, and location-based features — all without compromising user privacy.

---

## ✨ Features

- 📍 **Country, Region, City, Lat/Lon, Timezone** from `request.cf`
- 🔒 **Privacy-friendly** — no raw IP is processed by your app
- ⚡ **Edge runtime** — runs close to the user for ultra-low latency
- 🆓 Works on Cloudflare **Free Plan** (100k req/day)
- 🛠 **TypeScript** + Wrangler + Vitest setup

---
## ⚡️ Cloudflare Workers vs Third-Party Geo Location APIs

| Aspect | Cloudflare Workers Geo API | Third-Party Geo Location API |
|--------|----------------------------|------------------------------|
| **Data Source** | Cloudflare uses its **own global CDN edge network** to detect geo info directly from the incoming request. | Data is fetched from the provider’s database using your request’s IP address. |
| **IP Exposure** | **No raw IP exposure** — Cloudflare only gives country, region, city, ASN, etc., in the Worker environment without revealing the actual IP. | Usually requires sending the raw IP address to the provider, which may be stored or logged. |
| **Privacy Compliance** | **Built-in GDPR/CCPA-friendly** since no personal data leaves Cloudflare’s edge. | Compliance depends on the provider’s policies and where their servers are located. |
| **Latency** | **Ultra-fast** — processed at the **edge**, no external network calls. | **Slower** — involves a round trip to the API provider’s server, often in a different region. |
| **Reliability** | Works entirely within Cloudflare’s infra; no dependency on external API uptime. | Dependent on third-party API uptime and rate limits. |
| **Cost** | Free with Cloudflare Workers (within limits). | Often paid based on requests (after free tier). |
| **Customization** | Can integrate directly into your Worker logic for personalization, analytics, and A/B testing at the edge. | Requires API call, parse response, then apply logic in your own code. |

---

## 📦 Tech Stack

- **Cloudflare Workers**
- **TypeScript**
- **Wrangler CLI**
- **Vitest** for testing

---

## 📂 Project Structure

```
geo-locations-worker/
├── .vscode/                     # VS Code workspace settings
├── .wrangler/                   # Cloudflare Wrangler configuration files
├── node_modules/                # Project dependencies
├── src/
│   └── index.ts                  # Main entry point for the Cloudflare Worker
├── test/                         # Test cases
├── .editorconfig                 # Editor configuration for consistent formatting
├── .gitignore                    # Ignored files for Git
├── .prettierrc                   # Prettier configuration
├── package-lock.json             # Dependency lock file
├── package.json                  # Project metadata and scripts
├── README.md                     # Project documentation
├── tsconfig.json                 # TypeScript configuration
├── vitest.config.mts             # Vitest testing configuration
├── worker-configuration.d.ts     # Type definitions for Worker environment
└── wrangler.jsonc                # Wrangler configuration
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Pradeeparul2/geo-location-cf-worker.git
cd geo-location-cf-worker
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Wrangler

If you haven’t already, log in to Cloudflare:

```bash
npx wrangler login
```

### 4️⃣ Start the Worker in Dev Mode

```bash
npm run dev
```

By default, this runs on:

```
http://127.0.0.1:8787
```

---

## 📜 Example Worker Code (`src/index.ts`)

```ts
export default {
	async fetch(request: Request) {
		const cf = (request as any).cf || {};

		const geoData = {
			country: cf.country || null,
			region: cf.region || null,
			city: cf.city || null,
			postalCode: cf.postalCode || null,
			timezone: cf.timezone || null,
			latitude: cf.latitude || null,
			longitude: cf.longitude || null,
		};

		return new Response(JSON.stringify(geoData), {
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*', // Allow CORS
			},
		});
	},
};
```

---

## 📡 Example Response

```json
{
	"country": "US",
	"region": "California",
	"city": "San Francisco",
	"postalCode": "94107",
	"timezone": "America/Los_Angeles",
	"latitude": "37.7749",
	"longitude": "-122.4194"
}
```

---

## 📦 Deploying to Cloudflare

```bash
npm run deploy
```

This will publish your Worker to the route configured in `wrangler.toml`.

---

## 🧪 Running Tests

```bash
npm test
```

---

## ⚠️ Limitations

- Works only when requests are routed through Cloudflare.
- Location accuracy:
  - Country: ~99%
  - Region: ~80–90%
  - City: ~60–80%
- IP-based geolocation (not GPS precise).

---

## 📄 License

MIT © 2025 [Pradeep Arul](https://github.com/Pradeeparul2)
