const API_KEY = 'AIzaSyDP5e13jE7MnCbJCQBCSAo-foFMxTqYGEM';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest';

/* global gapi */

export const gapiInit = () => {
	gapi.client.init({
		apiKey: API_KEY,
	}).then(() => {
		gapi.client.load(DISCOVERY_DOC);
	});
};

export const gapiLoad = () => {
	gapi.load('client:auth2', gapiInit)
}

export const getAccessToken = () => { return gapi.client.getToken().access_token }

export const onSucessCallback = (tokenResponse) => {
	console.log(tokenResponse.access_token);
	console.log(gapi.client.getToken().access_token)
};
