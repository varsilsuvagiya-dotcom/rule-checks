import { redirect } from "next/navigation";

// Deliberately a redirecting internal-link target — the /internal-linking page links to
// this URL directly instead of to its final destination, so the crawler must follow a 3xx
// hop to resolve it. Feeds internal_linking.redirecting_links.
export default function OldRedirectingTargetPage() {
  redirect("/internal-linking/same-target");
}
