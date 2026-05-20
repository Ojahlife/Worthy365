// Worthy 365 - Daily Messages of Worthiness
// Re-member. Re-call. Your relationship to worth.
// Each message is designed to help you remember what was never lost.

export interface WorthyMessage {
  id: number;
  message: string;
  theme: 'presence' | 'belonging' | 'becoming' | 'rest' | 'trust' | 'release';
}

// Voice Attribution
export const voiceArtist = {
  name: "Richelle",
  description: "Warm, grounded, calm voice — a trusted companion and steady nervous-system anchor",
  qualities: ["Warm", "Grounded", "Calm", "Emotionally resonant", "Unhurried", "Intimate"]
};



// Guided Meditations voiced by Richelle
export interface GuidedMeditation {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  durationSeconds: number;
  description: string;
  theme: 'worth' | 'doubt' | 'grounding' | 'remembering' | 'presence';
  transcript?: string;
  audioUrl?: string; // To be replaced with actual audio files
}

export const guidedMeditations: GuidedMeditation[] = [
  {
    id: 1,
    title: "Returning to Worth",
    subtitle: "A gentle homecoming",
    duration: "6:43",
    durationSeconds: 416,
    description: "A slow, spacious meditation to help you remember that your worth was never in question. It was always here, waiting.",
    theme: 'worth',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/Meditation-1-returning-to-worth.m4a',
    transcript: `Close your eyes, or soften your gaze...
    
Let your breath find its own rhythm. There's nothing to fix here.

Place a hand on your heart if that feels right. Feel the warmth there.

I want you to know something. Something you may have forgotten.

Your worth is not something you earn. It's not something you prove. It's not waiting for you at the end of a to-do list.

Your worth is here. It has always been here.

Like the sky doesn't earn its blue... like the ocean doesn't prove its depth... you don't need to justify your existence.

You are worthy because you are.

Take a breath with that.

Let it land wherever it needs to land.

You are not behind. You are not broken. You are not too much or too little.

You are here. And that is enough.

When you're ready, let your eyes open. Carry this with you.`
  },

  {
    id: 2,
    title: "You Are Enough, Even Here",
    subtitle: "For the difficult moments",
    duration: "8:33",
    durationSeconds: 516,
    description: "When everything feels hard, this meditation meets you exactly where you are. No fixing. Just presence.",
    theme: 'presence',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/Meditation-2-you-are-enough%20(1).m4a',
    transcript: `Wherever you are right now... it's okay.

Whatever you're feeling... it's allowed.

You don't need to be anywhere else. You don't need to feel anything different.

This moment, exactly as it is, is where we begin.

Breathe in... and let the breath go.

Even here — especially here — you are enough.

Not because of what you've done. Not because of what you haven't done.

You are enough because you exist. Because you're breathing. Because you showed up.

That's it. That's all that's required.

Let your shoulders drop. Let your jaw soften.

You are held. Even when you can't feel it.

You are enough. Even here.`
  },

  {
    id: 3,
    title: "When Self-Doubt Arises",
    subtitle: "Meeting the inner critic with kindness",
    duration: "6:43",
    durationSeconds: 384,
    description: "A compassionate practice for when the voice of doubt gets loud. Learn to meet it without believing it.",
    theme: 'doubt',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/Meditation-3-when-self-doubt-arises%20(1).m4a',

    transcript: `There's a voice inside that sometimes speaks harshly.

It tells you you're not enough. That you're behind. That everyone else has it figured out.

I want you to know: that voice learned to speak that way somewhere. It's not the truth. It's an echo.

Right now, instead of fighting that voice, let's just... notice it.

Where do you feel it in your body? Is there tightness? Heaviness?

Place your attention there gently. Like you would with a frightened child.

Now, breathe into that space.

You don't have to believe every thought you think.

You are not your doubts. You are the awareness that notices them.

The crow sits on the branch and watches. It doesn't become the storm. It watches it pass.

You can do that too.

Let the doubt be there. And let yourself be larger than it.

You are more than this moment. You are more than this feeling.

You are whole. You always have been.`
  },
  {
    id: 4,
    title: "Grounding in the Body",
    subtitle: "Coming home to yourself",
    duration: "5:20",
    durationSeconds: 359,
    description: "A simple, embodied practice to bring you back to the present moment. Your body is your anchor.",
    theme: 'grounding',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/meditation-4-grounding-in-the-body%20(1).m4a',

    transcript: `Feel your feet on the ground.

Really feel them. The weight of your body pressing down. The earth pressing back up.

You are held by gravity. You are held by the earth.

Now notice your breath. You don't have to change it. Just notice it.

In... and out.

Your body has been breathing for you all day. All your life. Without you having to think about it.

That's trust. That's being held.

Now feel your hands. The weight of them. The warmth.

You are here. In this body. In this moment.

There is nowhere else you need to be.

This is home. You can always come back here.`
  },
  {
    id: 5,
    title: "Remembering Who You Are",
    subtitle: "Beyond the roles and the doing",
    duration: "6:01",
    durationSeconds: 377,
    description: "A deeper meditation to reconnect with your essential self — the one beneath the roles, the achievements, the expectations.",
    theme: 'remembering',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/Meditation-5-remebering-who-you-are.m4a',

    transcript: `Before you were a name... before you were a role... before anyone told you who you should be...

You were.

Pure being. Pure presence. Pure worth.

Let's go back there for a moment.

Close your eyes. Let the world fall away.

Imagine peeling back the layers. The job title. The relationships. The achievements. The failures.

What's left?

Beneath all of that... there is something that has always been here.

Something that watched you learn to walk. That felt your first heartbreak. That has been present for every moment of your life.

That is you. The real you.

Not the one who performs. Not the one who proves. Not the one who worries about being enough.

The one who simply is.

This is who you are remembering.

This is what was never lost.

Take a moment to rest here. In your own presence.

You don't have to do anything. You don't have to be anything.

Just be.

When you're ready, slowly return. But carry this knowing with you:

You are not what you do. You are not what others think of you.

You are the sky. Everything else is just weather.`
  }
];

