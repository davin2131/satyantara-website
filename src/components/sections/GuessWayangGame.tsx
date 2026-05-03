"use client";

import { useCallback, useMemo, useState } from "react";
import { Reveal } from "../ui/Reveal";
import {
  wayangEntries,
  wayangCategoryLabels,
  wayangOriginLabels,
  type WayangEntry,
  type WayangCategory,
} from "@/data/wayang";

const QUESTIONS_PER_SESSION = 10;

type ClueKind = "summary" | "weapon" | "alias" | "origin";

type Question = {
  entry: WayangEntry;
  clueKind: ClueKind;
  clueText: string;
  options: WayangEntry[];
  correctIndex: number;
};

type GameState =
  | { phase: "intro" }
  | { phase: "playing"; questions: Question[]; current: number; answers: (number | null)[] }
  | { phase: "result"; questions: Question[]; answers: (number | null)[] };

type CategoryFilter = "all" | WayangCategory;

const categoryFilters: { value: CategoryFilter; label: string }[] = [
  { value: "all", label: "Semua Kategori" },
  { value: "pandawa", label: "Pandawa" },
  { value: "kurawa", label: "Kurawa" },
  { value: "punakawan", label: "Punakawan" },
  { value: "dewa-pahlawan", label: "Dewa & Pahlawan" },
];

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickClue(entry: WayangEntry): { kind: ClueKind; text: string } {
  const candidates: { kind: ClueKind; text: string }[] = [
    { kind: "summary", text: entry.summary },
  ];
  if (entry.weapon) {
    candidates.push({
      kind: "weapon",
      text: `Tokoh ini terkenal dengan pusaka/senjata: ${entry.weapon}.`,
    });
  }
  if (entry.alias) {
    candidates.push({
      kind: "alias",
      text: `Tokoh ini juga dikenal dengan nama lain: ${entry.alias}.`,
    });
  }
  candidates.push({
    kind: "origin",
    text: `Tokoh ini berasal dari kategori ${wayangCategoryLabels[entry.category]} dalam lakon ${wayangOriginLabels[entry.origin]}.`,
  });
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function buildQuestion(entry: WayangEntry, pool: WayangEntry[]): Question {
  const distractors = shuffle(
    pool.filter((p) => p.slug !== entry.slug),
  ).slice(0, 3);
  const options = shuffle([entry, ...distractors]);
  const correctIndex = options.findIndex((o) => o.slug === entry.slug);
  const clue = pickClue(entry);
  return {
    entry,
    clueKind: clue.kind,
    clueText: clue.text,
    options,
    correctIndex,
  };
}

function generateQuestions(filter: CategoryFilter): Question[] {
  const pool =
    filter === "all"
      ? wayangEntries
      : wayangEntries.filter((w) => w.category === filter);

  const usable = pool.length >= 4 ? pool : wayangEntries;
  const distractorPool = wayangEntries;

  const subjects = shuffle(usable).slice(
    0,
    Math.min(QUESTIONS_PER_SESSION, usable.length),
  );

  return subjects.map((entry) => {
    const sameCategoryPool = distractorPool.filter(
      (p) => p.category === entry.category && p.slug !== entry.slug,
    );
    const distractorBase =
      sameCategoryPool.length >= 3 ? sameCategoryPool : distractorPool;
    return buildQuestion(entry, distractorBase);
  });
}

export function GuessWayangGame() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [state, setState] = useState<GameState>({ phase: "intro" });
  const [revealed, setRevealed] = useState<number | null>(null);

  const startGame = useCallback(() => {
    const questions = generateQuestions(filter);
    setState({
      phase: "playing",
      questions,
      current: 0,
      answers: Array(questions.length).fill(null),
    });
    setRevealed(null);
  }, [filter]);

  const answer = useCallback(
    (optionIndex: number) => {
      if (state.phase !== "playing" || revealed !== null) return;
      setRevealed(optionIndex);
      setTimeout(() => {
        setState((s) => {
          if (s.phase !== "playing") return s;
          const newAnswers = [...s.answers];
          newAnswers[s.current] = optionIndex;
          const next = s.current + 1;
          if (next >= s.questions.length) {
            return { phase: "result", questions: s.questions, answers: newAnswers };
          }
          return { ...s, answers: newAnswers, current: next };
        });
        setRevealed(null);
      }, 1400);
    },
    [state, revealed],
  );

  const reset = useCallback(() => {
    setState({ phase: "intro" });
    setRevealed(null);
  }, []);

  return (
    <section
      id="permainan"
      className="section-glow relative px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 md:px-8 lg:px-10 lg:pb-24 lg:pt-36"
    >
      <div className="relative mx-auto max-w-4xl">
        <Reveal>
          <div className="mb-10 flex flex-col items-center gap-4 text-center sm:mb-14 sm:gap-5">
            <p className="flex items-center gap-2 text-[9px] font-medium uppercase tracking-[0.4em] text-gold-400 sm:gap-3 sm:text-[11px] sm:tracking-[0.5em]">
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
              Permainan Edukasi
              <span className="h-px w-6 bg-gold-500/60 sm:w-10" />
            </p>
            <h1 className="font-display text-4xl leading-tight text-cream min-[400px]:text-5xl sm:text-6xl md:text-7xl">
              <span className="shimmer-text">TEBAK TOKOH WAYANG</span>
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-parchment/85 sm:text-base">
              Uji pengetahuanmu tentang tokoh-tokoh wayang. Baca petunjuk
              pelan-pelan, lalu pilih nama tokoh yang paling tepat.
            </p>
          </div>
        </Reveal>

        {state.phase === "intro" && (
          <IntroCard
            filter={filter}
            onFilterChange={setFilter}
            onStart={startGame}
          />
        )}

        {state.phase === "playing" && (
          <QuestionCard
            question={state.questions[state.current]}
            current={state.current}
            total={state.questions.length}
            score={state.answers.reduce<number>((acc, ans, i) => {
              if (ans === null) return acc;
              return acc + (ans === state.questions[i].correctIndex ? 1 : 0);
            }, 0)}
            revealed={revealed}
            onAnswer={answer}
          />
        )}

        {state.phase === "result" && (
          <ResultCard
            questions={state.questions}
            answers={state.answers}
            onReset={reset}
          />
        )}
      </div>
    </section>
  );
}

