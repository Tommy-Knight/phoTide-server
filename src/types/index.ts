export interface UserType {
	username?: string;
	email?: string;
	password?: string;
	favourites?: [];
	photos?:[];
	avatar?: string;
	refreshToken?: string
	_id?: string
}

export interface Data {
	_id?: string;
}