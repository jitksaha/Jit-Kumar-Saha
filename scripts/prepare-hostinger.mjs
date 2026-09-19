import { cp, rm } from "node:fs/promises";

await cp("hostinger-build/hostinger/index.html", "hostinger-build/index.html");
await cp("hostinger/.htaccess", "hostinger-build/.htaccess");
await rm("hostinger-build/hostinger", { recursive: true, force: true });

// Hostinger's Advanced → Git deployment serves repository root directly.
// Mirror the static build there so public_html always has an index entrypoint.
await rm("assets", { recursive: true, force: true });
await cp("hostinger-build/assets", "assets", { recursive: true });
await cp("hostinger-build/index.html", "index.html");
await cp("hostinger-build/.htaccess", ".htaccess");
