import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Warehouse Shelving Fails Under Load | Broken Fixture Co",
};

export default function EeatSignalsPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
      <h1>How Warehouse Shelving Fails Under Load</h1>
      <p>
        This page is a fixture for exercising the eeat_signals category of the
        GEO audit engine. It deliberately omits every author, ownership,
        freshness, accuracy, reputation, and trust signal the checker looks
        for, while still carrying enough body text to avoid being skipped as
        too thin to evaluate.
      </p>
      <p>
        Warehouse shelving fails for a handful of predictable reasons. Racks
        get overloaded past their rated capacity, forklifts clip upright
        columns during tight turns, and beams sag over time when the load
        distribution is uneven across a bay. None of these failure modes are
        exotic. They show up again and again in facility incident reports,
        and the fixes tend to be procedural rather than structural: label
        every bay with its rated capacity, keep aisle widths matched to the
        equipment that uses them, and inspect uprights on a fixed schedule
        rather than waiting for a visible problem to appear.
      </p>
      <p>
        A lot of the guidance floating around on this topic reads as
        confident without actually pointing anywhere. Numbers get quoted
        without saying where they came from. Claims get made without a
        source anyone could go check. Advice gets offered without any
        indication of who is offering it, what they have done, or why their
        opinion should carry weight. This page reproduces that pattern on
        purpose: broad statements about shelving safety, without a single
        supporting reference, without a byline, and without any indication
        of who wrote it, when, or under what authority.
      </p>
      <p>
        There is no publication date on this page and no note about when it
        was last reviewed. There is no company name tied to the content, no
        copyright line, and no way to tell whether the organization behind it
        even still exists. There are no testimonials, no client logos, no
        award mentions, no certifications, and no ratings of any kind. There
        is nothing here that would let a reader, or a crawler, decide whether
        this content or its source can be trusted.
      </p>
      <p>
        That absence is the point. Every one of those gaps corresponds to a
        specific check this fixture exists to fail: no named author, no
        author bio or credentials, no Person or Organization schema, no
        cited sources, no update history, no copyright or publisher
        declaration, no company trust pages, no reviews or awards, and no
        security or transparency language anywhere on the page.
      </p>
    </main>
  );
}
