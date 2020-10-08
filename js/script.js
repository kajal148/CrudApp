//TAKING ALL FIELDS 
const fname = document.getElementById('fname');
const mname = document.getElementById('mname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const dob = document.getElementById('dob');
const country = document.getElementById('country');
const position = document.getElementById('position');

var selectedRow = null;


//Show input error message
function showError(input,message){
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = message;
}


//check for valid email
function isValidEmail(email){
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

function validate(){
	var isValid = true;

	if(fname.value.trim() === ''){ 
		showError(fname,'first name is required')
		isValid = false;
	}

	if(lname.value.trim() === ''){ 
		showError(lname,'last name is required')
		isValid = false;
	}

	if(email.value === ''){ 
		showError(email,'email is required')
		isValid = false;
	}else if(!isValidEmail(email.value)){
		showError(email,'email is invalid')
	}
	

	if(dob.value.trim() === ''){ 
		showError(dob,'dob is required')
		isValid = false;
	}

	if(country.value.trim() === ''){ 
		showError(country,'country is required')
		isValid = false;
	}

	if(position.value.trim() === ''){ 
		showError(position,'position is required')
		isValid = false;
	}

	return isValid;
}

function resetForm() {
    fname.value = "";
    mname.value = "";
    lname.value = "";
    email.value = "";
    dob.value = "";
    country.value = "";
    position.value = "";

    selectedRow = null;
}

function onFormSubmit() {
    if (validate()) {
    	var formData = readFormData();
        if (selectedRow == null){
        	insertNewRecord(formData);
        }else{
            updateRecord(formData);
        }
        resetForm();
    }
}
function readFormData(){
	console.log("Inside Read form Data");
	formData = {};
    formData["fname"] = fname.value;
    formData["mname"] = mname.value;
    formData["lname"] = lname.value;
    formData["email"] = email.value;
    formData["dob"] = dob.value;
    formData["country"] = country.value;
    formData["position"] = position.value;
    return formData;
}

function insertNewRecord(data){
	console.log("Inside Insert form Data");
	var table = document.getElementById('userList').getElementsByTagName('tbody')[0];
	var newRow = table.insertRow(table.length);
	cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fname;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.mname;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.lname;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.email;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.dob;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.country;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.position;
    cell4 = newRow.insertCell(7);
    cell4.innerHTML = `<a class="btn-edit" href="#container" onClick="onEdit(this)">Edit</a>
                       <a class="btn-delete" onClick="onDelete(this)">Delete</a>`;
}

function onEdit(td){
	selectedRow = td.parentElement.parentElement;

	fname.value = selectedRow.cells[0].innerHTML;
	mname.value = selectedRow.cells[1].innerHTML;
	lname.value = selectedRow.cells[2].innerHTML;
	email.value = selectedRow.cells[3].innerHTML;
	dob.value = selectedRow.cells[4].innerHTML;
	country.value = selectedRow.cells[5].innerHTML;
	position.value = selectedRow.cells[6].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fname;
	selectedRow.cells[1].innerHTML = formData.mname;
	selectedRow.cells[2].innerHTML = formData.lname;
	selectedRow.cells[3].innerHTML = formData.email;
	selectedRow.cells[4].innerHTML = formData.dob;
	selectedRow.cells[5].innerHTML = formData.country;
	selectedRow.cells[6].innerHTML = formData.position;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("userList").deleteRow(row.rowIndex);
        resetForm();
    }
}