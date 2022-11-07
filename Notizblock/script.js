let noticeTitle = ['Notiz 1', 'Notiz 2', 'Notiz 3'];
let notice = ['Inhalt 1', 'Inhalt 2', 'Inhalt 3'];
load();

function render() {
	let content = document.getElementById('content');
	content.innerHTML = '';
	content.innerHTML = `
	<div class="headTitle">
	<h1>Notizblock</h1>
	</div>
	`
	content.innerHTML += /*html*/`
		<div class="head">
			<div class="input">
				<input placeholder="Titel" id="NotizTitel">
			</div>
			<div class="input">
				<input placeholder="Inhalt" id="NotizInhalt">
			</div>
			<div class="button">
				<button class="addButton" onclick="addNotice()">Notiz erstellen</button>
			</div>
		</div>
		`;

	for (let i = 0; i < noticeTitle.length; i++) {
		const ntitle = noticeTitle[i];
		const note = notice[i];


		content.innerHTML += `
		<div class="showNotice">
			<div class="createNotice">	
				<b>Titel: </b> ${ntitle}<br>
				<b>Inhalt: </b> ${note} <br>
				<a href="#" onclick="deleteItem(${i})">Löschen</a>
				<br>
			</div>
		</div>
		`;
	}
}

function addNotice() {
	let notizTitel = document.getElementById('NotizTitel');
	let NotizInhalt = document.getElementById('NotizInhalt');

	if ((notizTitel.value != "") && (NotizInhalt.value != "")) {
		noticeTitle.push(notizTitel.value);
		notice.push(NotizInhalt.value);
		render();
		save();
	}
	else {
		alert('Eine oder mehrere Felder sind nicht ausgefüllt. Bitte füllen Sie beide Felder aus.');
		render();
		save();
	}
}

function deleteItem(i) {
	noticeTitle.splice(i, 1);
	notice.splice(i, 1);

	render();
	save();
}

function save() {
	let noticeTitleAsText = JSON.stringify(noticeTitle);
	localStorage.setItem('noticeTitle', noticeTitleAsText);
	let noticeAsText = JSON.stringify(notice);
	localStorage.setItem('notice', noticeAsText);
}

function load() {
	let noticeTitleAsText = localStorage.getItem('noticeTitle');
	let noticeAsText = localStorage.getItem('notice');
	if (noticeAsText && noticeAsText) {
		noticeTitle = JSON.parse(noticeTitleAsText);
		notice = JSON.parse(noticeAsText);
	}
}

