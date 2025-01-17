const stickyNotes = document.querySelector('#StickyNotes');
const pomodoro = document.querySelector('#POMODORO');
const favorites = document.querySelector('#Favorites');
const toDoList = document.querySelector('#ToDoList');
const search = document.querySelector('#searchBar');
const searchButton = document.querySelector('#validate');
const calculator = document.querySelector('#Calculator');
const date = document.querySelector('#date');
const time = document.querySelector('#time');

let windowsTab
let pomodoroWindow
let favoritesWindow
let toDoListWindow
let stickyNotesWindow
let calculatorWindow
let fullDate = new Date()

pomodoro.addEventListener('click', async () => {
	if (pomodoro.checked)
	{
		pomodoroWindow = await chrome.windows.create({
			url: 'pomodoro.html',
			type: 'panel', width: 260, height: 340,
		});
	}
	else
	{
		chrome.windows.remove(pomodoroWindow.id)
	}
})

favorites.addEventListener('click', async () => {
	if (favorites.checked)
	{
		favoritesWindow = await chrome.windows.create({
			url: 'favorite.html',
			type: 'panel', width: 300, height: 400,
		});
	}
	else
	{
		chrome.windows.remove(favoritesWindow.id)
	}
})

toDoList.addEventListener('click', async () => {
	if (toDoList.checked)
	{
		toDoListWindow = await chrome.windows.create({
			url: 'toDo.html',
			type: 'panel', width: 400, height: 400,
		});
	}
	else
	{
		chrome.windows.remove(toDoListWindow.id)
	}
})

stickyNotes.addEventListener('click', async () => {
	if (stickyNotes.checked)
	{
		stickyNotesWindow = await chrome.windows.create({
			url: 'sticky.html',
			type: 'panel', width: 400, height: 400,
		});
	}
	else
	{
		chrome.windows.remove(stickyNotesWindow.id)
	}
})

calculator.addEventListener('click', async () => {
	if (calculator.checked)
	{
		calculatorWindow = await chrome.windows.create({
			url: 'calculator.html',
			type: 'panel', width: 530, height: 420,
		});
	}
	else
	{
		chrome.windows.remove(calculatorWindow.id)
	}
})

document.addEventListener('keypress', () => {
	if (event.key === 'Enter')
	{
		let searchValue = search.value
		if (searchValue)
		{
			chrome.tabs.create({
				url: 'https://www.google.com/search?q=' + searchValue,
			})
		}
	}
})

searchButton.addEventListener('click', () => {
	let searchValue = search.value
	if (searchValue)
	{
		chrome.tabs.create({
			url: 'https://www.google.com/search?q=' + searchValue,
		})
	}
})

chrome.tabs.onCreated.addListener(async () => {
	windowsTab = await updateWindowsTab()
	for (i = 1; i < windowsTab.length; i++)
	{
		chrome.windows.update(windowsTab[i].id, {
			focused: true
		})
	}
})

chrome.tabs.onRemoved.addListener(async () => {
	windowsTab = await updateWindowsTab()
	for (i = 1; i < windowsTab.length; i++)
	{
		chrome.windows.update(windowsTab[i].id, {
			focused: true
		})
	}
})

const updateWindowsTab = async () => {
	const windowsTabReturn = await chrome.windows.getAll()
	return (windowsTabReturn)
}

const displayDate = () => {
	let year = fullDate.getFullYear()
	let month = fullDate.getMonth()
	let day = fullDate.getUTCDate()
	date.innerHTML = (day < 10 ? '0' + day : day) + '/' + (month < 10 ? '0' + (month + 1) : month + 1) + '/' + year 
}

const displayTime = () => {
	let hour = fullDate.getHours()
	let minutes = fullDate.getMinutes()
	let seconds = fullDate.getSeconds()
	time.innerHTML = hour + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
	setInterval(() => {
		seconds++
		if (seconds >= 60)
		{
			seconds = 0
			minutes++
		}
		if (minutes >= 60)
		{
			minutes = 0
			hour++
		}
		if (hour >= 24)
		{
			hour = 0
			fullDate = new Date()
			displayDate()
		}
		time.innerHTML = hour + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds)
	}, 1000)
}

displayDate()
displayTime()