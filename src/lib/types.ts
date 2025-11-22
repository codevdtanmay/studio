export type UserDetails = {
  fullName: string;
  age: number | '';
  district: string;
  state: string;
  mobileNumber: string;
  education: string;
  occupation: string;
};

export type Demographics = {
  area: 'Urban' | 'Rural' | '';
  maritalStatus: 'Married' | 'Unmarried' | '';
  reproductiveStatus: 'Menstruating' | 'Irregular' | 'Menopause' | '';
};

export type UserProblem = {
  problemType?: 'Dysmenorrhea' | 'Irregular Periods' | 'PMS' | 'Menopause Symptoms' | '';
  symptoms?: string[];
  otherDescription?: string;
};

export type UserStage = 'Reproductive' | 'Perimenopausal' | 'Postmenopausal' | '';

export type UserData = {
  details: UserDetails;
  demographics: Demographics;
  problem: UserProblem;
  stage: UserStage;
  onboardingComplete: boolean;
};

export type YogaModule = {
    name: string;
    videoUrlId: string;
    duration: string;
    frequency: string;
    instructions: string;
};
