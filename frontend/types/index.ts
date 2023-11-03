export type JokesState = {
  id: number;
  Category: string;
  Body: string;
  likes: number;
  created_at: Date | number;
};

export type JokesValues = {
  id?: number | string | undefined;
  Category: string | string[] | undefined;
  Body: string | string[] | undefined;
  likes?: string | string[] | undefined;
  created_at?: Date | string | string[];
};

export interface UserProfileState {
  id?:string;
  username: string;
  website: string;
  avatar_url?: string;
  company: string;
  updated_at?:string;
}

export  interface RootState {
  userProfile:UserProfileState; 
  isLoggedIn:boolean | any,
}
