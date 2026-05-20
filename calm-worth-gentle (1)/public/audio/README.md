# Audio Files for Worthy 365

Place your meditation and affirmation audio files in this folder.
**Both MP3 and M4A formats are supported** — the app will automatically detect either format.

## Expected File Names

You can use EITHER `.mp3` or `.m4a` extension for any file. The app will try both automatically.

### Guided Meditations
- `meditation-1-returning-to-worth.m4a` (or `.mp3`) — Returning to Worth (5 min)
- `meditation-2-you-are-enough.m4a` (or `.mp3`) — You Are Enough, Even Here (4 min)
- `meditation-3-when-self-doubt-arises.m4a` (or `.mp3`) — When Self-Doubt Arises (6 min)
- `meditation-4-grounding-in-the-body.m4a` (or `.mp3`) — Grounding in the Body (3 min)
- `meditation-5-remembering-who-you-are.m4a` (or `.mp3`) — Remembering Who You Are (7 min)

### Spoken Affirmations
- `affirmation-1.m4a` (or `.mp3`) — "You don't need to prove your worth..."
- `affirmation-2.m4a` (or `.mp3`) — "You are allowed to take up space..."
- `affirmation-3.m4a` (or `.mp3`) — "Nothing is wrong with you..."
- `affirmation-4.m4a` (or `.mp3`) — "You are not behind..."
- `affirmation-5.m4a` (or `.mp3`) — "Your worth is not conditional..."
- `affirmation-6.m4a` (or `.mp3`) — "You are allowed to rest..."
- `affirmation-7.m4a` (or `.mp3`) — "You belong here..."
- `affirmation-8.m4a` (or `.mp3`) — "Your sensitivity is not a flaw..."
- `affirmation-9.m4a` (or `.mp3`) — "You are more than what you produce..."
- `affirmation-10.m4a` (or `.mp3`) — "The pace you're moving..."
- `affirmation-11.m4a` (or `.mp3`) — "You are worthy of the love..."
- `affirmation-12.m4a` (or `.mp3`) — "Let go of what was never yours..."

## Audio Format Guidelines
- **Format:** M4A (AAC) or MP3 — both work great
- **Bitrate:** 128kbps or higher for voice clarity
- **Sample Rate:** 44.1kHz
- **Channels:** Mono or Stereo

## How It Works
1. Drop your audio files (`.m4a` or `.mp3`) into this `/public/audio/` folder
2. The app will automatically detect and play them — it tries `.mp3` first, then `.m4a`
3. If a file is missing in both formats, the app falls back to AI text-to-speech generation

## How to Add Your Audio Files

### Option A: After downloading the project
1. Click the **Code** button → **Download** icon to get the ZIP
2. Extract the ZIP file
3. Copy your `.m4a` files into the `/public/audio/` folder
4. Deploy to Netlify, Vercel, or run locally with `npm run dev`

### Option B: Using Supabase Storage (for production)
1. Upload audio files to your Supabase Storage bucket
2. Update the `audioUrl` values in `src/data/worthyMessages.ts` to point to your Supabase Storage URLs