function IntroCard({
  filter,
  onFilterChange,
  onStart,
}: {
  filter: CategoryFilter;
  onFilterChange: (f: CategoryFilter) => void;
  onStart: () => void;
}) {
  const filterCount =
    filter === "all"
      ? wayangEntries.length
      : wayangEntries.filter((w) => w.category === filter).length;
  const tooFewForFilter = filter !== "all" && filterCount < 4;

  return (
    <Reveal delay={80}>
      <div className="rounded-2xl border border-gold-500/20 bg-coffee-900/70 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-10">
        <h2 className="font-display text-2xl text-cream sm:text-3xl">
          Cara Bermain
        </h2>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-parchment/85 sm:text-base">
          <li>• {QUESTIONS_PER_SESSION} pertanyaan dipilih acak dari Ensiklopedia.</li>
          <li>• Setiap soal: baca petunjuk, lalu pilih 1 dari 4 nama tokoh.</li>
          <li>• Jawaban benar/salah langsung muncul, lengkap dengan info edukasi.</li>
          <li>• Selesai → lihat skor & tinjau soal yang salah.</li>
        </ul>

        <div className="mt-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-300">
            Pilih kategori soal
          </p>
          <div className="mt-3 flex flex-wrap gap-2 sm:gap-3">
            {categoryFilters.map((f) => {
              const active = filter === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => onFilterChange(f.value)}
                  className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] transition-all sm:text-xs sm:tracking-[0.22em] ${
                    active
                      ? "border-gold-400/80 bg-gold-500/15 text-gold-200 shadow-[0_10px_30px_-15px_rgba(212,162,78,0.6)]"
                      : "border-gold-500/20 bg-coffee-800/60 text-parchment/90 hover:border-gold-400/50 hover:text-cream"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-parchment/85 sm:text-sm">
            Tersedia <span className="font-semibold text-gold-300">{filterCount}</span> tokoh dalam kategori ini.
            {tooFewForFilter
              ? " Soal akan dilengkapi dari kategori lain agar tetap bisa main."
              : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 px-7 py-3.5 font-semibold uppercase tracking-[0.22em] text-coffee-950 shadow-[0_18px_40px_-15px_rgba(212,162,78,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(212,162,78,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-coffee-950 sm:w-auto sm:px-10"
        >
          Mulai Bermain →
        </button>
      </div>
    </Reveal>
  );
}

function QuestionCard({
  question,
  current,
  total,
  score,
  revealed,
  onAnswer,
}: {
  question: Question;
  current: number;
  total: number;
  score: number;
  revealed: number | null;
  onAnswer: (i: number) => void;
}) {
  const isAnswered = revealed !== null;
  const isCorrect = isAnswered && revealed === question.correctIndex;

  const progressPct = useMemo(() => ((current + 1) / total) * 100, [current, total]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-2xl border border-gold-500/20 bg-coffee-900/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300">
            Soal {current + 1} dari {total}
          </p>
          <div className="mt-2 h-1.5 w-44 overflow-hidden rounded-full bg-coffee-800 sm:w-64">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300">
            Skor
          </p>
          <p className="mt-1 font-display text-2xl text-cream sm:text-3xl">
            {score} <span className="text-base text-parchment/60">/ {total}</span>
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gold-500/20 bg-coffee-900/70 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300 sm:text-[11px]">
          Petunjuk
        </p>
        <p className="mt-3 text-base leading-relaxed text-cream sm:text-xl">
          {question.clueText}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {question.options.map((opt, i) => {
            const isSelected = revealed === i;
            const isRight = i === question.correctIndex;
            const showAsCorrect = isAnswered && isRight;
            const showAsWrong = isAnswered && isSelected && !isRight;
            return (
              <button
                key={opt.slug}
                type="button"
                onClick={() => onAnswer(i)}
                disabled={isAnswered}
                className={`group flex items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left transition-all duration-300 ${
                  showAsCorrect
                    ? "border-emerald-400/80 bg-emerald-500/15 text-cream shadow-[0_18px_40px_-18px_rgba(16,185,129,0.6)]"
                    : showAsWrong
                    ? "border-rose-400/80 bg-rose-500/15 text-cream"
                    : isAnswered
                    ? "border-gold-500/15 bg-coffee-800/40 text-parchment/55"
                    : "border-gold-500/25 bg-coffee-800/60 text-cream hover:-translate-y-0.5 hover:border-gold-400/70 hover:bg-coffee-800/80 hover:shadow-[0_18px_40px_-20px_rgba(212,162,78,0.4)]"
                } disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-coffee-950`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${
                      showAsCorrect
                        ? "border-emerald-300/80 bg-emerald-400/20 text-emerald-100"
                        : showAsWrong
                        ? "border-rose-300/80 bg-rose-400/20 text-rose-100"
                        : "border-gold-400/40 bg-coffee-900/70 text-gold-200"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="font-display text-base sm:text-lg">{opt.name}</span>
                </span>
                {showAsCorrect && <span aria-hidden>✓</span>}
                {showAsWrong && <span aria-hidden>✕</span>}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div
            role="status"
            className={`mt-6 rounded-xl border px-5 py-4 text-sm leading-relaxed ${
              isCorrect
                ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-50"
                : "border-rose-400/40 bg-rose-500/10 text-rose-50"
            }`}
          >
            <p className="font-semibold">
              {isCorrect ? "Benar!" : `Belum tepat — jawaban: ${question.entry.name}`}
              {question.entry.alias && (
                <span className="ml-2 text-[11px] uppercase tracking-[0.22em] text-gold-300">
                  {question.entry.alias}
                </span>
              )}
            </p>
            <p className="mt-1.5 text-parchment/85">{question.entry.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function ResultCard({
  questions,
  answers,
  onReset,
}: {
  questions: Question[];
  answers: (number | null)[];
  onReset: () => void;
}) {
  const correctCount = answers.reduce<number>(
    (acc, ans, i) => acc + (ans === questions[i].correctIndex ? 1 : 0),
    0,
  );
  const total = questions.length;
  const pct = Math.round((correctCount / total) * 100);
  const grade =
    pct >= 90
      ? { label: "Empu Wayang!", color: "text-emerald-300", desc: "Pengetahuanmu setara empu pewayangan." }
      : pct >= 70
      ? { label: "Dalang Muda", color: "text-gold-300", desc: "Sudah lumayan dalam, terus dalami!" }
      : pct >= 40
      ? { label: "Sayners Penasaran", color: "text-amber-200", desc: "Mulai paham, ayo ulang lagi!" }
      : { label: "Petualang Baru", color: "text-rose-200", desc: "Belajar terus, kunjungi Ensiklopedia." };

  return (
    <Reveal>
      <div className="rounded-2xl border border-gold-500/20 bg-coffee-900/70 p-6 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] sm:p-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-300 sm:text-[11px]">
          Hasil Akhir
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-2">
          <p className="font-display text-5xl text-cream sm:text-6xl">
            {correctCount}
            <span className="text-2xl text-parchment/55"> / {total}</span>
          </p>
          <p className={`font-display text-2xl ${grade.color}`}>
            {grade.label}
          </p>
        </div>
        <p className="mt-2 text-sm text-parchment/80 sm:text-base">{grade.desc}</p>

        <h3 className="mt-8 font-display text-xl text-cream sm:text-2xl">
          Tinjauan Soal
        </h3>
        <ul className="mt-4 space-y-3">
          {questions.map((q, i) => {
            const ans = answers[i];
            const right = ans === q.correctIndex;
            return (
              <li
                key={i}
                className={`rounded-xl border px-4 py-3 text-sm sm:px-5 sm:py-4 ${
                  right
                    ? "border-emerald-400/30 bg-emerald-500/5"
                    : "border-rose-400/30 bg-rose-500/5"
                }`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-300">
                  Soal {i + 1} · {right ? "Benar" : "Salah"}
                </p>
                <p className="mt-1.5 text-parchment/85">{q.clueText}</p>
                <p className="mt-1 text-cream">
                  <span className="font-semibold">Jawaban: </span>
                  {q.entry.name}
                  {!right && ans !== null && (
                    <span className="text-rose-300/90">
                      {" "}— pilihanmu: {q.options[ans].name}
                    </span>
                  )}
                </p>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex flex-1 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 px-7 py-3.5 font-semibold uppercase tracking-[0.22em] text-coffee-950 shadow-[0_18px_40px_-15px_rgba(212,162,78,0.6)] transition-all hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-12px_rgba(212,162,78,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-coffee-950"
          >
            Main Lagi →
          </button>
          <a
            href="/ensiklopedia-wayang"
            className="inline-flex flex-1 items-center justify-center gap-3 rounded-full border border-gold-400/50 px-7 py-3.5 font-semibold uppercase tracking-[0.22em] text-cream transition-all hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-500/10"
          >
            Buka Ensiklopedia
          </a>
        </div>
      </div>
    </Reveal>
  );
}
