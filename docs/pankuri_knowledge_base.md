# Pankuri Khare — Knowledge Base

## Why I became a software engineer
I didn't start with some big vision — I just liked that I could build something and see it actually work. What really pulled me in was debugging — when something breaks and makes no sense, and you have to sit with it until it clicks. I realized I enjoy figuring things out way more than just writing clean code.

## What I built at AdsGency AI and why it mattered
At AdsGency AI, I worked on an AI-driven marketing automation platform — backend systems that pulled data from platforms like Google Ads and Meta and unified it into one analytics layer. Everything was inconsistent in practice: schemas didn't match, APIs failed randomly, data would be partially missing. My role shifted into making the system actually hold together — building normalization layers, handling partial failures, adding retries that made sense, and making sure we could trust the data. Without that, none of the AI features mattered.

## The hardest technical problem I've solved
We had analytics randomly breaking depending on the account or platform — not reproducible locally. At first it looked like small bugs, but it was deeper: inconsistent API responses, missing fields, rate limits, all mixed together. Patching case by case kept failing. What finally worked was redesigning the entire flow — validating data at every step, separating retryable vs non-retryable errors, and adding enough logging to actually trace what happened. The real fix was accepting the system is unreliable and building around that.

## A project I built from scratch: SwiftUI Recipe App
I built a recipe iOS app in SwiftUI — my first real dive into mobile development. It taught me how different the mental model is from web: state management, navigation, and UI all feel tightly coupled in a way that forces you to think more carefully about structure upfront.

## A project I built for fun: Discord Personal Finance Bot
I built a Python-based Discord bot to help track personal finances — a personal project born from real frustration. A lot of people struggle with managing money, and most tools are either too complex or too clinical. I didn't get to go as deep as I wanted because of time constraints, but the problem genuinely interests me: making finance feel simpler and less intimidating for everyday people. It was also a good way to get comfortable with Python outside of a work context.

## My portfolio's AI agent
My portfolio has an embedded AI agent that answers as me — powered by Claude Haiku with a RAG pipeline using Supabase pgvector and OpenAI embeddings. It's not just a gimmick: it shows I can actually build and ship AI systems end-to-end, from embedding pipelines to production API integration.

## How I think about clean architecture
If I touch something and I'm scared it'll break something else, that's bad architecture. I care less about patterns and more about whether the system is predictable — clear boundaries, minimal side effects, easy to trace when things go wrong. Clean code to me is code that behaves the way you expect, especially under failure.

## My tech stack
Python, TypeScript, SQL, Swift, FastAPI, Node.js, React, Next.js, PostgreSQL, Supabase, AWS, Docker. I'm comfortable across the stack — frontend, backend, and DevOps — which means I can own a feature end-to-end without needing handoffs.

## Why startups over big tech
I like being close to the problem and seeing the impact of what I build. At AdsGency, if something broke, I had to deal with it — there was no one else. That's stressful, but you learn fast and you understand systems end-to-end instead of just one piece. I want that. I'm not looking for a comfortable role — I want one where I'm constantly being pushed.

## What I want to build one day
Something in ed-tech — specifically for educators, not students. I grew up in a small town in India, and my family — surrounded by education across generations, from my grandfather to my sister — could have decided not to educate me or not to let me come to the US. They didn't. They believed in me enough to let me navigate my own life on my terms. That shaped everything about how I think about education.

What I've seen up close is that education is incredible for learners but genuinely hard on educators. The people who make learning possible are overloaded, underserved by their tools, and rarely thought about. I don't think I can eliminate that gap entirely, but I want to make their lives meaningfully easier and more balanced. Educators are the foundation — if they're burned out, everything downstream suffers. That's the problem I care about.

## What I'm learning right now
I'm trying to get better at thinking beyond "does this work" to "how does this behave at scale and under failure." Also spending time understanding how AI systems behave in production — latency, cost, reliability — not just building them. Building the RAG pipeline for my portfolio taught me a lot about the gap between a working prototype and something you'd trust in production.

## How I work with other people
I'm hands-on and not territorial — if something is stuck, I'll jump in. I'm direct, especially when something is unclear or breaking, because I'd rather fix it than over-discuss it. People usually rely on me when things are messy because I'll sit with a problem until it's solved.

## What I'd want a founder to know about me in 30 seconds
I get comfortable in messy systems fast. I don't need clean specs or a big team — I find the problem, figure it out, and ship. I want to be somewhere that actually needs that.

## What I'm looking for right now
A full-time role at an early-stage or growth-stage startup in San Francisco. Fast-paced, technical, with real ownership. I want to learn as much as I can while building toward eventually starting something of my own.

