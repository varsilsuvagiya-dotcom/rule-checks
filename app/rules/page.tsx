import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { Breadcrumbs, breadcrumbJsonLd, pageMetadata, SITE_URL } from '../components';
import { RULE_STATUS } from '../../lib/rule-status';

export const metadata: Metadata = pageMetadata({
  title: 'Rule Compliance Report',
  description:
    'How Broken Fixture Co scores against all 249 GeoRank AI audit rules, grouped by category, with a documented reason for every non-passing result.',
  path: '/rules',
});

const breadcrumbs = [
  { name: 'Home', href: '/' },
  { name: 'Rule Compliance Report', href: '/rules' },
];

const STATUS_LABEL: Record<string, string> = {
  PASS: 'PASS',
  NOT_APPLICABLE: 'NOT APPLICABLE',
  NEEDS_FIELD_DATA: 'NEEDS FIELD DATA',
};

const STATUS_BADGE_CLASS: Record<string, string> = {
  PASS: 'badge badge--pass',
  NOT_APPLICABLE: 'badge badge--na',
  NEEDS_FIELD_DATA: 'badge badge--field',
};

const CATEGORY_LABEL: Record<string, string> = {
  accessibility: 'Accessibility',
  ai_readability: 'AI Readability',
  ai_summarization: 'AI Summarization',
  content: 'Content',
  conversational_structure: 'Conversational Structure',
  eeat: 'E-E-A-T (Site Trust Signals)',
  eeat_signals: 'GEO E-E-A-T Signals',
  entity_richness: 'Entity Richness',
  faq_optimization: 'FAQ Optimization',
  internal_linking: 'Internal Linking',
  mobile: 'Mobile',
  on_page: 'On-Page',
  performance: 'Performance',
  security: 'Security',
  semantic_depth: 'Semantic Depth',
  structured_data: 'Structured Data',
  technical: 'Technical',
};

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Rule Compliance Report',
  url: `${SITE_URL}/rules`,
};

export default function RulesPage() {
  const total = RULE_STATUS.length;
  const pass = RULE_STATUS.filter((r) => r.status === 'PASS').length;
  const notApplicable = RULE_STATUS.filter((r) => r.status === 'NOT_APPLICABLE').length;
  const needsFieldData = RULE_STATUS.filter((r) => r.status === 'NEEDS_FIELD_DATA').length;

  const categories = [...new Set(RULE_STATUS.map((r) => r.category))];

  return (
    <main className="container container--wide">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)) }} />
      <Breadcrumbs items={breadcrumbs} />

      <h1>Rule Compliance Report</h1>
      <p>
        This page tracks how the current site scores against all {total} rules
        in the GeoRank AI audit engine ({179} technical/on-page/content/
        accessibility rules plus {70} GEO/AI-readiness rules), grouped by
        category. Every non-passing result below links back to the real rule
        logic that produces it — not a guess — so this table stays accurate
        as the rule set evolves.
      </p>

      <h2>Summary</h2>
      <ul>
        <li>
          <strong>{pass}</strong> rules <span className="badge badge--pass">PASS</span> — the site genuinely satisfies the rule&apos;s real evaluate() logic.
        </li>
        <li>
          <strong>{notApplicable}</strong> rules <span className="badge badge--na">NOT APPLICABLE</span> — a platform (Vercel) or framework (Next.js) guarantee, or a structurally-unfireable crawler-architecture rule, makes the condition this rule checks for impossible to observe either way.
        </li>
        <li>
          <strong>{needsFieldData}</strong> rules <span className="badge badge--field">NEEDS FIELD DATA</span> — the rule is permanently stubbed pending a scan-API input it doesn&apos;t currently accept, or requires real browser-rendered/PageSpeed Insights measurement data that no static HTML crawl can produce.
        </li>
      </ul>
      <p>
        {pass} + {notApplicable} + {needsFieldData} = {pass + notApplicable + needsFieldData} of {total}. No rule
        on this site returns a failing verdict.
      </p>

      {categories.map((category) => {
        const rows = RULE_STATUS.filter((r) => r.category === category);
        const catPass = rows.filter((r) => r.status === 'PASS').length;
        return (
          <section key={category} style={{ marginTop: 32 }}>
            <h2>
              {CATEGORY_LABEL[category] ?? category} ({catPass}/{rows.length} pass)
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Rule ID</th>
                    <th scope="col">Scope</th>
                    <th scope="col">Page(s)</th>
                    <th scope="col">Status</th>
                    <th scope="col">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <code>{r.id}</code>
                      </td>
                      <td>{r.scope}</td>
                      <td>{r.page}</td>
                      <td>
                        <span className={STATUS_BADGE_CLASS[r.status] ?? 'badge'}>
                          {STATUS_LABEL[r.status] ?? r.status}
                        </span>
                      </td>
                      <td style={detailStyle}>{r.how}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </main>
  );
}

const detailStyle: CSSProperties = {
  fontSize: '0.85rem',
  color: 'var(--muted)',
  maxWidth: 480,
};
