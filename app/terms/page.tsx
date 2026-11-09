import type { Metadata } from "next";
import LegalPage from "../LegalPage";

export const metadata: Metadata = { title: "Terms & Conditions · RTG" };

export default function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="9 November 2026"
      intro="These terms apply to your use of rtg.studio and to the services RTG Agency (“RTG”, “we”) provides. By using the site or hiring us you agree to them."
    >
      <h2>1. Using this website</h2>
      <p>You may browse and use the site for lawful purposes. Please do not misuse it: no attempts to break, overload or gain unauthorised access to it, and no submitting false, abusive or unlawful content through our forms or review feature.</p>

      <h2>2. Our services</h2>
      <p>RTG provides web design and development, SEO and AI-search optimisation. The scope, deliverables, timeline and price for each project are set out in the written quote or proposal you accept. Prices shown on the site are a guide and may change until a quote is agreed.</p>

      <h2>3. Payments</h2>
      <ul>
        <li>Unless the quote says otherwise, work starts after the agreed deposit is paid.</li>
        <li>Invoices are due within the period stated on them. We may pause work on overdue invoices.</li>
        <li>Deposits are non-refundable once work has started, except where we fail to deliver what was agreed.</li>
      </ul>

      <h2>4. Your responsibilities</h2>
      <p>You will give us timely feedback, content and access we reasonably need, and confirm you own or have the right to use everything you supply. Delays on your side may move delivery dates.</p>

      <h2>5. Intellectual property</h2>
      <p>On full payment, you own the final deliverables created for you. We keep ownership of our tools, code libraries, templates and know-how, and you receive a licence to use them as part of your deliverables. Third-party assets (fonts, stock images, plugins) stay under their own licences. We may show the finished work in our portfolio unless you ask us not to.</p>

      <h2>6. Results and SEO</h2>
      <p>Search and AI-answer rankings depend on factors outside our control, including search engines’ own changes. The results and figures shown on this site are examples from past projects and are not a guarantee of future performance.</p>

      <h2>7. Reviews</h2>
      <p>Reviews are moderated before they appear. We may edit for length or remove content that is false, abusive or off-topic.</p>

      <h2>8. Liability</h2>
      <p>The site is provided “as is”. To the extent the law allows, RTG is not liable for indirect or consequential loss, and our total liability for any claim relating to a service is limited to the amount you paid us for that service. Nothing here limits liability that cannot lawfully be limited.</p>

      <h2>9. Termination</h2>
      <p>Either party may end a project with written notice. You will pay for work completed up to that point.</p>

      <h2>10. Privacy</h2>
      <p>How we handle personal data is explained in our <a href="/privacy">Privacy Policy</a>.</p>

      <h2>11. Governing law</h2>
      <p>These terms are governed by the laws of the Federal Republic of Nigeria, and the courts of Lagos State have jurisdiction, unless a signed project agreement says otherwise.</p>

      <h2>12. Changes and contact</h2>
      <p>We may update these terms; the date above shows the latest version. Questions: <a href="mailto:hello@rtg.studio">hello@rtg.studio</a>.</p>
    </LegalPage>
  );
}
