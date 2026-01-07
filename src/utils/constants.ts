// Shared constants for better performance and maintainability

export const DISTANCE_OPTIONS = [
  ...Array.from({ length: 4 }, (_, i) => (i + 1) * 5), // 5, 10, 15, 20
  ...Array.from({ length: 8 }, (_, i) => (i + 3) * 10), // 30, 40, ..., 100
];

export const COMMON_INTERESTS = [
  'Travel', 'Cooking', 'Music', 'Movies', 'Reading', 'Fitness', 
  'Photography', 'Art', 'Dancing', 'Hiking', 'Gaming', 'Sports',
  'Technology', 'Fashion', 'Food', 'Wine', 'Coffee', 'Pets'
];

export const DEFAULT_AGE_RANGE = [18, 65] as const;
export const DEFAULT_MAX_DISTANCE = 20;
export const MIN_AGE_GAP = 2;
