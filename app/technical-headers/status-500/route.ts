// technical.http_status: a route that deliberately returns a real 500 response. The rule FAILs
// on any status in [500, 502, 503, 504] -> s === 500 hits that branch directly.
const html = `<!doctype html>
<html lang="en">
<head><title>Server Error Fixture | Broken Fixture Co</title></head>
<body>
<p><strong>TEST FIXTURE — intentionally broken, not a real business.</strong></p>
<h1>Server Error Fixture</h1>
<p>This route deliberately returns HTTP 500 on every request.</p>
</body>
</html>`;

export async function GET() {
  return new Response(html, {
    status: 500,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
