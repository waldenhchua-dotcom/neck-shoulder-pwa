import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = join(root, "dist");
const deployVersion = "pages-v3";
const imageIds = [
  "chin-tuck",
  "upper-trap-stretch",
  "levator-scapulae-stretch",
  "doorway-pec-stretch",
  "cross-body-shoulder-stretch",
  "child-pose-lat-stretch",
  "cat-cow",
  "thread-the-needle",
  "chair-thoracic-extension",
  "wall-angels",
  "rest"
];

async function readText(path) {
  return readFile(join(root, path), "utf8");
}

async function writeText(path, content) {
  await mkdir(resolve(dist, path, ".."), { recursive: true });
  await writeFile(join(dist, path), content, "utf8");
}

async function buildImageMap() {
  const entries = await Promise.all(
    imageIds.map(async (id) => {
      const bytes = await readFile(join(root, "assets", "exercises", `${id}.png`));
      return [id, `data:image/png;base64,${bytes.toString("base64")}`];
    })
  );

  return `const POSE_IMAGE_DATA = Object.freeze(${JSON.stringify(Object.fromEntries(entries))});\n\n`;
}

async function buildApp() {
  const source = await readText("app.js");
  const imageMap = await buildImageMap();
  return `${imageMap}${source.replace(
    /function renderPoseImage\(exerciseId\) \{\s+els\.poseImage\.src = `\.\/assets\/exercises\/\$\{exerciseId\}\.png`;\s+\}/,
    `function renderPoseImage(exerciseId) {
  els.poseImage.src = POSE_IMAGE_DATA[exerciseId] ?? POSE_IMAGE_DATA.rest;
}`
  )}`;
}

async function buildIndex() {
  const source = await readText("index.html");
  return source
    .replace(/styles\.css\?v=\d+/g, `styles.css?v=${deployVersion}`)
    .replace(/app\.js\?v=\d+/g, `app.js?v=${deployVersion}`);
}

function buildServiceWorker() {
  return `const CACHE_NAME = "neck-shoulder-pwa-${deployVersion}";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css?v=${deployVersion}",
  "./app.js?v=${deployVersion}",
  "./manifest.webmanifest",
  "./assets/icon.svg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        return cached;
      }
      return fetch(event.request).then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      });
    })
  );
});
`;
}

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, "assets"), { recursive: true });

await writeText("index.html", await buildIndex());
await writeText("styles.css", await readText("styles.css"));
await writeText("app.js", await buildApp());
await writeText("manifest.webmanifest", await readText("manifest.webmanifest"));
await writeText("sw.js", buildServiceWorker());
await writeText(".nojekyll", "");
await writeText("assets/icon.svg", await readText("assets/icon.svg"));

console.log(`Built ${dist}`);