// Spoken Word Affirmations voiced by Richelle
export interface SpokenAffirmation {
  id: number;
  text: string;
  duration: string;
  durationSeconds: number;
  theme: 'worth' | 'presence' | 'belonging' | 'trust' | 'release';
  audioUrl?: string;
}

export const spokenAffirmations: SpokenAffirmation[] = [
  {
    id: 1,
    text: "You don't need to prove your worth. It was never in question.",
    duration: "0:15",
    durationSeconds: 15,
    theme: 'worth',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-1.mp3'

  },
  {
    id: 2,
    text: "You are allowed to take up space. Your presence is not an inconvenience.",
    duration: "0:12",
    durationSeconds: 12,
    theme: 'belonging',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-2.mp3'
  },
  {
    id: 3,
    text: "Nothing is wrong with you. You are not broken. You are becoming.",
    duration: "0:14",
    durationSeconds: 14,
    theme: 'trust',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-3.mp3'
  },
  {
    id: 4,
    text: "You are not behind. There is no timeline you've fallen off of.",
    duration: "0:11",
    durationSeconds: 11,
    theme: 'presence',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-4.mp3'
  },
  {
    id: 5,
    text: "Your worth is not conditional. It never was. It never will be.",
    duration: "0:13",
    durationSeconds: 13,
    theme: 'worth',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-5.mp3'
  },
  {
    id: 6,
    text: "You are allowed to rest without earning it. Rest is your birthright.",
    duration: "0:12",
    durationSeconds: 12,
    theme: 'release',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-6.mp3'
  },
  {
    id: 7,
    text: "You belong here. Right now. Exactly as you are.",
    duration: "0:10",
    durationSeconds: 10,
    theme: 'belonging',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-7.mp3'
  },
  {
    id: 8,
    text: "Your sensitivity is not a flaw. It is a gift.",
    duration: "0:09",
    durationSeconds: 9,
    theme: 'trust',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-8.mp3'
  },
  {
    id: 9,
    text: "You are more than what you produce. You are more than your achievements.",
    duration: "0:12",
    durationSeconds: 12,
    theme: 'worth',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-9.mp3'
  },
  {
    id: 10,
    text: "The pace you're moving is the right pace for you. Trust it.",
    duration: "0:11",
    durationSeconds: 11,
    theme: 'presence',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-10.mp3'
  },
  {
    id: 11,
    text: "You are worthy of the love you give to others.",
    duration: "0:08",
    durationSeconds: 8,
    theme: 'worth',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-11.mp3'
  },
  {
    id: 12,
    text: "Let go of what was never yours to carry.",
    duration: "0:07",
    durationSeconds: 7,
    theme: 'release',
    audioUrl: 'https://elsdfjdrnjwqwwccscrn.supabase.co/storage/v1/object/public/audio/meditations/affirmations/affirmation-12.mp3'
  }
];




