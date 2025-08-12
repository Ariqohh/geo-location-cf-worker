# 🌍 Geo Locations Worker

A Cloudflare Worker that returns **country, region, city, and other geo information** about the incoming request without exposing the raw IP address.  
This is useful for analytics, personalization, and location-based features — while keeping GDPR/CCPA compliance in mind.

---

## ✨ Features

- 📍 **Country, Region, City, Lat/Lon, Timezone** from `request.cf`
- 🔒 **Privacy-friendly** — no raw IP is processed by your app
- ⚡ **Edge runtime** — runs close to the user for ultra-low latency
- 🆓 Works on Cloudflare **Free Plan** (100k req/day)
- 🛠 **TypeScript** + Wrangler + Vitest setup

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
git clone <your-repo-url>
cd geo-locations-worker
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

MIT © 2025 [Pradeep Arul](https://github.com/<your-github>)
