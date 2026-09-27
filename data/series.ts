/**
 * TEACHING SERIES — multi-session series taught across a season.
 *
 * Adding a session: append to `sessions`. Adding its deck: set `pdfUrl` once the
 * compressed PDF is committed under /public/series/<slug>/. Download buttons only
 * render for sessions that have a file, so a session can be listed before its deck
 * is ready without producing a dead link.
 *
 * Decks must be compressed to roughly 3 MB or less before being committed — the
 * source presentations run 7–30 MB and would load badly on mobile data.
 */

/** A teaching block within a session body. */
export type SessionBlock =
  | { kind: 'prose'; heading?: string; subheading?: string; text: string }
  | { kind: 'scripture'; reference: string; translation?: string; text: string }
  | { kind: 'leaderNote'; text: string }

export type SeriesSession = {
  /** Field names mirror the lesson frontmatter spec: session / sessionSlug / sourcePages. */
  number: number
  sessionSlug: string
  title: string
  subtitle?: string
  focus: string
  /** `YYYY-MM-DD`, only where the teaching date is actually known. */
  date?: string
  /** Page range in the source deck, e.g. '3-28'. */
  sourcePages?: string
  /** Path under /public once the compressed deck is committed. */
  pdfUrl?: string
  /** Credited on the deck itself; omitted where the deck carries no credit. */
  teacher?: string

  // ── Session body. Absent until the decks are transcribed; the page renders an
  // honest "not yet published" state rather than filler.
  body?: SessionBlock[]
  /** One question per entry — they render one per line so a reader holds one at a time. */
  reflection?: string[]
  challenge?: string
  prayer?: string
}

export type TeachingSeries = {
  slug: string
  title: string
  subtitle: string
  season: string
  intro: string[]
  verse: { text: string; reference: string }
  sessions: SeriesSession[]
  coverImage?: string
}

