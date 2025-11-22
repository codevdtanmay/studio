import type { YogaModule } from './types';

export const problemTypes = [
  'Dysmenorrhea',
  'Irregular Periods',
  'PMS',
  'Menopause Symptoms',
];

export const symptoms = [
  'Lower abdomen pain',
  'Back pain',
  'Leg pain',
  'Heavy bleeding',
  'Mood swings',
];

export const yogaModules: { [key: string]: YogaModule[] } = {
  Reproductive: [
    {
      name: 'Suryanamaskar',
      videoUrlId: 'suryanamaskar',
      duration: '15-20 minutes',
      frequency: 'Daily',
      instructions: 'A sequence of 12 powerful yoga poses. It is a great cardiovascular workout and also helps in improving flexibility and strength.',
    },
    {
      name: 'Baddha Konasana',
      videoUrlId: 'baddha-konasana',
      duration: '5-10 minutes',
      frequency: '3-4 times a week',
      instructions: 'Also known as the Butterfly Pose, it stimulates abdominal organs, ovaries, and prostate gland, bladder, and kidneys.',
    },
    {
      name: 'Bhujangasana',
      videoUrlId: 'bhujangasana',
      duration: '5 minutes',
      frequency: 'Daily',
      instructions: 'The Cobra Pose helps to open up the shoulders and neck and strengthens the entire back and shoulders.',
    },
    {
      name: 'Nadi Shodhana',
      videoUrlId: 'nadi-shodhana',
      duration: '10 minutes',
      frequency: 'Daily',
      instructions: 'Alternate Nostril Breathing is a powerful breathing practice with wide-ranging benefits, including stress reduction and improved respiratory function.',
    },
  ],
  Perimenopausal: [
    {
      name: 'Setu Bandhasana',
      videoUrlId: 'setu-bandhasana',
      duration: '10 minutes',
      frequency: '3-5 times a week',
      instructions: 'Bridge Pose helps calm the brain and central nervous system, reducing stress, anxiety, and depression.',
    },
    {
      name: 'Viparita Karani',
      videoUrlId: 'viparita-karani',
      duration: '15 minutes',
      frequency: 'Daily, especially in the evening',
      instructions: 'Legs-Up-the-Wall Pose is a gentle inversion that helps to relieve tired legs and feet, and reduce stress.',
    },
    {
      name: 'Anulom Vilom',
      videoUrlId: 'anulom-vilom',
      duration: '10-15 minutes',
      frequency: 'Daily',
      instructions: 'A form of alternate nostril breathing that helps to balance the body’s energy channels and calm the mind.',
    },
    {
      name: 'Bhramari',
      videoUrlId: 'bhramari',
      duration: '5-10 minutes',
      frequency: 'Daily',
      instructions: 'The Humming Bee Breath instantly calms the mind and is one of the best breathing exercises to release agitation and anxiety.',
    },
  ],
  Postmenopausal: [
    {
      name: 'Tadasana',
      videoUrlId: 'tadasana',
      duration: '5 minutes',
      frequency: 'Daily',
      instructions: 'Mountain Pose improves posture, strengthens thighs, knees, and ankles, and firms abdomen and buttocks.',
    },
    {
      name: 'Shavasana',
      videoUrlId: 'shavasana',
      duration: '10-20 minutes',
      frequency: 'Daily, at the end of practice',
      instructions: 'Corpse Pose allows the body to absorb the benefits of the yoga practice and promotes deep relaxation.',
    },
    {
      name: 'Pranayama Sessions',
      videoUrlId: 'pranayama',
      duration: '15-20 minutes',
      frequency: 'Daily',
      instructions: 'Focused breathing exercises to improve lung capacity, calm the nervous system, and enhance mental clarity.',
    },
    {
      name: 'Meditation',
      videoUrlId: 'meditation',
      duration: '10-30 minutes',
      frequency: 'Daily',
      instructions: 'A practice to train attention and awareness to achieve a mentally clear and emotionally calm and stable state.',
    },
  ],
};
