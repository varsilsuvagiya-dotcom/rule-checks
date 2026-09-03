import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { RULE_STATUS } from '../../lib/rule-status';

export const metadata: Metadata = {
  title: 'Rule Verification Table | Broken Fixture Co',
  description: 'All 249 rule IDs and their fixture violation status.',
};

const STATUS_LABEL: Record<string, string> = {
  BROKEN: 'BROKEN',
  NOT_APPLICABLE: 'NOT_APPLICABLE (by rule design)',
  CANNOT_BREAK_ON_VERCEL: 'CANNOT_BREAK_ON_VERCEL',
  CANNOT_BREAK_STATICALLY: 'CANNOT_BREAK_STATICALLY',
  CANNOT_BREAK_IN_NEXTJS: 'CANNOT_BREAK_IN_NEXTJS',
};

export default function RulesPage() {
  const total = RULE_STATUS.length;
  const broken = RULE_STATUS.filter((r) => r.status === 'BROKEN').length;
  const notApplicable = RULE_STATUS.filter((r) => r.status === 'NOT_APPLICABLE').length;
  const platformBlocked = RULE_STATUS.filter((r) => r.status.startsWith('CANNOT_BREAK')).length;

  return (
    <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem', fontFamily: 'system-ui, sans-serif' }}>
      <p style={{ background: '#fee2e2', border: '1px solid #dc2626', padding: '0.75rem 1rem', borderRadius: 6, fontWeight: 600 }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Broken Fixture Co — Rule Verification Table</h1>
      <p>
        {total} rule IDs from the georank-ai audit engine (179 SEO + 70 GEO). This table
        is the ground-truth checklist for verifying the scanner detects every real violation
        built into this site.
      </p>
      <ul>
        <li><strong>{broken}</strong> BROKEN — genuinely violates the rule&apos;s real evaluate() logic.</li>
        <li><strong>{notApplicable}</strong> NOT_APPLICABLE — the rule itself returns not-applicable for this content shape (verified from its source, not a fixture gap).</li>
        <li><strong>{platformBlocked}</strong> CANNOT_BREAK_ON_VERCEL / IN_NEXTJS / STATICALLY — platform, framework, or crawler-capability constraints prevent triggering a real failure without faking it.</li>
      </ul>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', width: '100%', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
              <th style={cellStyle}>Rule ID</th>
              <th style={cellStyle}>Scope</th>
              <th style={cellStyle}>Category</th>
              <th style={cellStyle}>Page</th>
              <th style={cellStyle}>How it violates / reason</th>
              <th style={cellStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {RULE_STATUS.map((r) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={cellStyle}><code>{r.id}</code></td>
                <td style={cellStyle}>{r.scope}</td>
                <td style={cellStyle}>{r.category}</td>
                <td style={cellStyle}>{r.page}</td>
                <td style={cellStyle}>{r.how}</td>
                <td style={{ ...cellStyle, fontWeight: 600, color: r.status === 'BROKEN' ? '#16a34a' : r.status === 'NOT_APPLICABLE' ? '#6b7280' : '#dc2626' }}>
                  {STATUS_LABEL[r.status] ?? r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const cellStyle: CSSProperties = {
  padding: '0.4rem 0.6rem',
  verticalAlign: 'top',
  border: '1px solid #e5e7eb',
};