// Primary Crow Image for Today page - crow silhouette at golden hour provided by user
export const primaryCrowImage = {
  url: 'https://d64gsuwffb70l.cloudfront.net/6875c375b32d29dcca02e02a_1769196581589_7f70ecf5.png',
  alt: 'Crow silhouette at golden hour - wisdom, transition, and self-trust',
  description: 'A beautiful crow silhouette perched on a post against a warm golden sunset sky. This is the medicine of seeing clearly, of trusting your own vision, of presence and watchfulness.'
};

// Crow imagery for rotating display
export const crowImages = [
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6875c375b32d29dcca02e02a_1769196581589_7f70ecf5.png',
    alt: 'Crow silhouette at golden hour - wisdom, transition, and self-trust',
    theme: 'trust'
  },
  {
    url: 'https://d64gsuwffb70l.cloudfront.net/6875c375b32d29dcca02e02a_1769196581589_7f70ecf5.png',
    alt: 'Crow silhouette - presence and watchfulness',
    theme: 'presence'
  },
];






// Crow Medicine Content
export const crowMedicine = {
  title: "Crow Medicine",
  subtitle: "Wisdom of the Dark-Winged Messenger",
  introduction: `The crow has walked alongside humanity since the beginning. In nearly every culture, this dark-winged being carries medicine — not the kind that fixes, but the kind that remembers.

Crow medicine is the medicine of seeing clearly. Of trusting what you know, even when you cannot explain it. Of moving between worlds — the seen and unseen, the known and unknown — with grace.

The crow does not doubt its place in the sky. It does not question whether it belongs on the branch. It simply is. This is the medicine it offers you.`,
  
  teachings: [
    {
      title: "Wisdom Beyond Logic",
      description: "The crow sees what others miss. It reads the patterns in the wind, the meaning in the silence. Crow medicine invites you to trust your deeper knowing — the wisdom that lives in your body, your intuition, your dreams. You know more than you think you do.",
      reflection: "What do you know that you've been afraid to trust?"
    },
    {
      title: "Transition & Transformation",
      description: "Crows are liminal creatures — comfortable at dawn and dusk, at the edges of forests, between worlds. They remind us that transition is not something to fear but to honor. Every ending carries a beginning. Every death feeds new life.",
      reflection: "What transition are you moving through? Can you trust the space between?"
    },
    {
      title: "Presence & Watchfulness",
      description: "The crow sits on the branch and watches. It doesn't rush. It doesn't panic. It observes. This is the medicine of presence — being fully here, seeing clearly, responding rather than reacting. The crow knows that stillness is not passivity; it is power.",
      reflection: "Where in your life could you benefit from watching before acting?"
    },
    {
      title: "Self-Trust & Inner Authority",
      description: "The crow doesn't look to other birds for permission. It doesn't wait to be told it belongs. Crow medicine is the medicine of self-trust — of knowing your own worth without external validation. Your inner authority is real. Listen to it.",
      reflection: "Where have you been giving away your authority? What would it look like to reclaim it?"
    },
    {
      title: "Magic & Mystery",
      description: "In many traditions, the crow is a messenger between realms — carrying prayers to the sky, bringing wisdom from the unseen. Crow medicine reminds us that not everything can be explained, and that's okay. Mystery is not a problem to solve. It is a doorway to walk through.",
      reflection: "What mystery in your life are you trying to control instead of honor?"
    },
    {
      title: "Community & Connection",
      description: "Crows gather. They call to each other across the sky. They remember faces, share information, mourn their dead. Crow medicine includes the wisdom of community — that we are not meant to fly alone. Your people are out there. Keep calling.",
      reflection: "Who are your people? How do you call to them?"
    },
    {
      title: "Speaking Truth",
      description: "The crow's call is unmistakable — clear, direct, unapologetic. Crow medicine invites you to speak your truth, even when your voice shakes. Your words matter. Your perspective is needed. Don't swallow what needs to be said.",
      reflection: "What truth have you been holding back? What would it cost to speak it?"
    },
    {
      title: "Adaptability & Resourcefulness",
      description: "Crows thrive everywhere — cities and forests, mountains and shores. They use tools, solve problems, adapt to change. This is the medicine of resilience. You are more resourceful than you know. You have survived every difficult day so far. Trust that you will continue to find your way.",
      reflection: "How have you adapted to challenges in your life? What does that tell you about your strength?"
    }
  ],

  invocation: `When you see a crow, pause.
Let it be a reminder:
You are wise.
You are worthy.
You belong here.

The crow doesn't question its place in the sky.
Neither should you.`,

  closingMessage: "Crow medicine is not about becoming something new. It is about remembering what you have always been — whole, wise, and worthy of trust. The crow sees you. It has always seen you. Now, can you see yourself?"
};

