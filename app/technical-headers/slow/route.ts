// technical.server_response_time: CRITICAL_MS = 3000. This route holds the response open with
// an artificial async delay well past that threshold before returning, so
// ctx.page.responseTimeMs (wall-clock timing captured around the crawler's fetch) lands well
// above 3000ms -> FAIL. Kept just over the threshold (3500ms) rather than needlessly long, since
// this delay is paid on every crawl of this single route.
const html = `<!doctype html>
<html lang="en">
<head><title>Slow Response Fixture | Broken Fixture Co</title>
<style>.skip-nav-link{position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;z-index:1000}.skip-nav-link:focus{left:8px;top:8px;width:auto;height:auto;overflow:visible;background:#fff;color:#111;padding:8px 16px;border-radius:4px;box-shadow:0 0 0 2px #111}</style>
</head>
<body>
<a href="#main-content" class="skip-nav-link">Skip to content</a>
<p><strong>TEST FIXTURE — intentionally broken, not a real business.</strong></p>
<div id="main-content">
<h1>Slow Response Fixture</h1>
<p>This route deliberately delays its response by roughly 3.5 seconds before responding.</p>
</div>
</body>
</html>`;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET() {
  await sleep(3500);
  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
