var listStudent = []; // create array object save student

$(document).ready(function () {

    // event click to button addStudent
    $('.addStudent').on('click', function () {
        clickAdd();
    });

    // event click to button marksheet
    $('.marksheet').on('click', function () {
        ShowMediumBool();
    });

    // event click to button good
    $('.good').on('click', function () {
        showWellStudent();
    });
});

/**
 * [checkInputString for input Name]
 * @return {Boolean} 
 * [
 * true
 * false
 * ]
 */
function checkInputString() {
    var input = $("#name").val();
    if (input == "") {
        $("#name").after("<small class='form-text text-muted'>Nhập họ tên</small>");
        return false;
    }
    return true;
}

/**
 * [checkInputScore check input Score]
 * @param  {[String]} id [id of input]
 * @return {Boolean} 
 * [
 * true
 * false
 * ]
 */
function checkInputScore(id) {
    var input = parseFloat($(id).val());

    if (input >= 0 && input <= 10) {
        return true;
    }
    else {
        $(id).after("<small class='form-text text-muted'>Nhập điểm kiểu số từ 0 đến 10</small>");
        return false;
    }
}

// Create function for event click to button have class .addStudent
function clickAdd() {
    // Clear all notidication on check required input value
    $("small").remove();

    // Check input
    if (checkInputString() && checkInputScore("#math") && checkInputScore("#chemistry") && checkInputScore("#physical")) {
        AddNewStudent();
        $("input").val("");
    }
}

// Create function Student for object student
function Student(name, math, physical, chemistry) {

    this.name = name;
    this.math = parseFloat(math);
    this.physical = parseFloat(physical);
    this.chemistry = parseFloat(chemistry);

    // Calculate mediumBool, value: float (use function toFixed(x))
    this.mediumBool = ((this.math + this.physical + this.chemistry) / 3).toFixed(1);
}

/** Function add new student to object array listStudent[]
 * @param {[Name]} name [value get from #name: string]
 * @param {[Math]} math [value get from #math: float]
 * @param {[Physical]} physical [value get from #physical: float]
 * @param {[Chemistry]} chemistry [value get from #chemistry: float]
 */
function AddNewStudent() {

    let name = $('#name').val();
    let math = $('#math').val();
    let physical = $('#physical').val();
    let chemistry = $('#chemistry').val();

    // Create object student from function Student(name, math, physical, chemistry)
    var student = new Student(name, math, physical, chemistry);

    // Add object created to object array listStudent[] (use function push(object))
    listStudent.push(student);

    // Update new row on HTML call function addRow(student, oder, mediumBool)
    // Default mediumBool = false: present mediumBool haven't
    addRow(student, listStudent.length, false)
}

// Function Add new row
/**
* @param {[Student]} student [call to object student: object]
* @param {[Order]} order [value default STT on HTML: int]
* @param {[MediumBool]} mediumBool [value mediumBool : boolean]
*/
function addRow(student, order, mediumBool) {

    // Add new row
    let row = $("<tr><\tr>").attr("id", order);
    $("tbody").append(row);

    // Add cell
    $("#" + order).append($("<td><\td>").text(order));
    $("#" + order).append($("<td><\td>").text(student.name));
    $("#" + order).append($("<td><\td>").text(student.math));
    $("#" + order).append($("<td><\td>").text(student.chemistry));
    $("#" + order).append($("<td><\td>").text(student.physical));

    // Check if else for mediumBool after show value for cell mediumBool
    if (mediumBool == true) {
        $("#" + order).append($("<td><\td>").text(student.mediumBool));
    } else {
        $("#" + order).append($("<td><\td>").text("Not yet calculate"));
    }
}

/**
 * [Show mediumBool with color Red]
 */
function ShowMediumBool() {
    // Clear table
    $("tbody").empty();

    // Show
    for (let i = 0; i < listStudent.length; i++) {
        addRow(listStudent[i], i + 1, true);
    }
}

/**
 * [showWellStudent show student have mediumBool >= 8.0]
 */
function showWellStudent() {

    // Find good student and show it
    for (let i = 0; i < listStudent.length; i++) {
        if (listStudent[i].mediumBool >= 8) {
            $("#" + (i + 1)).css({ "color": "red", "font-weight": "700" });
        }
    }
}