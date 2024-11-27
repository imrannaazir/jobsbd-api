export type TEducation = {
  degree: string;
  instituteName: string;
  startDate: Date;
  endDate: Date;
  currentlyStudying: boolean;
  grade: number;
  fieldOfStudy: string;
};

export type TUpdateEducation = {
  degree?: string;
  instituteName?: string;
  startDate?: Date;
  endDate?: Date;
  currentlyStudying?: boolean;
  grade?: number;
  fieldOfStudy?: string;
};
