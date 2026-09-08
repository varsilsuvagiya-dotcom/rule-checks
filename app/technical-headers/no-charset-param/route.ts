// technical.content_type: the rule only evaluates pages the crawler classifies as HTML
// (crawler.service.ts requires "text/html" to appear in the Content-Type header before it even
// parses the body — anything else is filed as a non-HTML "shell" resource and this PAGE-scope
// rule then returns NOT_APPLICABLE, since it early-returns on !p.isHtml). So the header can't be
// missing "text/html" and still exercise this rule; the reachable failure mode is the WARNING
// path instead — a Content-Type that includes "text/html" but omits the charset parameter
// entirely (a common, real misconfiguration: type declared, encoding left unstated).
const html = `<!doctype html>
<html lang="en">
<head><title>Wrong Content-Type Fixture | Broken Fixture Co</title>
<style>.skip-nav-link{position:absolute;left:-9999px;top:0;width:1px;height:1px;overflow:hidden;z-index:1000}.skip-nav-link:focus{left:8px;top:8px;width:auto;height:auto;overflow:visible;background:#fff;color:#111;padding:8px 16px;border-radius:4px;box-shadow:0 0 0 2px #111}</style>
</head>
<body>
<a href="#main-content" class="skip-nav-link">Skip to content</a>
<p><strong>TEST FIXTURE — intentionally broken, not a real business.</strong></p>
<div id="main-content">
<h1>Wrong Content-Type Fixture</h1>
<p>This route serves real HTML markup but its Content-Type header declares only the media
type with no charset parameter, so the type and encoding are never declared together.</p>
</div>
</body>
</html>`;

export async function GET() {
  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  });
}
