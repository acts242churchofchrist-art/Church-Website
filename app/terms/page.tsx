import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
import { siteConfig } from '@/data/site'

export const metadata = {
  title: 'Terms of Use — Acts 242',
}

export default function TermsPage() {
  return (
    <>
      <Section>
        <PageHero
          eyebrow="Legal"
          title="Terms of Use"
          description="By using this website, you agree to the following terms."
        />
      </Section>

      <Section className="bg-muted">
        <div className="mx-auto max-w-3xl space-y-10">

          <div className="rounded-3xl border border-border bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy">Effective date</p>
            <p className="mt-2 text-sm text-text-soft">April 2026 — {siteConfig.fullChurchName}, {siteConfig.address}</p>
          </div>

          <div className="rounded-3xl border border-border bg-white p-8 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground">1. About this website</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                This website is operated by {siteConfig.fullChurchName} for the purposes of ministry, discipleship, and church communication. Access to this website is provided free of charge.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">2. Permitted use</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                You may use this website to learn about the church, access discipleship materials, watch live stream content, and contact the church. You may not use this website for any unlawful purpose, to transmit harmful content, or to misrepresent the church or its teachings.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">3. Intellectual property</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                All content on this website — including the ACTS 242 Foundation Guide, lesson materials, written content, and church branding — is the property of Acts 242 Church of Christ Corporation unless otherwise stated.
              </p>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                Materials may be used, printed, and reproduced for personal study, one-on-one discipleship, small group gatherings, and church ministry within Acts 242, with proper permission from church leadership. Materials may not be sold, republished, or distributed for commercial purposes without written permission.
              </p>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                Scripture quotations are from the Holy Bible (NIV and other translations) and remain the property of their respective publishers. They are used here under standard fair use for ministry and educational purposes.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">4. IP infringement notice</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                If you believe that any content on this website infringes your intellectual property rights, please contact us at{' '}
                <a href={`mailto:${siteConfig.email}?subject=IP Infringement Notice`} className="font-semibold text-navy hover:underline">
                  {siteConfig.email}
                </a>{' '}
                with the subject line "IP Infringement Notice". Please include a description of the copyrighted work, the location of the infringing content on this site, and your contact information. We will review and respond promptly.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">5. Third-party links and embeds</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                This website contains links to Facebook, YouTube, and other external services. We are not responsible for the content or privacy practices of those services. Accessing third-party links is at your own discretion.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">6. Disclaimer</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                This website is provided as-is for ministry purposes. We make no warranties, express or implied, regarding accuracy, availability, or fitness for any particular purpose. We are not liable for any loss or damage arising from your use of this website.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">7. Governing law</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                These terms are governed by the laws of the Republic of the Philippines. Any disputes shall be subject to the jurisdiction of the courts of Parañaque City, Metro Manila.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">8. Changes to these terms</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                We may update these terms from time to time. Continued use of the website after changes are posted constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground">9. Contact</h2>
              <p className="mt-3 text-sm leading-7 text-text-soft">
                For questions about these terms, contact us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="font-semibold text-navy hover:underline">
                  {siteConfig.email}
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