export const dailyMessages: WorthyMessage[] = [

  { id: 1, message: "You are not behind. You are becoming.", theme: 'becoming' },
  { id: 2, message: "Your worth is not conditional. It never was.", theme: 'trust' },
  { id: 3, message: "Even here, you belong.", theme: 'belonging' },
  { id: 4, message: "You don't need to earn your place in this world.", theme: 'trust' },
  { id: 5, message: "Rest is not a reward. It is a birthright.", theme: 'rest' },
  { id: 6, message: "The pace you're moving is the right pace for you.", theme: 'presence' },
  { id: 7, message: "You are allowed to take up space.", theme: 'belonging' },
  { id: 8, message: "Your presence is enough. It always has been.", theme: 'presence' },
  { id: 9, message: "You are not too much. You are not too little. You are.", theme: 'trust' },
  { id: 10, message: "This moment does not define your worth.", theme: 'release' },
  { id: 11, message: "You are worthy of gentleness—especially from yourself.", theme: 'trust' },
  { id: 12, message: "The crow knows: wisdom arrives in its own time.", theme: 'becoming' },
  { id: 13, message: "You don't have to prove anything today.", theme: 'release' },
  { id: 14, message: "Your existence is not a problem to be solved.", theme: 'belonging' },
  { id: 15, message: "Breathe. You are exactly where you need to be.", theme: 'presence' },
  { id: 16, message: "Your worth does not fluctuate with your productivity.", theme: 'trust' },
  { id: 17, message: "You are allowed to be a work in progress and worthy at the same time.", theme: 'becoming' },
  { id: 18, message: "The sky holds space for all weather. So can you.", theme: 'release' },
  { id: 19, message: "You belong to yourself first.", theme: 'belonging' },
  { id: 20, message: "There is nothing you need to fix about yourself today.", theme: 'trust' },
  { id: 21, message: "Your story is still being written. Be patient with the chapters.", theme: 'becoming' },
  { id: 22, message: "You are not your anxious thoughts. You are the sky they pass through.", theme: 'release' },
  { id: 23, message: "Softness is not weakness. It is a form of courage.", theme: 'trust' },
  { id: 24, message: "You are allowed to change your mind, your path, your pace.", theme: 'becoming' },
  { id: 25, message: "The crow sits still before it flies. Rest before rising.", theme: 'rest' },
  { id: 26, message: "You don't have to have it all figured out.", theme: 'release' },
  { id: 27, message: "Your worth was never up for debate.", theme: 'trust' },
  { id: 28, message: "You are more than what you produce.", theme: 'belonging' },
  { id: 29, message: "Today, you can simply exist. That is enough.", theme: 'presence' },
  { id: 30, message: "The water does not rush to the sea. Neither must you.", theme: 'rest' },
  { id: 31, message: "You are allowed to outgrow old versions of yourself.", theme: 'becoming' },
  { id: 32, message: "Your needs are valid. Your feelings are valid. You are valid.", theme: 'trust' },
  { id: 33, message: "There is no timeline you are supposed to be following.", theme: 'release' },
  { id: 34, message: "You carry wisdom you haven't discovered yet.", theme: 'becoming' },
  { id: 35, message: "Being still is not the same as being stuck.", theme: 'rest' },
  { id: 36, message: "You are not broken. You are breaking open.", theme: 'becoming' },
  { id: 37, message: "Your sensitivity is a gift, not a flaw.", theme: 'trust' },
  { id: 38, message: "You don't need permission to rest.", theme: 'rest' },
  { id: 39, message: "The crow watches without judgment. Try that with yourself.", theme: 'presence' },
  { id: 40, message: "You are allowed to feel more than one thing at once.", theme: 'release' },
  { id: 41, message: "Your path doesn't need to look like anyone else's.", theme: 'belonging' },
  { id: 42, message: "You are worthy of the love you give to others.", theme: 'trust' },
  { id: 43, message: "Uncertainty is not failure. It is part of the journey.", theme: 'becoming' },
  { id: 44, message: "You are held, even when you cannot feel it.", theme: 'belonging' },
  { id: 45, message: "Your body is not an apology.", theme: 'trust' },
  { id: 46, message: "You don't have to be strong all the time.", theme: 'rest' },
  { id: 47, message: "The feather falls slowly. So can you.", theme: 'rest' },
  { id: 48, message: "You are allowed to ask for help.", theme: 'belonging' },
  { id: 49, message: "Your worth is inherent, not earned.", theme: 'trust' },
  { id: 50, message: "Today, let yourself be imperfect.", theme: 'release' },
  { id: 51, message: "You are not your mistakes.", theme: 'release' },
  { id: 52, message: "The horizon is always there, even when you can't see it.", theme: 'trust' },
  { id: 53, message: "You are allowed to celebrate small victories.", theme: 'presence' },
  { id: 54, message: "Your boundaries are an act of self-love.", theme: 'trust' },
  { id: 55, message: "You don't have to carry everything alone.", theme: 'belonging' },
  { id: 56, message: "The crow knows when to rest its wings. So do you.", theme: 'rest' },
  { id: 57, message: "You are more resilient than you know.", theme: 'becoming' },
  { id: 58, message: "Your presence matters more than your performance.", theme: 'presence' },
  { id: 59, message: "You are allowed to grieve what didn't happen.", theme: 'release' },
  { id: 60, message: "Healing is not linear. Neither is growth.", theme: 'becoming' },
  { id: 61, message: "You are worthy of patience—especially your own.", theme: 'trust' },
  { id: 62, message: "The earth holds you. Let it.", theme: 'belonging' },
  { id: 63, message: "You don't have to explain yourself to everyone.", theme: 'release' },
  { id: 64, message: "Your intuition is worth listening to.", theme: 'trust' },
  { id: 65, message: "You are allowed to take things one breath at a time.", theme: 'presence' },
  { id: 66, message: "The crow sees in the dark. Trust your own vision.", theme: 'trust' },
  { id: 67, message: "You are not defined by your hardest days.", theme: 'release' },
  { id: 68, message: "Your heart knows things your mind is still learning.", theme: 'becoming' },
  { id: 69, message: "You are allowed to be both grateful and struggling.", theme: 'presence' },
  { id: 70, message: "Rest is productive. Stillness is sacred.", theme: 'rest' },
  { id: 71, message: "You belong here. Right now. As you are.", theme: 'belonging' },
  { id: 72, message: "Your worth is not determined by others' opinions.", theme: 'trust' },
  { id: 73, message: "The sky doesn't apologize for its storms. Neither should you.", theme: 'release' },
  { id: 74, message: "You are allowed to start over as many times as you need.", theme: 'becoming' },
  { id: 75, message: "Your existence is a gift to this world.", theme: 'belonging' },
  { id: 76, message: "You don't have to be perfect to be worthy.", theme: 'trust' },
  { id: 77, message: "The crow carries messages between worlds. What is yours telling you?", theme: 'presence' },
  { id: 78, message: "You are allowed to protect your peace.", theme: 'rest' },
  { id: 79, message: "Your journey is valid, even the parts you can't explain.", theme: 'becoming' },
  { id: 80, message: "You are more than your achievements.", theme: 'trust' },
  { id: 81, message: "The water reflects what is. Be gentle with what you see.", theme: 'presence' },
  { id: 82, message: "You are allowed to let go of what no longer serves you.", theme: 'release' },
  { id: 83, message: "Your voice matters, even when it shakes.", theme: 'belonging' },
  { id: 84, message: "You don't have to have all the answers.", theme: 'release' },
  { id: 85, message: "The crow trusts its wings. Trust yours.", theme: 'trust' },
  { id: 86, message: "You are worthy of the space you occupy.", theme: 'belonging' },
  { id: 87, message: "Your feelings are information, not inconvenience.", theme: 'presence' },
  { id: 88, message: "You are allowed to move at your own pace.", theme: 'rest' },
  { id: 89, message: "The horizon holds infinite possibility. So do you.", theme: 'becoming' },
  { id: 90, message: "You are not too late. You are right on time.", theme: 'trust' },

];

