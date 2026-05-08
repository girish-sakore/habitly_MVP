/**
 * Weekly curriculum content (serializable JSON shape).
 *
 * Each game uses a discriminator `type` and a polymorphic `config` payload,
 * matching a typical LMS / engagement spec bundle.
 */

export interface Week {
  /** Stable key, e.g. for routing or CMS lookup */
  id: string;
  /** Display title */
  title: string;
  /** Ordinal week label */
  weekNumber: number;
  games: Game[];
}

export interface GameBase {
  id: string;
  type: string;
  title: string;
  description?: string;
  /** Ordering within the week */
  order?: number;
  /** XP awarded on completion */
  xpReward?: number;
}

/** Single-select MCQ stack */
export interface QuizGame extends GameBase {
  type: "quiz";
  config: {
    questions: Array<{
      id: string;
      prompt: string;
      hint?: string;
      choices: Array<{ id: string; text: string }>;
      correctChoiceId: string;
      explanation?: string;
    }>;
  };
}

/** Tinder-style left/right judgments */
export interface SwipeGame extends GameBase {
  type: "swipe";
  config: {
    instructions?: string;
    cards: Array<{
      id: string;
      body: string;
      /** Preferred swipe for a correct answer */
      correctSwipe: "left" | "right";
      /** Optional rationale after reveal */
      feedback?: string;
    }>;
  };
}

/** Pair labels (tokens) onto drop targets */
export interface DragDropGame extends GameBase {
  type: "drag-drop";
  config: {
    instructions?: string;
    targets: Array<{ id: string; label: string }>;
    items: Array<{ id: string; label: string; matchTargetId: string }>;
    /** Show labels on targets only, items only, or both — UI hint */
    layout?: "single-column" | "two-column";
  };
}

export type Game = QuizGame | SwipeGame | DragDropGame;

export const week1: Week = {
  id: "week-1",
  title: "Week 1",
  weekNumber: 1,
  games: [
    {
      id: "week-1-quiz-1",
      type: "quiz",
      title: "Week 1 — Quick quiz",
      description: "Warm up with short knowledge checks.",
      order: 1,
      xpReward: 50,
      config: {
        questions: [
          {
            id: "q1",
            prompt: "What is a meaningful daily learning habit?",
            choices: [
              { id: "a", text: "Cramming only before deadlines" },
              { id: "b", text: "Short, consistent practice sessions" },
              { id: "c", text: "Avoiding breaks entirely" },
            ],
            correctChoiceId: "b",
            explanation: "Consistency beats marathon sessions for retention.",
          },
          {
            id: "q2",
            prompt: 'What does "spacing" practice mean?',
            choices: [
              { id: "a", text: "Studying everything in one sitting" },
              { id: "b", text: "Spreading reviews over several days or weeks" },
              { id: "c", text: "Skipping topics that feel familiar" },
            ],
            correctChoiceId: "b",
          },
        ],
      },
    },
    {
      id: "week-1-swipe-1",
      type: "swipe",
      title: "Swipe on learning myths",
      description: "Swipe right for good advice, left for misconceptions.",
      order: 2,
      xpReward: 40,
      config: {
        instructions: 'Swipe right ➜ solid tip. Swipe left ➜ myth to drop.',
        cards: [
          {
            id: "s1",
            body: "Teach-back: explain what you learned in your own words.",
            correctSwipe: "right",
            feedback: "Active recall strengthens memory traces.",
          },
          {
            id: "s2",
            body: "Highlighting text without revisiting equals deep learning.",
            correctSwipe: "left",
            feedback: "Passive marking needs follow-up rehearsal to stick.",
          },
          {
            id: "s3",
            body: "Sleep before a recap session improves consolidation.",
            correctSwipe: "right",
          },
        ],
      },
    },
    {
      id: "week-1-drag-drop-1",
      type: "drag-drop",
      title: "Match study moves to scenarios",
      description: "Drag each tactic onto where it belongs.",
      order: 3,
      xpReward: 45,
      config: {
        instructions: 'Drag each tactic into the scenario where it fits best.',
        layout: "two-column",
        targets: [
          {
            id: "t-burnout",
            label: 'You feel fried after marathon study blocks',
          },
          {
            id: "t-exam-soon",
            label: 'Exam tomorrow and time is scarce',
          },
          {
            id: "t-sticky",
            label: 'Facts slip away after lectures',
          },
        ],
        items: [
          { id: "i1", label: "Pomodoro + planned breaks", matchTargetId: "t-burnout" },
          { id: "i2", label: "Short practice retrieval (flash cues)", matchTargetId: "t-exam-soon" },
          { id: "i3", label: "Spaced repetition schedule", matchTargetId: "t-sticky" },
        ],
      },
    },
  ],
};

const weeksById: Record<string, Week> = {
  [week1.id]: week1,
};

/** Resolve curriculum week by route param (e.g. `week-1`). */
export function getWeek(weekId: string): Week | null {
  return weeksById[weekId] ?? null;
}
