/**
 * The Build Journal records what this application can really do, version by version.
 * A line only moves from "not yet" to "done" after the behaviour actually works.
 */

export interface JournalEntry {
  version: string;
  title: string;
  done: string[];
  notYet: string[];
}

export const buildJournal: JournalEntry[] = [
  {
    version: '0.1',
    title: 'The Skeleton',
    done: [
      'Board',
      'Pawns',
      'Dice',
      'Turn rotation',
      'Start',
      'Finish',
      'Activity feed',
      'Client and server talk to each other',
      'MongoDB connection',
    ],
    notYet: [
      'Persistent memory',
      'Users',
      'Special squares',
      'Challenges',
      'Configuration',
      'Admin',
      'Artwork',
    ],
  },
];
