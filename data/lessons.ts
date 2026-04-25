import { Lesson } from '@/types/content'

// Lesson order per ACTS 242 Foundation Book (Edition 1, 2026):
// 1. Seeking God → 2. Word of God → 3. Discipleship → 4. Kingdom of God →
// 5. Light and Darkness → 6. Church → 7. Cross → /connect

export const lessons: Lesson[] = [
  {
    lessonNumber: 1,
    videoUrl: '',
    slug: 'seeking-god',
    title: 'Seeking God',
    summary:
      'Every person is searching for something. This lesson helps you understand what it truly means to seek God, and how that decision can change your life.',
    purpose:
      'To determine what it means to pursue a relationship with God with all our hearts.',
    mainQuestion:
      'What are you looking for in life? What are you pursuing with all your heart? Are you seeking God?',
    explanation:
      "Every person is searching for something. Some pursue success. Some pursue happiness. Some pursue relationships. Some pursue purpose. But the most important question is: Are you seeking God? God is not far from those who truly seek Him. He created you, sustains you, and places you in situations where you can find Him. The question is not whether God is present. The question is whether you are seeking Him.",
    passages: [
      {
        reference: 'Psalm 119:1–2',
        text: 'Blessed are those whose ways are blameless, who walk according to the law of the Lord. Blessed are those who keep his statutes and seek him with all their heart.',
      },
      {
        reference: 'Matthew 6:33',
        text: 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.',
      },
      {
        reference: 'Jeremiah 29:11–13',
        text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future. Then you will call on me and come and pray to me, and I will listen to you. You will seek me and find me when you seek me with all your heart."',
      },
      {
        reference: 'Matthew 7:7–8',
        text: '"Ask and it will be given to you; seek and you will find; knock and the door will be opened to you. For everyone who asks receives; the one who seeks finds; and to the one who knocks, the door will be opened."',
      },
    ],
    understand: [
      {
        label: 'Seek First',
        content:
          "Jesus teaches that instead of being consumed by worry over finances, career, or relationships, we should seek God first. To seek first His kingdom means putting God above your plans, trusting God with your future, and obeying God even when it is difficult.",
      },
      {
        label: 'God Is Near',
        content:
          "God is not distant or uninterested. Even life struggles, confusion, questions, and difficult seasons can be used by God to draw you closer to Him. The question is not whether God is present — the question is whether you are seeking Him.",
      },
      {
        label: 'True Worship',
        content:
          "God is looking for people who will worship Him in spirit and in truth. True worship is sincere, grounded in God's Word, and consistent in life. God is not looking for perfect people. He is looking for people who are real and willing to seek Him honestly.",
      },
    ],
    reflection:
      'What am I truly seeking in life? What takes most of my time, attention, and energy? Do I only seek God when I have problems? Am I willing to seek God with all my heart?',
    challenge:
      'Pray and talk to God daily. Read the Bible every day, starting with the Gospel of John. Make time for God, not just when convenient. Continue this study and take the next step.',
    prayer:
      'God, I want to seek You with all my heart. Help me to desire You more than anything else. Teach me to trust You, follow You, and live according to Your Word. Guide me as I begin this journey to know You more. Amen.',
    nextStepLabel: 'Continue to Lesson 2',
    nextStepHref: '/discipleship/word-of-god',
  },
  {
    lessonNumber: 2,
    videoUrl: '',
    slug: 'word-of-god',
    title: 'Word of God',
    summary:
      'Every person lives by a standard. This lesson helps you build conviction about the Bible as the Word of God and make it your standard for life.',
    purpose:
      'To help you decide to make the Bible your standard for life and to build conviction about what the Bible says about itself.',
    mainQuestion:
      'What is your standard in life? Do you believe the Bible is the Word of God? Do you trust it enough to follow it?',
    explanation:
      "Every person lives by a standard. Some follow personal opinion, culture, emotions, or traditions. But if the Bible is truly the Word of God, then it must become our final authority. The Bible was written by around 40 authors, across three continents, over about 1,500 years — and it contains hundreds of prophecies fulfilled in Jesus. The goal is not simply to read the Bible, but to let the Bible change you.",
    passages: [
      {
        reference: '2 Timothy 3:16–17',
        text: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness, so that the servant of God may be thoroughly equipped for every good work.',
      },
      {
        reference: 'Hebrews 4:12',
        text: 'For the word of God is alive and active. Sharper than any double-edged sword, it penetrates even to dividing soul and spirit, joints and marrow; it judges the thoughts and attitudes of the heart.',
      },
      {
        reference: 'James 1:22',
        text: 'Do not merely listen to the word, and so deceive yourselves. Do what it says.',
      },
      {
        reference: 'Psalm 119:105',
        text: 'Your word is a lamp for my feet, a light on my path.',
      },
    ],
    understand: [
      {
        label: "God's Word Transforms",
        content:
          "The Bible is not just for information. It is meant to transform your life. To accept the Bible as God's Word means allowing it to correct you, allowing it to change your thinking, and allowing it to guide your decisions.",
      },
      {
        label: 'The Bible Reveals the Heart',
        content:
          'The Word of God is like a mirror. It reveals motives, intentions, and hidden attitudes. Sometimes it is uncomfortable, but it is necessary for growth. The goal is not just to read the Bible, but to let the Bible change you.',
      },
      {
        label: 'Obey, Not Only Hear',
        content:
          'It is not enough to hear, read, or agree. You must obey. Listening without applying leads to self-deception. Watch your life and your doctrine closely, because both are equally important. Study the Bible for yourself and do not rely only on what others say.',
      },
    ],
    reflection:
      "What has been my standard in life? Do I follow God's Word or my own opinions? Am I willing to let the Bible correct me?",
    challenge:
      'Read the Bible daily. Begin with the Gospel of John. Apply what you learn. Make the Word of God your standard.',
    prayer:
      "God, help me to trust Your Word completely. Teach me to follow Your truth, not my own understanding. Give me a heart that is willing to obey and be changed. Amen.",
    nextStepLabel: 'Continue to Lesson 3',
    nextStepHref: '/discipleship/discipleship',
  },
  {
    lessonNumber: 3,
    videoUrl: '',
    slug: 'discipleship',
    title: 'Discipleship',
    summary:
      'Jesus did not only call people to believe in Him. He called them to follow Him. Discipleship is a life of surrender, obedience, love, and growth.',
    purpose:
      'To understand what it means to be a disciple of Jesus and how that applies to your life.',
    mainQuestion:
      'What is a disciple? Why does Jesus call people to follow Him? What does it cost to follow Him? How should a disciple live?',
    explanation:
      "Jesus did not only call people to believe in Him. He called them to follow Him. Discipleship is not just learning information about Jesus. It is a life of surrender, obedience, love, and growth. A disciple is a follower of Jesus who learns from Him, obeys Him, and helps others follow Him too. The question is: Are you only listening to Jesus, or are you truly following Him?",
    passages: [
      {
        reference: 'Matthew 28:19–20',
        text: '"Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age."',
      },
      {
        reference: 'Luke 9:23–24',
        text: '"Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me. For whoever wants to save their life will lose it, but whoever loses their life for me will save it."',
      },
      {
        reference: 'Luke 14:27–33',
        text: 'Anyone who does not carry their cross and follow Jesus cannot be His disciple. Count the cost — discipleship is full commitment, not casual interest.',
      },
      {
        reference: 'John 13:34–35',
        text: '"A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another."',
      },
    ],
    understand: [
      {
        label: 'Count the Cost',
        content:
          "Jesus never hid the cost of following Him. Discipleship is not casual interest. It is full commitment. To count the cost means understanding that Jesus must come first, accepting that following Him will require sacrifice, and choosing Him above comfort, pride, and control. A disciple does not add Jesus to life — a disciple gives life to Jesus.",
      },
      {
        label: 'Daily Surrender',
        content:
          "To deny yourself means not putting yourself first, not living by your own will, and not making life all about you. To take up your cross daily means dying to sin, choosing obedience, and following Jesus even when it is costly. A disciple does not follow Jesus only when convenient.",
      },
      {
        label: 'Love Is the Mark',
        content:
          "The true mark of a disciple is love. Not just knowledge. Not just words. Not just church activity. A disciple reflects the love of Christ in how they treat others. People should be able to see Jesus in the way His disciples love.",
      },
    ],
    reflection:
      'Am I truly following Jesus, or only agreeing with Him? What am I still unwilling to surrender? Have I counted the cost of discipleship? Am I growing in prayer, obedience, and love?',
    challenge:
      'Read these passages again slowly. Ask God what needs to change in your life. Choose one area where you need to obey Jesus more fully. Follow Him daily, not only when it is easy.',
    prayer:
      'Lord Jesus, thank You for calling me to follow You. Teach me to deny myself, obey You daily, and love others the way You love. Shape my life so that I may truly live as Your disciple. Amen.',
    nextStepLabel: 'Continue to Lesson 4',
    nextStepHref: '/discipleship/kingdom-of-god',
  },
  {
    lessonNumber: 4,
    videoUrl: '',
    slug: 'kingdom-of-god',
    title: 'Kingdom of God',
    summary:
      "The Kingdom of God is about God's rule, God's reign, and God's authority. This lesson helps you understand what it means to enter and live in it.",
    purpose:
      'To discover what the Kingdom of God is and what it means to enter and live in it.',
    mainQuestion:
      "What is the Kingdom of God? Who is the King? Who belongs to His Kingdom? How does a person enter it? What kind of life is found in it?",
    explanation:
      "Many people think of a kingdom as a place or a government. But when the Bible speaks about the Kingdom of God, it points to something greater — God's rule, God's reign, and God's authority over every life that submits to Him. The Kingdom of God is not only a future hope. It is also a present reality for those who believe in Jesus, are born again, and live under His rule. The question is: Who is ruling your life right now?",
    passages: [
      {
        reference: 'Matthew 4:17',
        text: 'From that time on Jesus began to preach, "Repent, for the kingdom of heaven has come near."',
      },
      {
        reference: 'John 3:3–5',
        text: 'Jesus replied, "Very truly I tell you, no one can see the kingdom of God unless they are born again." ... "no one can enter the kingdom of God unless they are born of water and the Spirit."',
      },
      {
        reference: 'Matthew 16:15–16',
        text: '"But what about you?" he asked. "Who do you say I am?" Simon Peter answered, "You are the Messiah, the Son of the living God."',
      },
      {
        reference: 'Romans 14:17',
        text: 'For the kingdom of God is not a matter of eating and drinking, but of righteousness, peace and joy in the Holy Spirit.',
      },
    ],
    understand: [
      {
        label: 'Repentance Is the Door',
        content:
          "The message of both John and Jesus began with the same call: repent. To repent means turning away from sin, changing your mind and direction, and returning to God. The Kingdom is not something we enter casually. When God's rule comes near, we are called to respond.",
      },
      {
        label: 'Jesus Is King',
        content:
          "The Kingdom of God is centered on Jesus. He is not only a teacher, a prophet, or a good example. He is the Messiah, the Son of the living God, the rightful King. The Kingdom cannot be understood apart from Jesus. To belong to the Kingdom is to submit to Him.",
      },
      {
        label: 'Life in the Kingdom',
        content:
          "The Kingdom of God is not only personal. It is shared with God's people. Those in the Kingdom live with hope, fellowship, joy, and faithfulness. To belong to the Kingdom means living under God's rule with God's people.",
      },
    ],
    reflection:
      'Who is ruling my life right now? Have I truly repented and submitted to Jesus as King? Am I trying to enter the Kingdom by my own effort, or by faith in Christ? Am I living under His rule in my daily life?',
    challenge:
      "Read these passages again slowly. Ask God to show you where you still resist His rule. Submit every area of your life to Jesus. Live as someone who belongs to His Kingdom.",
    prayer:
      "God, thank You for calling people into Your Kingdom. Teach me to repent, believe, and live under the rule of Jesus. Change my heart and help me walk as part of Your people. Amen.",
    nextStepLabel: 'Continue to Lesson 5',
    nextStepHref: '/discipleship/light-and-darkness',
  },
  {
    lessonNumber: 5,
    videoUrl: '',
    slug: 'light-and-darkness',
    title: 'Light and Darkness',
    summary:
      'The Bible teaches that without Christ, people remain in darkness because of sin. But God, in His mercy, calls people out of darkness and into His marvelous light.',
    purpose:
      "To understand God's plan of salvation and what it means to move from darkness into light.",
    mainQuestion:
      'What separates people from God? How can a person truly be saved?',
    explanation:
      "Every person lives in one of two conditions: light or darkness. Darkness represents separation from God, sin, and spiritual blindness. Light represents truth, salvation, forgiveness, and new life in Christ. God does not merely improve our old life. He brings us into a new life. This lesson explains humanity's problem, God's solution, our response, and the meaning of baptism.",
    passages: [
      {
        reference: '1 Peter 2:9',
        text: 'But you are a chosen people, a royal priesthood, a holy nation, God\'s special possession, that you may declare the praises of him who called you out of darkness into his wonderful light.',
      },
      {
        reference: 'Romans 3:23 & 6:23',
        text: '"For all have sinned and fall short of the glory of God." — "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord."',
      },
      {
        reference: 'Acts 2:38',
        text: 'Peter replied, "Repent and be baptized, every one of you, in the name of Jesus Christ for the forgiveness of your sins. And you will receive the gift of the Holy Spirit."',
      },
      {
        reference: 'Romans 6:3–4',
        text: 'All who were baptized into Christ Jesus were baptized into His death. Through baptism, we were buried with Him so that just as Christ was raised, we too may live a new life.',
      },
    ],
    understand: [
      {
        label: 'Sin and Its Consequence',
        content:
          "The problem is universal: all have sinned. Sin is rebellion against God, rejecting His rule, and falling short of His standard. The result is death — spiritual separation from God. But there is hope: eternal life is a gift through Jesus Christ.",
      },
      {
        label: 'Born Again',
        content:
          "Religion is not enough. Good morals are not enough. Being sincere is not enough. Jesus teaches that people need spiritual rebirth — receiving new life from God, being changed from within, and beginning a new relationship with Him. Not self-improvement — transformation through God.",
      },
      {
        label: 'Baptism and New Life',
        content:
          "Baptism is connected to Christ's death, burial, and resurrection. It represents dying to the old life, burial of the old self, and rising to walk in newness of life. Salvation is grounded in Christ's finished work and received through faith that responds in obedience.",
      },
    ],
    reflection:
      'Have I truly understood the seriousness of sin? Do I see my need for Jesus? Have I responded to the gospel with faith and repentance? Am I walking in the light, or still holding on to darkness? Have I obeyed God in baptism?',
    challenge:
      "Read these passages again slowly. Thank Jesus for His death and resurrection. Respond in faith and repentance. Obey Him fully. Continue in His Word and in fellowship with His people.",
    prayer:
      "God, thank You for calling people out of darkness into Your light. Thank You for sending Jesus to die for sin and rise again. Help me respond with faith, repentance, and obedience. Lead me into the new life You have given. Amen.",
    nextStepLabel: 'Continue to Lesson 6',
    nextStepHref: '/discipleship/church',
  },
  {
    lessonNumber: 6,
    videoUrl: '',
    slug: 'church',
    title: 'Church',
    summary:
      "The Church is the Body of Christ. This lesson helps you understand how God values His Church, your place in it, and how to function as part of God's household.",
    purpose:
      "To gain a deeper understanding of how God values His Church and His wonderful plans for Her, and to know how we must function as part of God's household.",
    mainQuestion:
      'When you hear the word Church, what comes into your mind? How do you see yourself in the Body of Christ?',
    explanation:
      "The Church is not a building, a program, or a Sunday event. The Church is the Body of Christ — a living family God has called and joined together. Jesus is the Head, and every believer is a living part of that Body, each with a different function. No one is insignificant, and no one is indispensable. We belong to each other because we belong to Him.",
    passages: [
      {
        reference: 'Colossians 1:15–18',
        text: 'Jesus is the exact representation of God the Father, and all creation was made through Him and for Him. He is the Head of the Body, the Church.',
      },
      {
        reference: '1 Corinthians 12:12–14',
        text: 'The Church is the Body of Christ — one body with many parts, joined together by the Spirit.',
      },
      {
        reference: '1 Corinthians 12:15–22',
        text: 'Each one of us has different functions. We need one another. No one is insignificant, and no one is indispensable.',
      },
      {
        reference: '1 Corinthians 12:23–25',
        text: 'Because we are one body, there must be no division among us.',
      },
      {
        reference: '1 Corinthians 12:26–28',
        text: 'We function as one and use our gifts to serve one another.',
      },
      {
        reference: 'John 13:34–35',
        text: 'A new command — love one another just as Jesus Christ loved us. By this all people will know we are His disciples.',
      },
      {
        reference: 'Ephesians 2:19–22',
        text: "As part of the Church, we become members of God's family and His household — built together as a dwelling place for God by His Spirit.",
      },
      {
        reference: 'Ephesians 5:25–27',
        text: 'As a Church, we are the Bride of Christ — loved and cleansed by Him.',
      },
      {
        reference: '1 Corinthians 11:2–4',
        text: 'As the Bride of Christ, we must remain faithful to Him.',
      },
      {
        reference: 'John 14:1–3',
        text: 'Jesus is preparing a place for us, and He will come back for us.',
      },
      {
        reference: '1 Thessalonians 4:16–18',
        text: 'The Lord Himself will come, and we will be with Him forever. Encourage one another with these words.',
      },
    ],
    understand: [
      {
        label: 'The Body of Christ',
        content:
          'Jesus is the Head of the Church, and every believer is a living part of His Body. This is not a metaphor — it is a spiritual reality. When you belong to Christ, you belong to His people.',
      },
      {
        label: 'Every Member Matters',
        content:
          "God gave each believer different gifts and functions. No one is too small to matter; no one is too great to need others. The health of the Body depends on every part working together in love.",
      },
      {
        label: 'A Family, Not a Crowd',
        content:
          "The Church is God's household — His family. You are not a visitor; you are a member. You are not attending an event; you are belonging to a people.",
      },
      {
        label: 'The Bride of Christ',
        content:
          'The Church is also the Bride of Christ — the object of His love and the one He will come back for. This shapes how we live now: faithfully, purely, and with great hope.',
      },
    ],
    reflection:
      'Am I committed to a local church, not just attending it? How do I see my role in the Body of Christ? Am I using my gifts to build up others, or only consuming what others give? Am I loving my brothers and sisters in Christ the way Jesus loved me?',
    challenge:
      'Commit to being an active member of the Body. Serve in a ministry. Build real friendships with fellow believers. Pray for your church. Love those in it — even when it is hard.',
    prayer:
      "Father, thank You for calling me into Your family. Help me see the Church the way You see her — as the Body and the Bride of Christ. Show me my place in Your household. Teach me to love, serve, and walk faithfully with Your people. Amen.",
    nextStepLabel: 'Continue to Lesson 7',
    nextStepHref: '/discipleship/cross',
  },
  {
    lessonNumber: 7,
    videoUrl: '',
    slug: 'cross',
    title: 'Cross',
    summary:
      'The Cross is the foundation of Christianity. This lesson helps you hate sin, love God, and respond to the sacrifice Jesus made for you.',
    purpose:
      "To hate sin and love God because we appreciate Jesus' sacrifice on the Cross.",
    mainQuestion:
      "How would you define sacrifice? Who would you die for? Do you truly understand what Jesus endured for you?",
    explanation:
      "The Cross is the foundation of Christianity. Sin hurts both God and us. Jesus was fully God and fully human — He experienced the same feelings and emotions we do. He did not want to die. He chose to die. And in that choice, He bore our sins so we might become the righteousness of God. This lesson walks through the Passion of Christ so we would never treat His sacrifice lightly.",
    passages: [
      {
        reference: 'Matthew 26:36–46',
        text: "In Gethsemane, Jesus struggled emotionally with what was coming. Prayer enabled Him to bear the Cross. His closest friends fell asleep while He anguished.",
      },
      {
        reference: 'Matthew 26:47–56',
        text: "Jesus' disciples deserted Him. He stopped Peter from defending Him. He could have called twelve legions of angels, but He did not.",
      },
      {
        reference: 'Matthew 27:27–44',
        text: 'The events leading up to the crucifixion. Jesus refused the painkiller offered to Him — He chose to feel the full weight of suffering.',
      },
      {
        reference: 'Matthew 27:45–56',
        text: 'Jesus was crucified and hung for six hours. At noon, darkness fell. At this moment He bore the sins of the world — and for the first time in eternity, felt separation from the Father.',
      },
      {
        reference: '2 Corinthians 5:21',
        text: 'God made him who had no sin to be sin for us, so that in him we might become the righteousness of God.',
      },
      {
        reference: 'Isaiah 53:4–6',
        text: 'He was pierced for our transgressions, crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.',
      },
      {
        reference: 'Matthew 28:1–10',
        text: 'Jesus is risen! He appears to His disciples and commissions them.',
      },
      {
        reference: '1 Peter 2:21–24',
        text: 'Jesus suffered for each of us individually. We must die to sin and live for righteousness.',
      },
    ],
    understand: [
      {
        label: 'Jesus Chose the Cross',
        content:
          "Jesus was not a victim of the Cross. He was a willing sacrifice. He prayed in Gethsemane, submitted to the Father's will, and walked into suffering on purpose — for you.",
      },
      {
        label: 'Three Responses to Jesus',
        content:
          "Peter denied Him but repented in godly sorrow and was restored. Judas betrayed Him and fell into worldly sorrow and destruction. Pilate refused to decide — but indecision is itself a decision. Which response is yours?",
      },
      {
        label: 'He Became Sin for Us',
        content:
          'On the Cross, Jesus took the sins of the whole world upon Himself. For the first time in eternity, He felt separation from the Father. He endured this so we could be made righteous in Him.',
      },
      {
        label: 'Our Responsibility',
        content:
          'Our sins made us responsible for Jesus\' death. The right response to the Cross is not guilt but gratitude that leads to repentance — hating sin because of what it cost Him, and living for righteousness because of His great love.',
      },
    ],
    reflection:
      'Am I more like Peter, Judas, or Pilate in my response to Jesus? What sin am I still holding on to? Do I hate sin because of how it hurt Him? Am I living for righteousness out of gratitude, or am I still living for myself?',
    challenge:
      'Take time for honest confession. Identify one sin you have been tolerating and surrender it. Develop a concrete plan for repentance. Live each day in gratitude for the Cross.',
    prayer:
      'Lord Jesus, thank You for the Cross. Thank You for choosing to suffer, to bear my sin, to die in my place. Teach me to hate sin as You hate it. Teach me to love You as You have loved me. Help me respond to Your sacrifice with a life of faithful obedience and genuine repentance. Amen.',
    nextStepLabel: 'Talk to a pastor about your next step',
    nextStepHref: '/connect',
  },
]