export const weeklyReflections = [
  {
    week: 1,
    theme: "Presence",
    reflection: "This week, practice noticing when you're here—really here. Not planning, not rehearsing, not fixing. Just being. The crow sits on the branch and watches. What do you notice when you simply watch?",
    practice: "Each morning, take three slow breaths before reaching for your phone. Feel your feet on the floor. You are here."
  },
  {
    week: 2,
    theme: "Belonging",
    reflection: "You don't have to earn your place. You were born belonging—to the earth, to the sky, to this moment. The crow doesn't question whether it belongs in the tree. It simply lands.",
    practice: "When doubt arises, place your hand on your heart and say: 'I belong here. I belong to myself.'"
  },
  {
    week: 3,
    theme: "Rest",
    reflection: "Rest is not laziness. It is wisdom. The crow knows when to fly and when to perch. Your body knows too. Are you listening?",
    practice: "Find one moment each day to do absolutely nothing. Not productive nothing—true nothing. Let yourself be held by stillness."
  },
  {
    week: 4,
    theme: "Release",
    reflection: "What are you carrying that was never yours to hold? The crow releases the branch to fly. Sometimes letting go is how we rise.",
    practice: "Write down one thing you're ready to release. Then, if it feels right, let the paper go—burn it, bury it, or simply throw it away."
  },
  {
    week: 5,
    theme: "Trust",
    reflection: "Trust is not certainty. It is moving forward without knowing the ending. The crow flies into fog and trusts the sky is still there. What would you do if you trusted yourself more?",
    practice: "Choose one small thing today that scares you a little. Do it anyway. Notice what happens."
  },
  {
    week: 6,
    theme: "Becoming",
    reflection: "You are not who you were yesterday. You are not yet who you will be tomorrow. Right now, you are becoming. The crow molts its feathers to grow new ones. What are you shedding?",
    practice: "Write a letter to your future self. Tell them what you're learning. Seal it. Open it in a month."
  },
  {
    week: 7,
    theme: "Compassion",
    reflection: "The gentleness you offer others—can you offer it to yourself? The crow preens its own feathers with care. You deserve that same tenderness.",
    practice: "When you make a mistake this week, pause. Ask: 'What would I say to a friend?' Say that to yourself."
  },
  {
    week: 8,
    theme: "Boundaries",
    reflection: "Boundaries are not walls. They are the edges of your garden—protecting what you're growing. The crow knows its territory. What are you protecting?",
    practice: "Say 'no' to one thing this week that doesn't serve you. Notice how it feels. That feeling is freedom."
  },
];



