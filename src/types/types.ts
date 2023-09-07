import { RootState } from '../store/store';

export type StatusType = 'loading' | 'resolved' | 'rejected';

export type FilterType =
	| 'all'
	| 'art'
	| 'biography'
	| 'computers'
	| 'history'
	| 'medical'
	| 'poetry';

export type SortType = 'relevance' | 'newest';

export interface BookState {
	totalItems: number;
	name: string;
	filter: FilterType;
	sort: SortType;
	books: IBook[];
	status: StatusType | null;
	error: any;
}

export interface FetchArgs {
	name: string;
	maxResults: number;
	startIndex: number;
}

interface ImageLinks {
	smallThumbnail: string;
}

interface VolumeInfo {
	imageLinks: ImageLinks;
	categories: string[];
	title: string;
	authors: string[];
	description: string;
}

export interface IBook {
	id: string;
	volumeInfo: VolumeInfo;
}

export interface IResponse {
	totalItems: number;
	items: IBook[];
}

export interface ThunkConfig {
	rejectWithValue: string;
	state: RootState;
}
