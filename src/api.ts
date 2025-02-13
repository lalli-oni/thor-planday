export interface QueryResponse<T> {
  payload: Array<T>;
  meta: {
    previousCursor?: string;
    nextCursor?: string;
  }
}

export interface Thing {
  id: number;
	title: string;
	description: string;
	imagePath: string;
}

export interface AddPictureMutationBody {
  title: string;
  picture: string;
}

// NOTE (LTJ): This file is now only type declaration for DTO
//  But a suitable housing for facade query hooks