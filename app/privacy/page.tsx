import type { Metadata } from "next";
import LegalPage from "../LegalPage";
import CookieSettingsButton from "../CookieSettingsButton";

export const metadata: Metadata = { title: "Privacy Policy · RTG" };

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="9 November 2026"
      intro="RTG Agency (“RTG”, “we”) is a web, SEO and AI-search agency based in Lagos, Nigeria. This policy explains what we collect on rtg.studio, why, and the choices you have."
    >
      <h2>1. What we collect</h2>
      <ul>
        <li><strong>What you send us.</strong> If you contact us or fill in a form, we receive your name, email address and message, plus anything else you choose to share.</li>
        <li><strong>Reviews.</strong> If you submit a review, we store the name, text and rating you provide so it can be moderated and displayed.</li>
        <li><strong>Technical data.</strong> Like most websites, our hosting provider may log your IP address, browser and the pages requested for security and reliability.</li>
      </ul>

      <h2>2. Cookies and local storage</h2>
      <p>We keep this to a minimum.</p>
      <ul>
        <li><strong>Essential.</strong> We store your cookie choice (<code>rtg_cookie_consent</code>) so we do not ask you again, and the site may save form drafts or review submissions in your browser’s local storage. These do not track you and the site needs them to work.</li>
        <li><strong>Optional.</strong> If we add analytics or similar tools, they will only run if you choose “Accept all”. Today we do not run any advertising or cross-site tracking cookies.</li>
      </ul>
      <p>Your choice is remembered for about six months. You can change it any time: <CookieSettingsButton /></p>

      <h2>3. How we use your information</h2>
      <ul>
        <li>To reply to enquiries and provide quotes and services.</li>
        <li>To moderate and publish reviews.</li>
        <li>To keep the site secure and working.</li>
        <li>To meet legal and accounting obligations.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>4. Third parties</h2>
      <p>We rely on a few providers who process data on our behalf: GitHub Pages and Netlify (hosting), Namecheap (domain and email), and Google Fonts (typefaces, which means your browser requests fonts from Google). Each has its own privacy policy.</p>

      <h2>5. How long we keep it</h2>
      <p>Enquiries are kept as long as needed to deal with them and for a reasonable period after, usually no more than 24 months. Client records are kept for as long as the law requires. Published reviews stay until you ask us to remove them.</p>

      <h2>6. Your rights</h2>
      <p>Under the Nigeria Data Protection Act 2023 and, where it applies to you, the GDPR, you may ask to access, correct or delete your personal data, object to or restrict how we use it, and withdraw consent at any time. Email <a href="mailto:hello@rtg.studio">hello@rtg.studio</a> and we will respond within 30 days. You can also complain to the Nigeria Data Protection Commission or your local regulator.</p>

      <h2>7. Security</h2>
      <p>We use HTTPS and limit who can see enquiries. No method of transmission is perfectly secure, so please avoid sending sensitive information such as passwords or card numbers by email or form.</p>

      <h2>8. Children</h2>
      <p>Our services are for businesses and are not directed at children under 16.</p>

      <h2>9. Changes</h2>
      <p>We may update this policy. The date at the top shows when it last changed. If the changes are significant we will ask for your cookie choice again.</p>

      <h2>10. Contact</h2>
      <p>RTG Agency, Lagos, Nigeria · <a href="mailto:hello@rtg.studio">hello@rtg.studio</a></p>
    </LegalPage>
  );
}
