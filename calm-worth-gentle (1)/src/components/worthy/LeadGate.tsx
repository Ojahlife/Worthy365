import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface LeadGateProps {
  onComplete: () => void;
}

const PRACTICE = {
  title: 'The Daily Worthiness Practice',
  subtitle: 'Five minutes. No fixing required.',
  intro:
    'This is a simple returning practice. Do it once a day—morning, midday, or before sleep. Nothing to earn. Nothing to prove. Only remembering.',
  steps: [
    {
      label: 'Arrive',
      text: 'Sit or stand however your body wants to be. Let both feet find the ground. Take one slow breath in through the nose, and a longer breath out. Do this three times.',
    },
    {
      label: 'Name what is here',
      text: 'Silently name one feeling you are carrying today. "I notice I am carrying ___." No judgment, no story—just the naming. Feelings are visitors, not verdicts.',
    },
    {
      label: 'Place a hand',
      text: 'Rest one hand over your heart, the other on your belly. Feel the warmth. This is the oldest signal of safety your body knows.',
    },
    {
      label: 'Speak the return',
      text: 'Say quietly, three times: "I have been worthy all along. Nothing added it. Nothing can take it."',
    },
    {
      label: 'Offer one kindness',
      text: 'Before you move on, choose one small kindness for yourself today—water, rest, a boundary, a walk, a no. Say it out loud so it becomes real.',
    },
  ],
  closing:
    'Worthiness is not a destination you arrive at. It is the ground you were standing on the whole time. Return here as often as you forget—that is what the practice is for.',
  attribution: '— Richelle',
};

const LeadGate: React.FC<LeadGateProps> = ({ onComplete }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (!trimmedName) {
      setError('Please share your name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const { error: insertError } = await supabase.from('lead_captures').insert({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone || null,
        sms_opt_in: smsOptIn === true,
        source: 'lead-magnet-gate',
        created_at: new Date().toISOString(),
      });

      if (insertError) throw insertError;
    } catch (err) {
      console.error('Lead capture insert failed:', err);
      setError('We could not save your information. Please try again.');
      setSubmitting(false);
      return;
    }

    localStorage.setItem('worthy365_lead_captured', 'true');
    setSubmitting(false);
    setUnlocked(true);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl bg-white/70 border border-[#D4A574]/30 text-[#5C4A3D] placeholder-[#A0826D]/50 focus:outline-none focus:border-[#8B7355]/50 focus:bg-white/90 transition-colors';

  // Crow silhouette at golden hour - full uncropped background imagery
  const crowImageUrl =
    '/images/lead-gate-crow.webp';

  return (
    <div
      className="min-h-screen flex flex-col relative overflow-x-hidden"
      style={{
        // Colors sampled from the photo: pale sky, golden glow, dark post/foreground
        background:
          'linear-gradient(to bottom, #DCE0DC 0%, #E3D6BC 26%, #D79E45 52%, #A86E24 74%, #2E2018 100%)',
      }}
    >
      {/* Whole crow photo as background layer - contained, never cropped */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-center bg-contain bg-no-repeat"
        style={{ backgroundImage: `url("${crowImageUrl}")` }}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(220,224,220,0.45) 0%, rgba(215,158,69,0.28) 50%, rgba(46,32,24,0.45) 100%)',
        }}
        aria-hidden="true"
      />


      <div
        className="fixed inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-12 relative z-10">
        <div className="w-full max-w-xl">
          {!unlocked ? (
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl border border-[#D4A574]/25 shadow-xl p-7 sm:p-10">
              <p
                className="text-xs tracking-[0.2em] uppercase text-[#D4A574] mb-4 text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                A gift before you begin
              </p>
              <h1
                className="text-2xl sm:text-3xl font-light text-[#5C4A3D] mb-3 text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {PRACTICE.title}
              </h1>
              <p
                className="text-sm text-[#8B7355] mb-6 text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {PRACTICE.subtitle}
              </p>
              <p
                className="text-base text-[#5C4A3D]/80 leading-relaxed mb-8 text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Share your name and email to unlock the free daily practice—and step into the full
                Worthy 365 experience.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="lead-name"
                    className="block text-sm text-[#8B7355] mb-1.5"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Your name
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name"
                    className={inputClass}
                    style={{ fontFamily: 'Georgia, serif' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lead-email"
                    className="block text-sm text-[#8B7355] mb-1.5"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Email address
                  </label>
                  <input
                    id="lead-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                    style={{ fontFamily: 'Georgia, serif' }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lead-phone"
                    className="block text-sm text-[#8B7355] mb-1.5"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Phone number (optional)
                  </label>
                  <input
                    id="lead-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 555-5555"
                    className={inputClass}
                    style={{ fontFamily: 'Georgia, serif' }}
                  />
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={smsOptIn}
                    onChange={(e) => setSmsOptIn(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-[#D4A574]/50 accent-[#8B7355]"
                  />
                  <span
                    className="text-xs text-[#8B7355]/80 leading-relaxed"
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    Text me gentle reminders. Msg &amp; data rates may apply. Reply STOP to
                    unsubscribe.
                  </span>
                </label>

                {error && (
                  <p className="text-sm text-[#B4533F]" style={{ fontFamily: 'Georgia, serif' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-[#8B7355] text-[#F5F1E8] font-medium hover:bg-[#7A6548] transition-colors shadow-lg disabled:opacity-60"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {submitting ? 'Opening the door…' : 'Unlock my free practice'}
                </button>
              </form>

              <p
                className="mt-5 text-xs text-[#A0826D]/70 text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                No noise. Only what serves your return.
              </p>
            </div>
          ) : (
            <div className="bg-white/55 backdrop-blur-sm rounded-3xl border border-[#D4A574]/25 shadow-xl p-7 sm:p-10">
              <p
                className="text-xs tracking-[0.2em] uppercase text-[#D4A574] mb-4 text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Yours, {name.trim().split(' ')[0]}
              </p>
              <h1
                className="text-2xl sm:text-3xl font-light text-[#5C4A3D] mb-2 text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {PRACTICE.title}
              </h1>
              <p
                className="text-sm text-[#8B7355] mb-6 text-center"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {PRACTICE.subtitle}
              </p>

              <p
                className="text-base text-[#5C4A3D]/80 leading-relaxed mb-7"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {PRACTICE.intro}
              </p>

              <ol className="space-y-5 mb-8">
                {PRACTICE.steps.map((step, index) => (
                  <li key={step.label} className="flex gap-4">
                    <span
                      className="flex-shrink-0 w-8 h-8 rounded-full bg-[#A8CBDA]/40 border border-[#8B7355]/20 text-[#5C4A3D] text-sm flex items-center justify-center"
                      style={{ fontFamily: 'Georgia, serif' }}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <h2
                        className="text-base text-[#5C4A3D] mb-1"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {step.label}
                      </h2>
                      <p
                        className="text-sm text-[#5C4A3D]/75 leading-relaxed"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="border-t border-[#D4A574]/25 pt-6 mb-8">
                <p
                  className="text-base text-[#5C4A3D]/80 italic leading-relaxed"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {PRACTICE.closing}
                </p>
                <p
                  className="mt-3 text-sm text-[#8B7355]"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {PRACTICE.attribution}
                </p>
              </div>

              <button
                onClick={onComplete}
                className="w-full py-4 rounded-xl bg-[#8B7355] text-[#F5F1E8] font-medium hover:bg-[#7A6548] transition-colors shadow-lg"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Enter Worthy 365
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadGate;
