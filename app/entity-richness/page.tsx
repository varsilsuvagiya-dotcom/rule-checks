import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entity Richness | Broken Fixture Co",
};

export default function EntityRichnessPage() {
  return (
    <main style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px" }}>
      <p>TEST FIXTURE — intentionally broken, not a real business.</p>
      <h1>Entity Richness</h1>

      <p>
        This page is about a thing that a group of people made for other
        people to use. It does what it does, and it helps with the stuff it
        was made to help with. There is not much more to say about it than
        that, because the people who made it prefer to keep things general
        rather than getting into specifics about who did what, where it
        happened, or when any of it took place. The thing itself is offered
        by an organization, but the organization is not named here, and the
        people involved in making the thing are not named either. They are
        just referred to as the team, or the people, or those involved, or
        whoever was responsible at the time.
      </p>

      <p>
        Over time, the thing has changed. It used to be one way, and now it
        is another way, though the exact nature of that change is left
        vague on purpose. Some people who used the thing had opinions about
        it, and those opinions were shared with other people, who then
        formed their own opinions, and so on. None of these people are
        identified. None of the places where any of this happened are
        identified either. It could have happened anywhere, really, and
        that is sort of the point of describing it this way — nothing here
        is meant to be pinned down to a specific person, a specific
        company, a specific city, or a specific date.
      </p>

      <p>
        The thing connects to other things, in a general sense. There is
        a process behind it, and there are steps involved, and there is a
        result at the end of the steps, but none of the steps are named,
        none of the tools involved are named, and none of the outcomes are
        described using any numbers, percentages, or measurable claims.
        Instead, the whole situation is described only in terms of it, this,
        that, the process, the outcome, and the people, without ever once
        anchoring any of those words to something a reader — or a machine
        trying to build a model of who or what this page is about — could
        actually look up, verify, or connect to anything else it might
        already know.
      </p>

      <p>
        In the end, the goal here was simply to talk about the situation in
        the broadest possible terms. The people involved did what they did,
        the thing became what it became, and the outcome was whatever it
        was. Readers are invited to draw their own conclusions, form their
        own picture of what happened, and decide for themselves whether any
        of it matters, since nothing on this page offers a name, a title, a
        role, a place, a date, or a measurable fact to build that picture
        from in the first place.
      </p>
    </main>
  );
}