export const teachingSeries: TeachingSeries[] = [
  {
    slug: 'inner-healing-202-trauma',
    title: 'Inner Healing 202: Trauma',
    subtitle: 'Understanding, Healing, and Hope',
    season: 'May – August 2026',
    intro: [
      'Trauma is often imagined as one devastating moment. In truth it takes many forms — sudden events, long-term wounds, neglect, loss, and silence — and it shapes the mind, the body, and the way we relate to others.',
      'Over six sessions, Inner Healing 202 walked through what trauma is, how it forms, and what Scripture says to those who carry it. The series held two things together: honest language for pain, and the promise that God restores what was broken.',
    ],
    verse: {
      text: 'He heals the brokenhearted and binds up their wounds.',
      reference: 'Psalm 147:3',
    },
    sessions: [
      {
        number: 1,
        sessionSlug: 'the-many-faces-of-trauma',
        title: 'The Many Faces of Trauma',
        subtitle: 'Understanding how trauma forms and the many shapes it takes',
        focus:
          'Childhood, emotional, physical, generational, social and cultural trauma; loss and grief; pathways to healing.',
        date: '2026-05-24',
        teacher: 'Sis. Karol',
        pdfUrl: '/series/inner-healing-202-trauma/the-many-faces-of-trauma.pdf',
        body: [
          {
            kind: 'prose',
            heading: 'Beyond a single event',
            text: 'Trauma is often imagined as one devastating moment — the accident, the phone call, the day everything changed. In truth it takes many forms. Sudden events, yes, but also long-term wounds, neglect, loss, discrimination, and silence. It shapes the mind, the body, and the way we relate to other people, often for years afterwards.',
          },
          {
            kind: 'prose',
            heading: 'What trauma is',
            text: 'Trauma is an emotional and psychological response to deeply distressing experiences. It is also personal: what is traumatic for one person may not affect another the same way, and that difference is not a measure of anyone’s strength. Age, environment, support systems and past experiences all shape how an event lands.',
          },
          {
            kind: 'leaderNote',
            text: 'This first session is descriptive rather than prescriptive. The aim is to give the group language, not to sort anyone into a category. Let people recognise themselves quietly.',
          },
          {
            kind: 'prose',
            heading: 'Childhood trauma',
            subheading: 'Invisible scars carried into adulthood',
            text: 'Abuse, neglect, abandonment, bullying and witnessing violence leave deep wounds that shape how we see ourselves and relate to others. The effects on self-esteem, trust and emotional regulation can last for years after the events themselves have ended.',
          },
          {
            kind: 'prose',
            heading: 'Emotional and psychological trauma',
            text: 'Emotional trauma leaves no visible marks, yet creates deep wounds that affect self-worth and security. Constant criticism, manipulation, betrayal, humiliation and emotional neglect can be just as damaging as physical harm. These invisible scars shape how we see ourselves and relate to others.',
          },
          {
            kind: 'prose',
            heading: 'Physical trauma',
            subheading: 'When the body bears the wound',
            text: 'Physical violence, accidents and injuries create both immediate shock and prolonged emotional pain that extends far beyond the body. Survivors may experience anxiety, fear and PTSD long after the physical wounds have healed.',
          },
          {
            kind: 'prose',
            heading: 'Generational trauma',
            subheading: 'Echoes across time',
            text: 'Behaviours, fears, coping mechanisms and family histories carry trauma echoes from one generation to the next. Communities affected by war, poverty, oppression and displacement experience it across multiple generations.',
          },
          {
            kind: 'prose',
            heading: 'Social and cultural trauma',
            subheading: 'Collective wounds from systemic injustice',
            text: 'Discrimination, racism, sexism and poverty create emotional wounds at the community level, affecting entire groups rather than individuals alone. Repeated injustice and marginalisation deepen social trauma across communities.',
          },
          {
            kind: 'prose',
            heading: 'Loss and grief',
            subheading: 'When trauma follows loss',
            text: 'Death, separation, broken relationships and major life changes can trigger deep trauma that reshapes identity and emotional stability. People respond differently to loss — some withdraw, others seek connection — and healing timelines vary greatly. There is no schedule that grief is supposed to keep.',
          },
          {
            kind: 'prose',
            heading: 'How trauma shows itself',
            text: 'It surfaces as mental health challenges and anxiety; as physical symptoms and chronic pain; as relationship difficulties and trouble trusting; and as an altered self-image and a struggle over identity. Much of this is invisible from the outside.',
          },
          {
            kind: 'prose',
            heading: 'Healing and recovery',
            text: 'There are real pathways: therapy, support systems, self-care, creativity and spirituality. The first step is recognising trauma for what it is — that recognition is itself the beginning of healing. And survivors do not only recover; many develop resilience, empathy and a particular kind of inner strength.',
          },
          {
            kind: 'prose',
            heading: 'Why this matters for the church',
            text: 'Trauma’s many faces remind us that pain is often hidden from view. Behind silence, anger, perfectionism or isolation may lie experiences that have shaped a whole life. When a community understands that, it becomes a safer place for healing, connection and hope.',
          },
        ],
        reflection: [
          'Take a moment to breathe and reflect on your own journey. Honour where you have been and where you are going.',
          'Which of these forms of trauma gave you language for something you had not named before?',
          'Who around you might be carrying something you have not been able to see?',
        ],
        challenge:
          'No one must face trauma alone. This week, notice one person whose silence, anger or withdrawal you had read as a character trait — and consider that it may be a wound. Offer them patience rather than a diagnosis.',
      },
      {
        number: 2,
        sessionSlug: 'developmental-trauma',
        title: 'Developmental Trauma: Understanding Early Wounds',
        subtitle: 'Early wounds, attachment, and the cycles they set in motion',
        focus:
          'Childhood and neglect trauma, betrayal by caregivers, attachment patterns, intergenerational cycles.',
        pdfUrl: '/series/inner-healing-202-trauma/developmental-trauma.pdf',
        body: [
          {
            kind: 'prose',
            heading: 'What developmental trauma covers',
            text: 'Developmental trauma is trauma arising during childhood and development, especially from caregivers and family systems. It gathers up five things the last session treated separately: childhood trauma, neglect, betrayal involving caregivers, emotional and psychological trauma during development, and generational trauma. Two questions run through all of it — how did early experiences shape beliefs about self, others and safety, and what attachment patterns developed as a result?',
          },
          {
            kind: 'prose',
            heading: 'Childhood and neglect trauma',
            text: 'Childhood trauma occurs during formative years, often involving abuse, violence or instability in the home. It can deeply shape a child’s developing brain, sense of safety and ability to regulate emotions. Neglect works differently but cuts just as deep: it is harm caused by the absence of essential care, nurturing and emotional attunement, depriving a child of the foundation needed for healthy development and disrupting attachment, self-worth and the capacity to trust.',
          },
          {
            kind: 'prose',
            heading: 'Betrayal trauma',
            text: 'Betrayal trauma occurs when a trusted caregiver causes harm, violating the child’s sense of safety and trust. Because the source of harm is also the source of care, it deeply disrupts attachment bonds — leaving confusion, shame, and difficulty trusting others in later relationships.',
          },
          {
            kind: 'prose',
            heading: 'Generational trauma',
            text: 'Generational trauma passes down through family lines, affecting children and grandchildren of those who first experienced it. Patterns of neglect, abuse or emotional unavailability repeat across generations, often without anyone noticing. Healing begins by recognising these cycles — and understanding that they can be broken.',
          },
          {
            kind: 'prose',
            heading: 'How early experience shapes belief',
            text: 'The relationships and environments we meet in childhood become the blueprint for how we read the world. Early trauma — neglect, emotional harm, or betrayal by a caregiver — can deeply alter core beliefs about trust, safety and self-worth, and those beliefs often persist well into adulthood without ever being examined.',
          },
          {
            kind: 'prose',
            heading: 'Attachment patterns',
            text: 'Early experiences with caregivers shape how we relate to others, form bonds, and perceive safety throughout life. Secure attachment develops where caregivers are consistent and responsive. Insecure styles — anxious, avoidant, or disorganised — often emerge from trauma, neglect, or unpredictable caregiving.',
          },
          {
            kind: 'leaderNote',
            text: 'Attachment language can land hard on parents in the room. Keep the frame on understanding rather than blame: naming a pattern is what makes it possible to break, and most caregivers were handed the pattern themselves.',
          },
          {
            kind: 'prose',
            heading: 'Surrendering our wounds to God',
            text: 'God welcomes those who are hurting. We do not have to carry our pain alone. He offers rest, comfort and strength for the healing journey, and surrendering our struggles to Him is what opens the way to His peace and guidance.',
          },
          {
            kind: 'scripture',
            reference: '1 Peter 5:7',
            text: 'Cast all your anxiety on Him because He cares for you.',
          },
          {
            kind: 'prose',
            heading: 'God’s promise of restoration',
            text: 'Developmental trauma may shape our experiences, but it does not define our identity or our future. When we surrender our pain, our fears and our burdens to God, He walks with us through the process of healing and restoration. Healing begins when we acknowledge our wounds and entrust them to His care.',
          },
        ],
        reflection: [
          'Complete the sentence honestly: “Growing up, I learned that…” Does that belief still hold true today?',
          'Which family pattern do you recognise in yourself that you did not choose?',
          'What would it mean to hand that pattern to God rather than manage it alone?',
        ],
        prayer:
          'Father, You know the shape my early years left in me. Where I learned fear instead of safety, and silence instead of trust, meet me there. Break what should not continue, and let it stop with me. Amen.',
      },
      {
        number: 3,
        sessionSlug: 'healing-the-hidden-wounds',
        title: 'Healing the Hidden Wounds: A Biblical Response to Trauma',
        subtitle: 'A biblical response to trauma, and the church’s part in it',
        focus:
          'Trauma in today’s world, physical and loss trauma, fear-based and social trauma, how God heals, and the church’s response.',
        pdfUrl: '/series/inner-healing-202-trauma/healing-the-hidden-wounds.pdf',
        body: [
          {
            kind: 'scripture',
            reference: 'Luke 4:18–19',
            text: 'The Spirit of the Lord is upon Me, because He has anointed Me to preach good news to the poor. He has sent Me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free, to proclaim the year of the Lord’s favour.',
          },
          {
            kind: 'prose',
            heading: 'Trauma in today’s world',
            text: 'Trauma is not rare. Anxiety, depression, family breakdown, financial pressure, social media comparison, violence, loneliness, disasters — more people than ever carry hidden wounds. Understanding trauma is the first step toward healing, and Jesus does not pretend otherwise: “In this world you will have trouble. But take heart! I have overcome the world.”',
          },
          {
            kind: 'prose',
            heading: 'Physical trauma',
            text: 'Physical trauma includes injuries from abuse, accidents, illness, violence and disasters. Beyond the visible wounds, invisible emotional scars often linger long after the body heals. The woman with the issue of blood had suffered for years; Jesus healed her body and restored her dignity in the same moment — “Your faith has healed you. Go in peace.” God cares for the whole person.',
          },
          {
            kind: 'prose',
            heading: 'Loss trauma',
            text: 'Loss trauma arises from the pain of losing loved ones, relationships, jobs, health, or cherished dreams. Pandemic grief, broken families and financial hardship have made it more widespread than ever. We are not alone in our sorrow: John 11:35 records that Jesus wept, sharing fully in grief. God does not stand at a distance — He walks with us through every valley of loss.',
          },
          {
            kind: 'prose',
            heading: 'Fear-based trauma',
            text: 'This is living in constant fear because of painful experience or uncertainty — fear of failure, of rejection, of the future, or fear caused by abuse and instability. When Peter walked on the water, it was fear that made him sink, and Jesus immediately reached out and caught him. The reaching out is the point.',
          },
          {
            kind: 'scripture',
            reference: '2 Timothy 1:7',
            text: 'God has not given us a spirit of fear, but of power and of love and of a sound mind.',
          },
          {
            kind: 'prose',
            heading: 'Social and cultural trauma',
            text: 'Bullying, cyberbullying, rejection, poverty, discrimination and social comparison leave deep wounds. The Samaritan woman was defined by her past and excluded by her society — yet Jesus met her, saw her fully, and restored her identity. Society labels; Jesus restores.',
          },
          {
            kind: 'prose',
            heading: 'How does God heal?',
            text: 'Through His Word and prayer, which anchor the wounded soul and bring truth, comfort and direction. Through the Holy Spirit and community, where the church walks alongside the hurting — “mourn with those who mourn.” Through wise counsel, because seeking godly, professional or pastoral help is a mark of wisdom and courage, not of weak faith. And through time and obedience, because healing is usually a journey rather than an instant event.',
          },
          {
            kind: 'prose',
            heading: 'The church’s response',
            text: 'The church is called to reflect Christ’s compassion — a place of grace, not judgment. It must be a safe haven, free from condemnation and full of mercy, where the wounded meet the same grace Jesus extended to the broken and the outcast. That means being a community that listens before speaking, mourns with those who mourn, and walks alongside the suffering without rushing to fix or to judge.',
          },
          {
            kind: 'leaderNote',
            text: 'The instinct to fix is strong and usually unhelpful. If the group takes one thing from this session, let it be the discipline of listening without immediately offering a solution or a verse.',
          },
          {
            kind: 'prose',
            heading: 'Hope in Christ',
            text: 'Physical trauma — Jesus restores. Loss trauma — Jesus comforts. Fear-based trauma — Jesus gives peace. Social trauma — Jesus restores identity. The world may define you by your wounds, but Jesus invites you to bring them to Him, and in His presence you find healing, hope, and your true identity.',
          },
          {
            kind: 'scripture',
            reference: 'Revelation 21:4',
            text: 'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain.',
          },
        ],
        reflection: [
          'What wound am I still carrying?',
          'Have I invited Jesus into that pain, or only around it?',
          'Who around me needs compassion instead of criticism?',
        ],
        challenge:
          'Pick one person this week whom you would normally correct, and listen to them instead — all the way to the end, without preparing your reply while they speak.',
      },
      {
        number: 4,
        sessionSlug: 'through-a-medical-lens',
        title: 'Inner Healing: Trauma — Through a Medical Lens',
        subtitle: 'What trauma does to the brain and body, and what God promises',
        focus:
          'Adverse childhood experiences, how trauma reshapes the brain, manifestations in adult life, and God’s promise of restoration.',
        teacher: 'Sis. Karol',
        pdfUrl: '/series/inner-healing-202-trauma/through-a-medical-lens.pdf',
        body: [
          {
            kind: 'prose',
            heading: 'What childhood trauma is',
            text: 'Childhood trauma refers to Adverse Childhood Experiences — abuse, neglect, household dysfunction, or witnessing violence. These events overwhelm a child’s ability to cope, disrupting healthy brain development and affecting the nervous system, the stress response and emotional regulation long into adulthood.',
          },
          {
            kind: 'prose',
            heading: 'What it leaves behind',
            text: 'Emotional dysregulation, and difficulty managing intense feelings. Attachment difficulties, and trouble forming secure relationships. Physical health effects, including chronic stress and weakened immunity. And cognitive effects on memory and learning. These are not character flaws; they are the marks of an overwhelmed system.',
          },
          {
            kind: 'prose',
            heading: 'How trauma reshapes the brain',
            text: 'An overactive stress-response system. Disrupted memory formation in the hippocampus. A nervous system locked in fight, flight or freeze. Trauma is not only remembered — it is stored in the body, which is why it can surface without a thought preceding it.',
          },
          {
            kind: 'prose',
            heading: 'How it shows up in adult life',
            subheading: 'Relationship patterns',
            text: 'Unhealed childhood trauma often leads to anxious or avoidant attachment, difficulty trusting, fear of abandonment, and repeated cycles of painful relationships. Adults may unconsciously recreate familiar dynamics, struggle with vulnerability, or isolate themselves as a protective measure rooted in early wounds.',
          },
          {
            kind: 'prose',
            subheading: 'Emotional dysregulation',
            text: 'Because trauma disrupts the brain’s stress-response system, adults are left prone to intense emotional reactions, chronic anxiety, depression, and numbness. This is where the medical picture and God’s promise meet rather than compete.',
          },
          {
            kind: 'scripture',
            reference: 'Psalm 147:3',
            text: 'He heals the brokenhearted and binds up their wounds.',
          },
          {
            kind: 'prose',
            heading: 'From understanding to healing',
            text: 'Science reveals how childhood trauma reshapes the brain and body. Faith offers what medicine alone cannot — complete restoration of the wounded soul. No matter how deep the wounds run, God’s promise reaches deeper still. His healing is not merely emotional; it is wholeness for mind, body and spirit. He sees every hidden hurt and draws near to restore what was broken.',
          },
          {
            kind: 'prose',
            heading: 'What God says',
            text: '“Fear not, for I am with you” (Isaiah 41:10). “For I know the plans I have for you… plans for hope and a future” (Jeremiah 29:11). “The Lord is close to the brokenhearted” (Psalm 34:18). These are not consolations offered instead of care — they are the ground on which care stands.',
          },
          {
            kind: 'prose',
            heading: 'The path to healing',
            text: 'First, recognise the pain as real and valid; suppressing or denying a wound prevents it healing, and honest acknowledgment before God is the first courageous step. Then open your heart and invite God into the deepest part of it — prayer, worship and His Word make space for His presence. Then receive His restoration by faith: He was sent “to bind up the brokenhearted… to comfort all who mourn… to bestow on them a crown of beauty instead of ashes” (Isaiah 61:1–3).',
          },
          {
            kind: 'prose',
            heading: 'The brain can heal',
            text: 'Neuroplasticity means a traumatised mind can form new, healthy pathways. Childhood trauma rewires neural circuits — but with proper care, therapy and faith, restoration is possible. We were designed with the capacity for renewal, body and soul. True wholeness comes when medical healing and God’s grace work together. You are not defined by your trauma; in Christ you are a new creation.',
          },
          {
            kind: 'leaderNote',
            text: 'This session pairs clinical language with Scripture on purpose. Be clear with the group that seeking therapy is not a failure of faith — the deck treats medicine and grace as partners, and so should the discussion.',
          },
        ],
        reflection: [
          'Which of these effects have you recognised in yourself, without knowing where it came from?',
          'Where have you treated a trauma response as a personal failing?',
          'What would it look like to seek both prayer and professional help, rather than choosing between them?',
        ],
        challenge:
          'Healing from childhood trauma is possible — “Behold, I am making all things new” (Revelation 21:5). Take one concrete step this week: a conversation you have been avoiding, or an appointment you have been putting off.',
      },
      {
        number: 5,
        sessionSlug: 'who-is-jeremiah',
        title: 'Who Is Jeremiah? The Weeping Prophet',
        subtitle: 'A trauma-aware Bible study in the life of the weeping prophet',
        focus:
          'A trauma-aware Bible study — calling, opposition, lament, and the new covenant.',
        pdfUrl: '/series/inner-healing-202-trauma/who-is-jeremiah.pdf',
        body: [
          {
            kind: 'prose',
            heading: 'What this study is for',
            text: 'Not just information, but formation — learning to listen to God faithfully in painful seasons. The group rhythm is Scripture, context, story, reflection, prayer. By the end we want to know who Jeremiah was and why God called him, understand the crisis of Judah and Babylon, see why he is remembered as the weeping prophet, and connect his suffering with what this series has been saying about trauma and healing.',
          },
          {
            kind: 'prose',
            heading: 'Who was Jeremiah?',
            text: 'One of the major prophets of the Old Testament, son of Hilkiah, a priest from Anathoth. He was called by God while still young and ministered through the final years of Judah before Jerusalem fell. His message carried both warning and hope, and he lived long enough to see the warning come true.',
          },
          {
            kind: 'scripture',
            reference: 'Jeremiah 1:5',
            text: 'Before I formed you in the womb I knew you, before you were born, I set you apart.',
          },
          {
            kind: 'prose',
            heading: 'His calling',
            text: 'God’s calling was personal — “I knew you.” It was purposeful — “I set you apart.” It was missional — “I appointed you.” And it was sustained by His presence rather than by Jeremiah’s ability. God’s work in us often begins before we fully understand ourselves.',
          },
          {
            kind: 'prose',
            heading: 'He felt inadequate, and said so',
            text: 'Jeremiah answered that he did not know how to speak, and that he was too young. God did not dismiss the fear; He met him in it — “Do not be afraid of them, for I am with you and will rescue you” — then touched his mouth and gave him words. God does not ignore fear. He meets His servant inside it.',
          },
          {
            kind: 'prose',
            heading: 'The historical background',
            text: 'Jeremiah ministered from around 627 to 586 BC. Judah was spiritually declining and politically unstable while Babylon rose as the dominant empire. Jerusalem was destroyed in 586 BC, and the exile that followed became both a national wound and a theological crisis. Called around 627; Josiah dies in 609; Babylon rises in 605; the first exile in 597; Jerusalem falls in 586; and after that, hope and lament together. He lived through slow decline, repeated warnings, national collapse, and grief.',
          },
          {
            kind: 'prose',
            heading: 'His mission',
            text: 'To uproot and tear down, and to build and to plant. He was to warn Judah about sin and idolatry, call the people to repentance, expose injustice and false security, announce the coming judgment through Babylon, and declare God’s promise of restoration. Prophetic ministry is not only prediction; it is God confronting the present and opening a path back to Him.',
          },
          {
            kind: 'prose',
            heading: 'The opposition he faced',
            text: 'Faithfulness did not make his life easier. He was mocked and rejected by his own people, accused of weakening the nation, beaten and placed in stocks, threatened and imprisoned, and thrown into a muddy cistern. He often felt alone in his calling.',
          },
          {
            kind: 'prose',
            heading: 'Why “the weeping prophet”?',
            text: '“Oh, that my head were a spring of water and my eyes a fountain of tears!” Jeremiah grieved because the people rejected God, because he could see what was coming, and because he carried sorrow for his nation. His tears were not weakness; they were love. Biblical grief is not the opposite of faith — it can be a faithful response to pain.',
          },
          {
            kind: 'prose',
            heading: 'Jeremiah and trauma awareness',
            text: 'He experienced rejection, betrayal, fear, isolation, public shame and imprisonment. The book he left gives language for grief, lament, anger, confusion and hope. One care principle matters above the rest here: trauma is not always caused by personal sin. Biblical care listens with compassion before it gives advice.',
          },
          {
            kind: 'prose',
            heading: 'A trauma lens for Bible study',
            text: 'Developmental and relational wounds — rejection, loneliness, betrayal, a lack of safety. Threat and harm — fear, violence, imprisonment, public humiliation. Loss and cultural trauma — Jerusalem’s fall, exile, the grief of a whole community. A trauma-informed reading asks four questions: what happened, what did it cost, where was God present, and what hope does Scripture give?',
          },
          {
            kind: 'prose',
            heading: 'Emotional healing in Jeremiah',
            text: 'Lament — he brings honest pain before God. Truth — God names sin, injustice and false security. Presence — God says, “I am with you.” Hope — God promises restoration and a new covenant. Community — healing grows where truth and compassion meet. Healing does not erase the story; God redeems the story.',
          },
          {
            kind: 'scripture',
            reference: 'Jeremiah 31:33',
            text: 'I will put my law in their minds and write it on their hearts. I will be their God, and they will be my people.',
          },
          {
            kind: 'prose',
            heading: 'The new covenant',
            text: 'God promised inner transformation, not merely outward religion. He promised restored relationship — “I will be their God” — and forgiveness and mercy. Christians see this promise fulfilled in Jesus Christ. Judgment is not God’s final word; restoration is central to His redemptive heart.',
          },
          {
            kind: 'leaderNote',
            text: 'Give participants permission to pass on any question. Keep the space safe, confidential and prayerful, and allow roughly twelve to eighteen minutes for group sharing.',
          },
        ],
        reflection: [
          'What part of Jeremiah’s calling speaks to you most?',
          'Why do you think people rejected Jeremiah’s message?',
          'How does Jeremiah show that grief and faith can exist together?',
          'What is the difference between confronting sin and blaming someone for their trauma?',
          'Where do you need God’s promise, “I am with you,” today?',
        ],
        challenge:
          'Write one honest prayer of lament — “Lord, this hurts because…” Then one truth from Jeremiah — “Yet You are with me…” Then one hope-filled response — “Today I will…” Share it with someone you trust, or keep it between you and God. This is not counseling; it is a simple practice of bringing pain honestly before Him.',
        prayer:
          'Heavenly Father, thank You for the life of Jeremiah. Help us to remain faithful when obedience is difficult. Give us courage to speak truth with love, compassion for those who suffer, and hope rooted in Your presence. Heal what is wounded, restore what is broken, and teach us to trust Your covenant love. In Jesus’ name, Amen.',
      },
      {
        number: 6,
        sessionSlug: 'breaking-the-cycle',
        title: 'Breaking the Cycle: Healing Begins',
        subtitle: 'A heart transformation workshop — naming it, and choosing differently',
        focus:
          'A heart transformation workshop — what shaped me, what I am still carrying, what God says, and what I will choose.',
        teacher: 'Sis. Karol',
        pdfUrl: '/series/inner-healing-202-trauma/breaking-the-cycle.pdf',
        body: [
          {
            kind: 'prose',
            text: 'This closing session is a workshop rather than a lecture: a reflective journey through Scripture, honest self-discovery, and the transforming power of God’s love. It moves in four movements, each with something to write down. Nothing written has to be shared.',
          },
          {
            kind: 'scripture',
            reference: 'Psalm 147:3',
            text: 'He heals the brokenhearted and binds up their wounds.',
          },
          {
            kind: 'prose',
            heading: 'Opening',
            text: 'Take a quiet moment to sit with that truth and let it settle. If your heart could speak today, what would it say? Write one word — no sharing required. This is between you and God. Breathe. Be still. You are safe here.',
          },
          {
            kind: 'prose',
            heading: '1 · What shaped me?',
            text: 'Our stories of love, silence, rejection or neglect have shaped our hearts — but they do not have the final word. Complete the sentence: “Growing up, I learned that…” Then ask whether that belief still holds true today. You are not defined by what was done to you, or by what was left undone. God sees the full story and holds it with grace. “Search me, O God, and know my heart; test me and know my anxious thoughts” (Psalm 139:23).',
          },
          {
            kind: 'prose',
            heading: '2 · What am I still carrying?',
            text: 'Pain can feel like part of us, but it is something we carry, not who we are. You are not your wounds. Write one word for what you are carrying — fear, shame, anger, loneliness, guilt — then fold the paper and hold it. What you carry today does not have to define your tomorrow. “Come to me, all who are weary and burdened, and I will give you rest” (Matthew 11:28).',
          },
          {
            kind: 'prose',
            heading: '3 · What does God say?',
            text: 'The loudest voice in your life should be God’s — not your past, not your pain, not the words others have spoken over you. You are loved and chosen. You are forgiven and made new. On the back of your paper, write one truth God says about you: I am loved. I am forgiven. I am chosen. I am enough in Christ.',
          },
          {
            kind: 'scripture',
            reference: '2 Corinthians 5:17',
            text: 'If anyone is in Christ, he is a new creation; the old has gone, the new is here!',
          },
          {
            kind: 'prose',
            heading: '4 · What will I choose today?',
            text: 'Every cycle of pain is broken by a moment of courageous choice. You do not need to have it all figured out — just one step, one surrender, one yes to God. Whether that is choosing to forgive, to ask for help, or to trust again, the decision opens the door. Complete this: “Today, with God’s help, I choose…” — “Choose this day whom you will serve” (Joshua 24:15).',
          },
          {
            kind: 'leaderNote',
            text: 'Hold the quiet moment of prayer without filling it. Invite people to hold their paper over their heart; silence is doing work here, and rushing it is the main way this session goes wrong.',
          },
          {
            kind: 'prose',
            heading: 'The heart of the workshop',
            text: 'Four things worth carrying out of the room. My pain has a story. My pain is not my identity. God meets me in my pain. And healing changes the generations that follow. My past may explain me, but it does not define me. In Christ, healing is possible, hope is alive, and a new legacy can begin.',
          },
          {
            kind: 'scripture',
            reference: 'Numbers 6:24–26',
            text: 'The Lord bless you and keep you; the Lord make His face shine on you and be gracious to you; the Lord turn His face toward you and give you peace.',
          },
        ],
        reflection: [
          '“Growing up, I learned that…” — does that belief still hold true today?',
          'What one word describes what you are still carrying?',
          'What one truth does God say about you that you find hardest to believe?',
          '“Today, with God’s help, I choose…”',
        ],
        prayer:
          'Father, You know every part of my story — the joys, the wounds, the questions and the hopes. Thank You that You see me completely and love me fully. Help me release what has weighed me down and receive the truth of who I am in You. Give me courage to take the next step toward healing, and to become a source of hope for others. In Jesus’ name, Amen.',
      },
    ],
  },
]

export function getSeriesBySlug(slug: string): TeachingSeries | undefined {
  return teachingSeries.find((s) => s.slug === slug)
}

export function getSession(seriesSlug: string, sessionSlug: string) {
  const series = getSeriesBySlug(seriesSlug)
  if (!series) return null
  const index = series.sessions.findIndex((s) => s.sessionSlug === sessionSlug)
  if (index === -1) return null
  return {
    series,
    session: series.sessions[index],
    previous: index > 0 ? series.sessions[index - 1] : null,
    next: index < series.sessions.length - 1 ? series.sessions[index + 1] : null,
  }
}
