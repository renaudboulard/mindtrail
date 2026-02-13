import { useState, useRef, useEffect } from 'react';

interface Session {
  id: number;
  title: string;
  duration: string;
  slug: string;
}

const sessions: Session[] = [
  { id: 1, title: "Foundational Relaxation & Trail Senses", duration: "10 min", slug: "session-1" },
  { id: 2, title: "Technical Descent Mastery", duration: "12 min", slug: "session-2" },
  { id: 3, title: "Climb Resilience & Mental Toughness", duration: "12 min", slug: "session-3" },
  { id: 4, title: "Night Running Confidence", duration: "10 min", slug: "session-4" },
  { id: 5, title: "Aid Station Transitions & Fueling", duration: "12 min", slug: "session-5" },
  { id: 6, title: "DNF Prevention & Race Resilience", duration: "15 min", slug: "session-6" },
  { id: 7, title: "Full Race Day Simulation", duration: "15 min", slug: "session-7" },
  { id: 8, title: "Bonus: Race Week Quick Protocol", duration: "8 min", slug: "bonus" },
];

export default function SessionPlayer() {
  const [email, setEmail] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mindtrail_email') || '';
    }
    return '';
  });
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleAuth = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.email) setEmail(detail.email);
    };
    window.addEventListener('mindtrail:auth', handleAuth);
    return () => window.removeEventListener('mindtrail:auth', handleAuth);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audioUrl]);

  const loadSession = async (session: Session) => {
    setCurrentSession(session);
    setLoading(true);
    setError(null);
    setIsPlaying(false);
    setProgress(0);

    try {
      const res = await fetch('/api/get-audio-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, sessionSlug: session.slug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load audio');
      setAudioUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audio');
    } finally {
      setLoading(false);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Sessions</h2>

      <div className="grid gap-3 mb-8">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => loadSession(session)}
            className={`w-full text-left p-4 rounded-xl border transition flex items-center gap-4 ${
              currentSession?.id === session.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 bg-white hover:border-emerald-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${
              currentSession?.id === session.id
                ? 'bg-emerald-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {session.id <= 7 ? session.id : '★'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm">{session.title}</p>
              <p className="text-gray-400 text-xs">{session.duration}</p>
            </div>
            {currentSession?.id === session.id && isPlaying && (
              <div className="flex gap-0.5 items-end h-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-1 bg-emerald-500 rounded-full animate-pulse"
                    style={{ height: `${8 + i * 4}px`, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Player */}
      {currentSession && (
        <div className="sticky bottom-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4">
          {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          <div className="flex items-center gap-3 mb-1">
            <p className="text-sm font-semibold text-gray-900 flex-1">{currentSession.title}</p>
            <span className="text-xs text-gray-400">
              {duration ? `${formatTime((progress / 100) * duration)} / ${formatTime(duration)}` : currentSession.duration}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              disabled={loading || !!error}
              className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 transition flex items-center justify-center shrink-0"
            >
              {loading ? (
                <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : isPlaying ? (
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              )}
            </button>

            <div
              className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer group"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-emerald-500 rounded-full relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-600 rounded-full opacity-0 group-hover:opacity-100 transition" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
