// document.addEventListener('DOMContentLoaded', function() {
//     toggleDarkMode('false');
// });

// function toggleDarkMode(save) {
// 	var darkMode = sessionStorage.getItem('darkMode') ?? 'disabled';
// 	if (save === 'true') {
// 		darkMode = (darkMode === 'disabled') ? 'enabled' : 'disabled';
// 	}

// 	const elementsToToggle = document.querySelectorAll('.dark-mode-toggle');
// 	elementsToToggle.forEach(element => {
// 		if (darkMode === 'disabled') {
// 			element.classList.remove('dark-mode');
// 		} else {
// 			element.classList.add('dark-mode');
// 		}
// 	});

// 	var symbolContainer = document.getElementById('symbol-container');
// 	symbolContainer.innerHTML = (darkMode === 'enabled') ? '🔆' : '🌙';

// 	sessionStorage.setItem('darkMode', darkMode);
// }

function toggleDarkMode(save) {
	var darkMode = sessionStorage.getItem('darkMode') ?? 'disabled';
	if (save === 'true') {
		darkMode = (darkMode === 'disabled') ? 'enabled' : 'disabled';
	}

	const elementsToToggle = document.querySelectorAll('.dark-mode-toggle');
	elementsToToggle.forEach(element => {
		if (darkMode === 'disabled') {
			element.classList.remove('dark-mode');
		} else {
			element.classList.add('dark-mode');
		}
	});

	var symbolContainer = document.getElementById('symbol-container');
	symbolContainer.innerHTML = (darkMode === 'enabled') ? '🔆' : '🌙';

	// Actualizează imaginea de fundal în funcție de noua clasă
	document.body.style.backgroundImage = `url('${getBackgroundImage(darkMode)}')`;

    // Actualizeaza celelate caracteristici ale butoanelor
    updateButtonStyles(darkMode);

	sessionStorage.setItem('darkMode', darkMode);
}

// Funcție pentru a obține calea imaginii de fundal în funcție de modul întunecat
function getBackgroundImage(darkMode) {
	return (darkMode === 'enabled') ? 'resource2.jpg' : 'resource1.jpg';
}

function updateButtonStyles(darkMode) {
	const buttonElements = document.querySelectorAll('.butonop');
	buttonElements.forEach(button => {
		// Modifică alte caracteristici ale butoanelor în funcție de modul întunecat
		if (darkMode === 'disabled') {
			button.style.backgroundColor = '#bdb2b1';
			button.style.color = '#120d15';
			// Actualizează și alte caracteristici aici...
		} else {
			button.style.backgroundColor = '#635d5d';
			button.style.color = 'rgb(222, 177, 210)';
			// Actualizează și alte caracteristici aici...
		}
	});
    
    const buttonElements1 = document.querySelectorAll('.add-task');
	buttonElements1.forEach(button => {
		// Modifică alte caracteristici ale butoanelor în funcție de modul întunecat
		if (darkMode === 'disabled') {
			button.style.backgroundColor = '#bdb2b1';
			button.style.color = '#120d15';
		} else {
			button.style.backgroundColor = '#635d5d';
			button.style.color = 'rgb(222, 177, 210)';
		}
	});

    const promptElement = document.getElementById('prompt');
	const navbarElement = document.querySelector('.navbar');

	if (darkMode === 'enabled') {
		promptElement.style.backgroundColor = '#2b2a2a';
		// promptElement.style.color = '#ffffff';
		navbarElement.style.backgroundColor = '#877d7c';
	} else {
		promptElement.style.backgroundColor = '#bdb2b1';
		// promptElement.style.color = '#111111';
		navbarElement.style.backgroundColor = 'rgb(222, 177, 210)';
	}
}

/*Functii pt tabel*/
function addTask() {

    var promptInput = document.getElementById("prompt").value;

    if (promptInput.trim() !== "") {
        var table = document.getElementById("taskTable");
        var row = table.insertRow(-1);

        // Adaugă celula cu checkbox
        var checkboxCell = row.insertCell(0);
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkboxCell.appendChild(checkbox);

        // Adaugă celula cu textul
        var textCell = row.insertCell(1);
        textCell.innerHTML = promptInput;
        textCell.setAttribute("ondblclick", "editTask(this)");

        // Adaugă celula cu butonul de ștergere
        var deleteCell = row.insertCell(2);
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "X";
        deleteButton.onclick = function() {
            table.deleteRow(row.rowIndex);
        };
        deleteCell.appendChild(deleteButton);

        // Resetarea input-ului după adăugare
        document.getElementById("prompt").value = "";
    }

}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

function filterTasks(filterType) {
    var table = document.getElementById("taskTable");
    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var checkbox = rows[i].getElementsByTagName("input")[0];

        if (filterType === "All" || (filterType === "Active" && !checkbox.checked) || (filterType === "Completed" && checkbox.checked)) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function clearCompleted() {
    var table = document.getElementById("taskTable");
    var rows = table.getElementsByTagName("tr");

    for (var i = rows.length - 1; i >= 0; i--) {
        var checkbox = rows[i].getElementsByTagName("input")[0];

        if (checkbox.checked) {
            table.deleteRow(i);
        }
    }
}

function editTask(cell) {
    // Verificăm dacă cell conține deja un element de tip input
    if (cell.querySelector('input')) {
        return; // Dacă da, nu facem nimic
    }

    // Salvăm textul curent din celulă
    var currentText = cell.innerHTML;

    // Creăm un element input pentru editare
    var inputElement = document.createElement('input');
    inputElement.type = 'text';
    inputElement.value = currentText;

    // Adăugăm elementul input în celulă
    cell.innerHTML = '';
    cell.appendChild(inputElement);

    // Adăugăm un event listener pentru a salva modificările atunci când se apasă Enter
    inputElement.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            var newText = inputElement.value;

            // Salvăm modificările doar dacă noul text nu este gol
            if (newText.trim() !== '') {
                cell.innerHTML = newText;
            } else {
                // Dacă noul text este gol, revenim la textul original
                cell.innerHTML = currentText;
            }
        }
    });

    // Focusăm elementul input pentru a permite editarea imediată
    inputElement.focus();
}
