export type TLanguage = {
  language: string;
  proficiency: 'BASIC' | 'FLUENT' | 'NATIVE' | 'CONVERSATIONAL';
};

export type TUpdateLanguage = {
  language?: string;
  proficiency?: 'BASIC' | 'FLUENT' | 'NATIVE' | 'CONVERSATIONAL';
};