export const doubtingMessages = [
  {
    title: "When you feel not enough",
    message: "The voice that says you're not enough learned that somewhere. It's not the truth—it's an echo. You are enough, even when you can't feel it. Especially then.",
    breath: "Inhale: I am. Exhale: Enough."
  },
  {
    title: "When you feel behind",
    message: "There is no cosmic timeline you've fallen off of. Your path is yours alone. The crow doesn't compare its flight to the eagle's. Both are flying.",
    breath: "Inhale: My pace. Exhale: Is right."
  },
  {
    title: "When you feel alone",
    message: "Loneliness is not proof that you're unlovable. It's proof that you're human. Even the crow calls out across the sky. Connection is coming.",
    breath: "Inhale: I am seen. Exhale: I am held."
  },
  {
    title: "When you feel like giving up",
    message: "You don't have to know how this ends to keep going. The crow flies into fog and trusts the sky is still there. Rest if you need to. But don't disappear.",
    breath: "Inhale: One breath. Exhale: At a time."
  },
  {
    title: "When you feel like a burden",
    message: "Your needs are not too much. Your presence is not a problem. The people who love you want to hold space for you—let them.",
    breath: "Inhale: I am worthy. Exhale: Of care."
  },
  {
    title: "When you feel lost",
    message: "Being lost is not the same as being wrong. Sometimes we wander so we can discover. The crow explores every branch before choosing where to land.",
    breath: "Inhale: I am finding. Exhale: My way."
  },
];

