// technical.http_status: a route that deliberately returns a real 500 response. The rule FAILs
// on any status in [500, 502, 503, 504] -> s === 500 hits that branch directly.
const html = `<!doctype html>
<html lang="en">
<head><title>Server Error Fixture | Broken Fixture Co</title>
<style>.skip-nav-link{position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;z-index:1000}.skip-nav-link:focus{left:8px;top:8px;width:auto;height:auto;overflow:visible;background:#fff;color:#111;padding:8px 16px;border-radius:4px;box-shadow:0 0 0 2px #111}</style>
</head>
<body>
<a href="#main-content" class="skip-nav-link">Skip to content</a>
<p><strong>TEST FIXTURE — intentionally broken, not a real business.</strong></p>
<div id="main-content">
<h1>Server Error Fixture</h1>
<p>This route deliberately returns HTTP 500 on every request.</p>
</div>
</body>
</html>`;

export async function GET() {
  return new Response(html, {
    status: 500,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
