import { getAccessToken } from './google'


const fetchAllTaskLists = async () => {
	let taskLists;
	const url = 'https://tasks.googleapis.com/tasks/v1/users/@me/lists';
	await fetch(url, {
		method: 'GET',
		headers: new Headers({ 'Authorization': 'Bearer ' + getAccessToken() })
	}).then((res) => {
		return res.json();
	}).then((taskListData) => {
		console.log(taskListData.items);
		taskLists = taskListData.items;
	});
	return taskLists;
}

export const getAllBubbleLists = async () => {
	let bubbleLists = [];
	const allTaskLists = await fetchAllTaskLists();
	for (const currentTaskList of allTaskLists) {
		const titleArr = currentTaskList.title.split(":");
		if (titleArr[0] === 'Bubble') {
			console.log(currentTaskList);
			currentTaskList.color = titleArr[1];
			bubbleLists.push(currentTaskList);
		}
	}
	console.log(bubbleLists);
	return bubbleLists;
}

const createBubbleList = async (bubbleColor) => {
	const url = 'https://tasks.googleapis.com/tasks/v1/users/@me/lists';
	const bodyContent = JSON.stringify({ title: 'Bubble:' + bubbleColor });
	await fetch(url, {
		method: 'POST',
		headers: new Headers({ 'Authorization': 'Bearer ' + getAccessToken() }),
		body: bodyContent
	});
	console.log('Created a new task list: ' + bubbleColor)
}

const getBubbleList = async (bubbleColor) => {
	console.log(bubbleColor);
	const allTaskLists = await fetchAllTaskLists();
	for (const currentTaskList of allTaskLists) {
		if (currentTaskList.title === 'Bubble:' + bubbleColor) {
			console.log(currentTaskList);
			console.log(currentTaskList.id);
			return currentTaskList;
		}
	}
	await createBubbleList(bubbleColor);
	return await getBubbleList(bubbleColor);
}

const getBubbleListId = async (bubbleColor) => {
	const bubbleList = await getBubbleList(bubbleColor);
	console.log(bubbleList);
	console.log(bubbleList.id);
	return bubbleList.id;
}

export const getBubblesFromList = async (id) => {
	let bubbles = [];
	const url = 'https://tasks.googleapis.com/tasks/v1/lists/' + (id) + '/tasks';
	await fetch(url, {
		method: 'GET',
		headers: new Headers({ 'Authorization': 'Bearer ' + getAccessToken() })
	}).then((res) => {
		return res.json();
	}).then((bubbleData) => {
		console.log("here is the bubble data")
		console.log(bubbleData.items)
		for (let i = 0; i < bubbleData.items.length; i++) {
			console.log(bubbleData.items[i].status);
			if (bubbleData.items[i].status !== "completed") {
				bubbles.push(bubbleData.items[i]);
			}
		}
	});
	return bubbles;
}

export const addBubbleToTasks = async (bubbleTitle, bubbleDate, bubbleColor, bubbleStatus) => {
	if (!(bubbleStatus === "completed")) bubbleDate += 'T00:00:00.000Z';
	console.log("this ran");
	const url = 'https://tasks.googleapis.com/tasks/v1/lists/' + (await getBubbleListId(bubbleColor)) + '/tasks';
	console.log(url);
	const bodyContent = JSON.stringify({ title: bubbleTitle, due: bubbleDate, status: bubbleStatus });
	console.log(bodyContent);
	let bubble;
	await fetch(url, {
		method: 'POST',
		headers: new Headers({ 'Authorization': 'Bearer ' + getAccessToken() }),
		body: bodyContent
	}).then((res) => {
		return res.json();
	}).then((fetchedBubble) => {
		console.log(fetchedBubble);
		bubble = fetchedBubble;
	});
	return bubble;
}

export const deleteBubbleFromTasks = async (bubbleId, bubbleColor) => {
	const url = 'https://tasks.googleapis.com/tasks/v1/lists/' + (await getBubbleListId(bubbleColor)) + '/tasks/' + bubbleId;
	await fetch(url, {
		method: 'DELETE',
		headers: new Headers({ 'Authorizaion': 'Bearer ' + getAccessToken() })
	});
}

/*const getBubble = async (bubbleListId, bubbleId) => {
	let bubble;
	const url = 'https://tasks.googleapis.com/tasks/v1/list/' + bubbleListId + '/tasks/' + bubbleId;
	await fetch(url, {
		method: 'GET',
		headers: new Headers({
			'Authorization': 'Bearer ' + getAccessToken(),
			'Access-Control-Allow-Origin': 'http://localhost:3000/' 
		}),
	}).then((res) => {
		return res;
	}).then((fetchedBubble) => {
		console.log(fetchedBubble);
		bubble = fetchedBubble;
	});
	return bubble;
}*/

export const setTaskToComplete = async (bubbleId, bubbleColor, bubbleTitle, bubbleDate) => {
	addBubbleToTasks(bubbleTitle, bubbleDate, bubbleColor, "completed");
	const bubbleListId = await getBubbleListId(bubbleColor);
	const url = 'https://tasks.googleapis.com/tasks/v1/lists/' + bubbleListId + '/tasks/' + bubbleId;
	console.log(url);
	await fetch(url, {
		method: 'DELETE',
		headers: new Headers({ 'Authorization': 'Bearer ' + getAccessToken() }),
	});
}

export const fetchUserProfile = async () => {
	let profile;
	const url = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=' + getAccessToken();
	await fetch(url, {
		method: 'GET',
		headers: new Headers({ 'Authorization': 'Bearer ' + getAccessToken()})
	}).then((res) => {
		return res.json();
	}).then((userProfile) => {
		console.log(userProfile);
		profile = userProfile;
	});
	console.log("fetchUserProfile: " + JSON.stringify(profile));
	return profile;
}