export const returnToCenterPractices = [
  {
    title: "Ground",
    duration: "2 minutes",
    instruction: "Feel your feet on the floor. Notice five things you can see. Four things you can hear. Three things you can touch. Two things you can smell. One thing you can taste. You are here. You are safe.",
    icon: "earth"
  },
  {
    title: "Breathe",
    duration: "1 minute",
    instruction: "Inhale for four counts. Hold for four counts. Exhale for six counts. Repeat three times. The breath is always here, always available, always yours.",
    icon: "wind"
  },
  {
    title: "Release",
    duration: "3 minutes",
    instruction: "Shake your hands vigorously for 30 seconds. Let them hang loose. Notice the tingling. This is energy moving. Let it move through you and out.",
    icon: "feather"
  },
  {
    title: "Anchor",
    duration: "1 minute",
    instruction: "Place one hand on your heart, one on your belly. Feel the rise and fall. Say quietly: 'I am here. I am safe. I am worthy.' Repeat until you believe it.",
    icon: "anchor"
  },
  {
    title: "Expand",
    duration: "2 minutes",
    instruction: "Look up at the sky—real or imagined. Remember how vast it is. Remember that you are part of something larger. Let that hold you.",
    icon: "sky"
  },
];

export const yearlyThemes = [
  { month: "January", theme: "Beginning Again", message: "Every moment is a chance to begin again. Not because you failed, but because you're alive." },
  { month: "February", theme: "Self-Compassion", message: "The love you seek outside yourself lives within. Turn toward it." },
  { month: "March", theme: "Emergence", message: "Like the earth waking, you are allowed to emerge slowly. No rush." },
  { month: "April", theme: "Growth", message: "Growth is not always visible. Trust the roots you're building underground." },
  { month: "May", theme: "Bloom", message: "You don't bloom for others. You bloom because it's your nature." },
  { month: "June", theme: "Light", message: "Even in your longest days, remember to rest in the shade." },
  { month: "July", theme: "Abundance", message: "There is enough. You are enough. This moment is enough." },
  { month: "August", theme: "Presence", message: "Be here now. Not in what was. Not in what might be. Here." },
  { month: "September", theme: "Harvest", message: "Gather what you've grown. Release what didn't take root." },
  { month: "October", theme: "Transition", message: "Change is not loss. It is transformation. The crow knows this." },
  { month: "November", theme: "Gratitude", message: "Gratitude is not denial of pain. It is presence to what is also true." },
  { month: "December", theme: "Rest", message: "In the darkest days, rest deepest. Light will return." },
];

// Helper function to get today's message based on day of year
export const getTodaysMessage = (): WorthyMessage => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const messageIndex = dayOfYear % dailyMessages.length;
  return dailyMessages[messageIndex];
};

// Helper function to get current month's theme
export const getCurrentMonthTheme = () => {
  const monthIndex = new Date().getMonth();
  return yearlyThemes[monthIndex];
};

// Helper function to get current week's reflection
export const getCurrentWeekReflection = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  const weekOfYear = Math.floor(diff / oneWeek);
  const weekIndex = weekOfYear % weeklyReflections.length;
  return weeklyReflections[weekIndex];
};
