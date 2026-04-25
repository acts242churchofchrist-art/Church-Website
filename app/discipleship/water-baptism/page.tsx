import { Section } from '@/components/layout/section'
import { PageHero } from '@/components/sections/page-hero'
import { ButtonLink } from '@/components/ui/button-link'

export default function WaterBaptismPage() {
  return (
    <>
      <Section>
        <PageHero
          eyebrow="Water baptism"
          title="Take your next step in obedience"
          description="If you have gone through the foundation guide and are ready to follow Jesus more fully, we encourage you to speak with a pastor or church leader and take your next step with understanding and faith."
          actions={
            <>
              <ButtonLink href="/connect">Talk to a pastor</ButtonLink>
              <ButtonLink href="/discipleship" variant="secondary">
                Back to discipleship
              </ButtonLink>
            </>
          }
        />
      </Section>

      <Section className="bg-muted">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-6">
            <h2 className="text-xl font-semibold text-foreground">Why baptism matters</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">
              Baptism is connected to Christ's death, burial, and resurrection. It represents dying to the old life, burial of the old self, and rising to walk in newness of life. It is a powerful picture of what has happened through faith in Christ.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6">
            <h2 className="text-xl font-semibold text-foreground">Who it is for</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">
              Baptism is for those who have heard the gospel, been cut to the heart, and are ready to repent and respond in faith and obedience. It is for those who believe that Jesus is Lord and are ready to follow Him fully.
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6">
            <h2 className="text-xl font-semibold text-foreground">Your next step</h2>
            <p className="mt-3 text-sm leading-7 text-text-soft">
              Speak with a pastor or church leader. Share what God has been teaching you. Ask your questions. Express your readiness. We want to walk this step with you.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-border bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Acts 2:38</p>
            <p className="mt-4 text-base leading-8 text-foreground">
              Peter replied, "Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins. And you will receive the gift of the Holy Spirit."
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-white p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">Romans 6:3–4</p>
            <p className="mt-4 text-base leading-8 text-foreground">
              All who were baptized into Christ Jesus were baptized into His death. Through baptism, we were buried with Him so that just as Christ was raised, we too may live a new life.
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-muted">
        <div className="rounded-3xl border border-border bg-white p-8 md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-navy">From the Foundation Guide — Next Steps</p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-text-soft">
            If you have gone through this guide and are ready to follow Jesus more fully, do not stop here. If you believe you are ready to take this step, we encourage you to speak with a pastor or church leader. Share what God has been teaching you, ask your questions, and express your readiness to be baptized.
          </p>
          <p className="mt-4 max-w-3xl text-base leading-8 text-text-soft">
            You may also continue reading the Bible daily, pray and seek God consistently, and join the church in worship and fellowship.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="/connect">Talk to a pastor</ButtonLink>
            <ButtonLink href="/discipleship/discipleship" variant="secondary">
              Review Lesson 5
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
