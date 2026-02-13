import { useState, useMemo } from 'react';

interface ScheduleDay {
  date: Date;
  session: string;
  sessionNumber: number | 'bonus';
  phase: string;
}

function generateSchedule(raceDate: Date): ScheduleDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const race = new Date(raceDate);
  race.setHours(0, 0, 0, 0);

  const msPerDay = 86400000;
  const daysUntilRace = Math.floor((race.getTime() - today.getTime()) / msPerDay);

  if (daysUntilRace < 7) return [];

  const weeksAvailable = Math.floor(daysUntilRace / 7);
  const schedule: ScheduleDay[] = [];

  // Full 8-week programme phases
  const fullPhases = [
    { weeks: 2, phase: "Foundation", sessions: [1], frequency: 3 },
    { weeks: 2, phase: "Technical", sessions: [2, 3], frequency: 3 },
    { weeks: 2, phase: "Race Scenarios", sessions: [4, 5], frequency: 3 },
    { weeks: 1, phase: "Mental Armor", sessions: [6], frequency: 3 },
    { weeks: 1, phase: "Race Simulation", sessions: [7], frequency: 2, includeBonus: true },
  ];

  // Calculate compression ratio
  const totalPhaseWeeks = fullPhases.reduce((sum, p) => sum + p.weeks, 0); // 8
  const availableWeeks = Math.min(weeksAvailable, totalPhaseWeeks);
  const ratio = availableWeeks / totalPhaseWeeks;

  let currentDate = new Date(today);

  for (const phase of fullPhases) {
    const phaseWeeks = Math.max(1, Math.round(phase.weeks * ratio));
    const phaseDays = phaseWeeks * 7;
    const totalSessions = phase.frequency * phaseWeeks;

    // Spread sessions evenly across phase days
    const gap = Math.floor(phaseDays / totalSessions);

    for (let i = 0; i < totalSessions; i++) {
      const dayOffset = i * gap;
      const sessionDate = new Date(currentDate.getTime() + dayOffset * msPerDay);

      if (sessionDate >= race) break;

      const sessionIdx = i % phase.sessions.length;
      const sessionNum = phase.sessions[sessionIdx];

      schedule.push({
        date: sessionDate,
        session: getSessionTitle(sessionNum),
        sessionNumber: sessionNum,
        phase: phase.phase,
      });
    }

    // Add bonus sessions in final week
    if (phase.includeBonus) {
      const bonusDate1 = new Date(race.getTime() - 3 * msPerDay);
      const bonusDate2 = new Date(race.getTime() - 1 * msPerDay); // race eve

      if (bonusDate1 > currentDate) {
        schedule.push({
          date: bonusDate1,
          session: "Race Week Quick Protocol",
          sessionNumber: 'bonus',
          phase: "Race Simulation",
        });
      }
      schedule.push({
        date: bonusDate2,
        session: "Race Week Quick Protocol",
        sessionNumber: 'bonus',
        phase: "Final Prep",
      });
    }

    currentDate = new Date(currentDate.getTime() + phaseDays * msPerDay);
  }

  // Sort by date and filter out past race date
  return schedule
    .filter(s => s.date < race)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
}

function getSessionTitle(num: number): string {
  const titles: Record<number, string> = {
    1: "Foundational Relaxation & Trail Senses",
    2: "Technical Descent Mastery",
    3: "Climb Resilience & Mental Toughness",
    4: "Night Running Confidence",
    5: "Aid Station Transitions & Fueling",
    6: "DNF Prevention & Race Resilience",
    7: "Full Race Day Simulation",
  };
  return titles[num] || `Session ${num}`;
}

const phaseColors: Record<string, string> = {
  "Foundation": "bg-blue-100 text-blue-700",
  "Technical": "bg-purple-100 text-purple-700",
  "Race Scenarios": "bg-amber-100 text-amber-700",
  "Mental Armor": "bg-red-100 text-red-700",
  "Race Simulation": "bg-emerald-100 text-emerald-700",
  "Final Prep": "bg-emerald-200 text-emerald-800",
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

export default function TrainingProgramme() {
  const [raceDate, setRaceDate] = useState('');
  const [raceName, setRaceName] = useState('');

  const schedule = useMemo(() => {
    if (!raceDate) return [];
    return generateSchedule(new Date(raceDate));
  }, [raceDate]);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 7);
  const minDateStr = minDate.toISOString().split('T')[0];

  // Group by phase
  const phases = useMemo(() => {
    const grouped: Record<string, ScheduleDay[]> = {};
    for (const day of schedule) {
      if (!grouped[day.phase]) grouped[day.phase] = [];
      grouped[day.phase].push(day);
    }
    return grouped;
  }, [schedule]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Training Programme</h2>
      <p className="text-gray-500 mb-6">Enter your race date to get a personalized listening schedule.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Race name (optional)</label>
          <input
            type="text"
            value={raceName}
            onChange={(e) => setRaceName(e.target.value)}
            placeholder="e.g., UTMB, Western States"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Race date</label>
          <input
            type="date"
            value={raceDate}
            onChange={(e) => setRaceDate(e.target.value)}
            min={minDateStr}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>
      </div>

      {schedule.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              {raceName ? `${raceName} Preparation` : 'Your Schedule'}
            </h3>
            <span className="text-sm text-gray-400">{schedule.length} sessions over {Math.ceil((new Date(raceDate).getTime() - Date.now()) / 86400000 / 7)} weeks</span>
          </div>

          <div className="space-y-6">
            {Object.entries(phases).map(([phase, days]) => (
              <div key={phase}>
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${phaseColors[phase] || 'bg-gray-100 text-gray-600'}`}>
                    {phase}
                  </span>
                  <span className="text-xs text-gray-400">{days.length} sessions</span>
                </div>
                <div className="grid gap-2">
                  {days.map((day, i) => (
                    <div
                      key={`${phase}-${i}`}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100"
                    >
                      <div className="w-20 shrink-0 text-sm text-gray-500 font-medium">
                        {formatDate(day.date)}
                      </div>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        day.sessionNumber === 'bonus'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {day.sessionNumber === 'bonus' ? '★' : day.sessionNumber}
                      </div>
                      <p className="text-sm text-gray-700">{day.session}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <p className="text-sm text-emerald-800">
              <strong>Tip:</strong> Screenshot or print this schedule. Best times to listen: before sleep, during rest days, or during your cool-down after training.
            </p>
          </div>
        </div>
      )}

      {raceDate && schedule.length === 0 && (
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
          <p className="text-sm text-amber-800">
            Your race is very soon! We need at least one week to build a meaningful programme. Consider using the Bonus Race Week Protocol for immediate benefit.
          </p>
        </div>
      )}
    </div>
  );
}