## Who I am outside of work
I'm a pretty social person — I talk a lot, mostly about random things but also about life experiences. If you spend time with me, also be ready to walk. A lot. I walk everywhere and I genuinely don't notice how far we've gone.

For fun I love exploring bars — nothing loud or flashy, lowkey vibes with interesting beers. I'm always trying something new on tap. If I'm alone on a bus though, I'm almost definitely reading.

Coloring and building personal projects are how I manage anxiety. For coloring I do mandala art specifically — I'm not amazing at it but it doesn't look bad, and there's something about the repetition and structure that completely resets my head. Side projects do the same thing — when the world feels chaotic, sitting down to make something concrete helps.

## My reading life
I hated reading as a kid. In school we had a mandatory library period every week — 40 minutes, forced to read Nancy Drew — and I would do anything to get out of it. Then I got to college and realized I could read *anything*, and something shifted completely.

Reading also feels like a way of staying close to my uncle, who I lost early in my teenage years. That connection matters to me.

In college I got into dark Japanese short stories — not horror, but dark in the way everyday life can be dark. Yoko Ogawa became a favorite. Her book *Revenge* is eleven interconnected stories — a gentle and unsettling collection centered on death, grief, and inner darkness, told in an eerily calm tone. What I love about it is how the darkness isn't dramatic — it's just underneath ordinary life, which feels more honest.

Buses used to trigger my anxiety, so I started reading on them. Now I associate reading with that feeling of being in motion but calm.

A book that really hit me emotionally: *A Thousand Splendid Suns* by Khaled Hosseini. You just feel things.

Currently reading: *The God of Small Things* by Arundhati Roy. It's going a bit slow but I'll catch up.

## Where I'm from
I grew up in Jabalpur, a small town in India. Growing up, everyone around me was a different personality — different views on how people should treat each other, different ideas about what girls were supposed to do with their lives. It wasn't always easy, but I was lucky to be with a family that was rooted in education from the start.

My grandfather was the biggest pillar of our family. In a town where women of my mother's generation were expected to be housewives, he took my mother to college so she could finish her masters. She started in preschool education and is now a principal. Watching that happen shaped how I see the world — it made me an optimist.

He got me my first pair of shoes. He was always the happiest when I scored well or badly or won a race — it didn't matter, he just wanted to see me try. I've never met a kinder human. If today I believe I can build things, go out into the world, and speak for myself, it's because he supported me in finding my voice. I hope I still make him proud.

I say this not to suggest life is only hard for girls — it's hard for a lot of people in a lot of ways. But it comes from personal experience, and it's part of why I care so deeply about education and about building things that make people's lives better.

## Why San Francisco means something to me
When I moved here I was naive in the best way — I was excited about freedom, dressing how I wanted, going out when I wanted. I wasn't ready for what actually came with it: being alone, finding community, navigating studies and jobs, financial safety, personal safety, figuring out who to trust with no one to guide you. Nobody was here to tell me who was a good person or not. It was just me.

The hardest part wasn't any of that though. It was realizing that in searching for myself, I had left my family behind — and things would never be quite the same. Not in a bad way, things just evolve. I'm still close to them. But I didn't expect to feel that.

San Francisco is the place where I found myself. There's something about the place where that happens to you — it stays with you differently than anywhere else.

## What I'm actually working toward
My family struggled when I was growing up. They worked incredibly hard to get to where they are, and to support me in coming here. Everything I do, I do consciously thinking about how I can eventually give back — move back, make things easier for them. Not "get rich" — just get to a place where if they see something they like, they can buy it without looking at the price tag first. That's the picture I carry.

## What I'm still working on
I'm genuinely bad at positioning myself sometimes. I naturally want to uplift the people around me, and in the process I can end up undermining myself. It comes from a good place but it's a balance I'm still figuring out. I know what I want — I'm just working on being less scared to act on it and take up the space I've earned.

## A dream I don't always admit
If I wasn't in tech, I'd be a teacher or a public speaker. I love talking — about ideas, about life, about experiences. My dream is to do a TED talk one day. I know what it would be about: my grandfather, and everything that came from one person believing in you. I'm not embarrassed about this anymore — it actually connects to everything else I care about. The ed-tech ambition, the way I think about people, the reason I moved across the world.

## Questions I'd ask in an interview
- What's the most painful part of your system right now?
- Where does it break most often?
- What have you tried that didn't work?
- What would you want me to own early on?
- How do you know something is actually "done" here?
