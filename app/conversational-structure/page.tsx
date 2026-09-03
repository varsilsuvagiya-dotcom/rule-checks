// QA fixture page — intentionally violates every PAGE-scope rule in the
// `conversational_structure` category so the scanner's GEO conversational-structure
// rules can be verified against a known-broken page. See per-rule comments below
// for exactly which real check (georank-ai apps/backend/.../conversational-structure/*.rule.ts)
// each element trips.
export default function ConversationalStructureFixturePage() {
  return (
    <main>
      <h1>TEST FIXTURE — intentionally broken, not a real business.</h1>
      <p>Broken Fixture Co — conversational-structure rule violations fixture page.</p>

      {/*
        conversational_structure.question_headings: page has >= minHeadings (3) H2
        headings below, and NONE match QUESTION_HEADING (no leading interrogative,
        no trailing "?") -> questionHeadings count = 0 -> FAIL.

        conversational_structure.question_coverage: page is >= minWords (250) and the
        combined heading+paragraph text below deliberately avoids all 8 WH_WORDS
        (what/why/how/when/where/who/can/should) as whole words -> coveredCount = 0/8
        -> FAIL.

        conversational_structure.topic_transition: page is >= minWords (400) and has
        >= minSections (3) H2 headings; the H2 labels are duplicated verbatim
        ("Platform Overview" appears twice, plus one empty-label heading) so
        badRatio exceeds maxDupRatio -> FAIL.

        conversational_structure.natural_language_flow: page is >= minWords (200)
        with paragraphs below; the word "platform" is repeated far beyond the warn/
        fail keyword-share thresholds -> FAIL.

        conversational_structure.dialogue_readability: page is >= minWords (250)
        with paragraphs; body avoids "?", avoids second-person pronouns (you/your/we/
        our/us/I/my/let's), and avoids instructional verbs (use/add/create/check/
        ensure/try/consider/avoid/etc.) -> questionScore + pronounScore +
        instructionalScore is far below the warn floor -> FAIL.

        conversational_structure.how_to_structure: no STEP_PATTERN wording
        (no "step 1", "first,", "how to", etc.) anywhere on the page -> NOT_APPLICABLE
        (rule only applies to pages with instructional intent; this page deliberately
        carries none, which is itself part of the violation surface).

        conversational_structure.comparison_sections: page is >= minWords (300) but
        deliberately contains no COMPARISON_PATTERN wording (vs/versus/pros and cons/
        alternatives/compared to/better than) and no tables -> signals = 0 ->
        NOT_APPLICABLE.

        conversational_structure.answer_first / answer_completeness: both require
        hasQuestions (a question-phrased heading, "?" in body, or FAQ pattern) before
        they evaluate at all. This page has none of those by design (see
        question_headings above), so both rules correctly return NOT_APPLICABLE —
        the page's total absence of question-posing structure is exactly the defect
        under test.

        conversational_structure.callout_blocks: page is >= minWords (500) via the
        paragraphs below, and none of them start with CALLOUT_PATTERN wording
        (Tip:/Note:/Important:/Warning:/Best practice:/Example:/Pro tip:/Remember:/
        Key takeaway:) -> callouts = 0 -> WARNING (missed-opportunity verdict, the
        worst outcome this opportunity-based rule can produce).
      */}

      <h2>Platform Overview</h2>
      <p>
        Broken Fixture Co maintains a proprietary enterprise platform comprising
        several interlocking modules. The platform architecture was designed
        around modular deployment units, each unit governed by internal platform
        configuration standards. Platform administrators oversee provisioning,
        platform capacity planning, and platform lifecycle governance across all
        regional deployments currently in operation.
      </p>
      <p>
        The platform ingests structured records from upstream systems, applies a
        series of platform-level transformation stages, and persists the results
        into the platform data layer. Downstream consumers query the platform
        data layer through a fixed set of platform interfaces documented in the
        internal platform specification repository maintained by the platform
        engineering group.
      </p>

      <h2>Platform Overview</h2>
      <p>
        Operational oversight of the platform is distributed across three
        internal committees, each responsible for a distinct platform domain.
        The infrastructure committee manages platform capacity. The compliance
        committee manages platform policy documentation. The release committee
        manages platform versioning schedules and platform deprecation notices
        published on a quarterly cadence.
      </p>
      <p>
        Platform stability metrics are aggregated nightly into a platform
        reporting dashboard visible only to platform stakeholders holding
        appropriate internal clearance. Historical platform metrics extend back
        eleven fiscal quarters, forming the baseline used for platform capacity
        forecasting exercises conducted by the platform engineering group.
      </p>

      <h2></h2>
      <p>
        Contract terms governing platform usage are negotiated on a per-account
        basis and recorded in the platform legal archive. Amendments to platform
        contract terms require sign-off from the platform legal liaison and the
        platform finance liaison prior to activation in the platform billing
        subsystem responsible for platform invoicing.
      </p>
      <p>
        The platform billing subsystem reconciles usage records against the
        platform contract archive on a monthly basis. Discrepancies identified
        during platform reconciliation are routed to the platform finance
        liaison for resolution under the platform dispute-handling procedure
        documented separately from the platform contract archive.
      </p>

      <h2>Deployment Standards</h2>
      <p>
        Deployment of platform modules follows an internal release procedure
        maintained by the platform engineering group. Each platform module
        passes through staging environments before promotion to the production
        platform tier. The production platform tier is monitored continuously
        for platform capacity thresholds and platform error-rate thresholds
        defined in the platform service-level documentation.
      </p>
      <p>
        Platform service-level documentation is reviewed annually by the
        platform governance board, a cross-functional body comprising
        representatives from platform engineering, platform operations, and
        platform legal. Revisions to platform service-level documentation take
        effect at the start of the following fiscal quarter, following
        publication in the platform governance archive.
      </p>
      <p>
        Platform incident records are retained in the platform governance
        archive for a fixed retention period established by platform policy.
        Retrieval of archived platform incident records requires a formal
        request submitted through the platform governance board intake queue,
        processed in the order received by platform archive staff.
      </p>
    </main>
  );
}
