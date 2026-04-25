import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
import { siteConfig } from '@/data/site'

export const metadata = {
  title: 'Privacy Policy — Acts 242',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Section>
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description="This policy explains how Acts 242 Church of Christ handles information on this website."
        />
      </Section>

      <Section className="bg-muted">
        <div className="mx-auto max-w-3xl space-y-10">

          <div className="rounded-3xl border border-border bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Effective date</p>
            <p className="mt-2 text-sm text-text-soft">April 2026 — Acts 242 Church of Christ Corporation, {siteConfig.address}</p>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">1. Who we are</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                {siteConfig.fullChurchName} ("Acts 242", "we", "us") operates this website for ministry, discipleship, and church communication purposes. We are a registered corporation in the Philippines.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">2. What data we collect</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                This website contains contact forms for the following purposes: talking to a pastor, submitting a prayer request, and first-time visitor registration. These forms are processed by Formspree (see Section 3 below).
              </p>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                When you submit a form, you may provide your name, phone number, email address, and a written message. This information is received by our church email account and is used only to respond to your request and provide pastoral care. We do not sell, share, or market your information to third parties.
              </p>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                This website does not have user accounts, login systems, or payment processing.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">3. Third-party services</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                <span className="font-semibold text-foreground">Formspree:</span> Our contact forms are processed by Formspree, Inc. When you submit a form, your data is transmitted to and stored by Formspree before being forwarded to our church email. Formspree's Privacy Policy is available at <span className="font-medium text-navy">formspree.io/legal/privacy-policy</span>.
              </p>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                <span className="font-semibold text-foreground">YouTube (Google LLC):</span> This website embeds YouTube video content. YouTube may collect data when you interact with embedded videos, including your IP address and viewing behavior. This is governed by Google's Privacy Policy at <span className="font-medium text-navy">policies.google.com</span>.
              </p>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                <span className="font-semibold text-foreground">Vercel, Inc.:</span> This website is hosted on Vercel. Vercel may collect server logs including IP addresses for operational purposes. See Vercel's Privacy Policy at <span className="font-medium text-navy">vercel.com/legal/privacy-policy</span>.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">4. Cookies</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                This website does not set any tracking cookies. Vercel and YouTube may set operational or functional cookies through their respective services.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">5. Your rights (Philippine Data Privacy Act — RA 10173)</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                Under the Philippine Data Privacy Act of 2012, you have the right to be informed, to access, to correct, and to object to the processing of personal data. If you have submitted personal information through email and wish to have it removed, you may request this by contacting us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">6. Children</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                This website is not directed to children under 13. We do not knowingly collect personal information from children.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">7. Changes to this policy</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                We may update this policy from time to time. Changes will be posted on this page with an updated effective date.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">8. Contact</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                For privacy concerns, contact us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-navy hover:underline">
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </div>

          <p className="text-xs text-text-soft text-center">
            For privacy concerns or data removal requests, contact us at{' '}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-navy hover:underline">
              {siteConfig.email}
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  )
}
