import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why We Chose Our Stack in 2022 | Broken Fixture Co",
};

// content.freshness: declares a visible <time datetime> of 2022-01-01 -- 3+ years old, far past
// the rule's STALE_DAYS threshold (730 days / ~2 years) -- and never updated (no
// article:modified_time / dateModified anywhere), so ageDays > staleDays*1.5 -> FAIL.
//
// content.external_references: pageType is 'blog' (path matches /blog) and this page is padded
// past the rule's MIN_WORDS_TO_EXPECT_CITATIONS (600 words) with zero outbound links anywhere on
// the page -> WARNING ("no outbound links found").
export default function StaleContentPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p style={{ fontWeight: "bold", color: "#b00020" }}>
        TEST FIXTURE — intentionally broken, not a real business.
      </p>
      <h1>Why We Chose Our Stack in 2022</h1>
      <p>
        Published <time dateTime="2022-01-01">January 1, 2022</time>. This
        article has never been updated since.
      </p>

      <p>
        Back when we were first assembling our infrastructure, we spent a
        considerable amount of time evaluating the landscape of available
        tools, frameworks, and hosting providers before settling on the
        combination that ultimately became our production stack. At the
        time, the decision felt obvious given the constraints we were
        operating under, but with the benefit of hindsight it is worth
        revisiting exactly what we chose and why, if only to document the
        reasoning for anyone joining the team later who wonders how we
        arrived here.
      </p>

      <p>
        Our first major decision was around the primary application
        framework. We wanted something with a mature ecosystem, predictable
        performance characteristics, and a community large enough that we
        would not be the only ones hitting a given edge case. We evaluated
        several contenders, weighed their trade-offs against our team's
        existing familiarity, and ultimately picked the option that let us
        move fastest without locking us into patterns we would later regret.
      </p>

      <p>
        Database selection followed a similar process. We needed something
        that could handle our expected write volume comfortably while still
        giving us the flexibility to model relationships between entities
        without excessive denormalization. We also weighed operational
        overhead heavily, since none of us wanted to become full-time
        database administrators on top of our existing responsibilities, so
        managed hosting mattered as much as the underlying engine itself.
      </p>

      <p>
        For hosting and deployment, we prioritized simplicity above almost
        everything else. Our team was small, and every hour spent wrangling
        infrastructure was an hour not spent building the product itself.
        We chose a platform that let us deploy from a git push, handled
        scaling transparently, and did not require us to maintain our own
        servers, load balancers, or certificate renewal processes by hand.
      </p>

      <p>
        Looking back, most of these choices have aged reasonably well, but
        the ecosystem has moved on considerably since we made them. Newer
        tools have emerged that address problems we did not even know we
        had at the time, and some of the trade-offs we accepted back then
        would probably be made differently today. We have not revisited any
        of this tooling since the original decision, and this page has sat
        untouched describing a stack that predates several major version
        upgrades across nearly every piece of it.
      </p>

      <p>
        None of the claims made above are backed by a citation, a source,
        or a link to any of the tools, frameworks, or providers mentioned —
        despite being long-form informational content well past the point
        where a reader would reasonably expect at least one outbound
        reference to support what is being described here.
      </p>
    </main>
  );
}
