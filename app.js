const studentList = document.querySelector(".student-list");
const modal = document.querySelector(".modal");
const preview = document.querySelector(".preview");
const studentApp = {
  state: {
    students: [
      {
        id: 1,
        firstName: "raja ",
        class: "10th",
        about:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus fugiat atque quasi esse sapiente aut. Cumque dolorum, architecto laboriosam aut nihil dolorem, inventore neque veritatis magnam, amet tempore officiis maxime!",
      },
      {
        id: 2,
        firstName: "mehdi",
        class: "12th",
        about:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Temporibus fugiat atque quasi esse sapiente aut. Cumque dolorum, architecto laboriosam aut nihil dolorem, inventore neque veritatis magnam, amet tempore officiis maxime!",
      },
    ],
    newStudent: {
      firstName: "",
      class: "",
    },
  },
  stopPropagation: (e) => {
    e.stopPropagation();
  },
  handleChange: (e) => {
    const newStudent = {
      [e.target.name]: e.target.value,
    };
    studentApp.state.newStudent = {
      ...studentApp.state.newStudent,
      ...newStudent,
    };
  },
  handleStudent: (e) => {
    e.preventDefault();
    const studentObj = {
      ...studentApp.state.newStudent,
      id:
        studentApp.state.newStudent.id ||
        Number(Math.floor(Math.random() * 100).toFixed(0)),
    };
    if (studentApp.state.newStudent.id) {
      const index = studentApp.state.students.findIndex(
        (x) => x.id === studentApp.state.newStudent.id
      );
      if (index > -1) {
        studentApp.state.students.splice(index, 1, studentObj);
      }
    } else {
      studentApp.state.students.push(studentObj);
    }
    studentApp.closeModal();
    studentApp.render();
  },
  handleStudentForm: (student) => {
    const form = `
      <div class="modal-content" onclick="studentApp.stopPropagation(event)">
      <div class="close" onclick="studentApp.closeModal()">&times</div>
      <h3>${student ? "Update" : "Add"} Student Form</h3>
      <form onkeyup="studentApp.handleChange(event)" onsubmit="studentApp.handleStudent(event)">
      <input class="input" value="${
        student ? student.firstName : ""
      }" name="firstName" placeholder="Enter first name"/>
        <input class="input" value="${
          student ? student.class : ""
        }" name="class" placeholder="Enter class"/>
        <input class="input" name="picture" type="file"/>
        <button type="submit">${student ? "Update" : "Add"}</button>
        </form>
        </div>
        `;
    modal.style.display = "flex";
    modal.innerHTML = form;
  },
  closeModal: () => {
    modal.style.display = "none";
    studentApp.state.newStudent = {
      firstName: "",
      class: "",
    };
  },
  handleUpdate: (id) => {
    const studentState = [...studentApp.state.students];
    const student = studentState.find((x) => x.id === id);
    if (student) {
      studentApp.state.newStudent = student;
      studentApp.handleStudentForm(student);
    }
  },
  handlePreview: (id) => {
    const studentState = [...studentApp.state.students];
    const student = studentState.find((x) => x.id === id);
    if (student) {
      studentApp.state.newStudent = student;
      const previewContent = `
          <div class="preview">
            <p>Name: ${student.firstName}  </p>
            <p>Class: ${student.class}</p>
            <p>About: ${student.about}
          </div>
      `;
      preview.style.border = `1px solid #eee`;
      preview.innerHTML = previewContent;
    }
  },
  render: () => {
    studentList.innerHTML = "";
    studentApp.state.students.forEach((item) => {
      const student = `
            <div style="display: flex">
                <div class="list-item">${item.id}</div>
                <div class="list-item">${item.firstName}</div>
                <div class="list-item">${item.class}</div>
                <div>
                    <button onclick="studentApp.handlePreview(${item.id})">View</button>
                    <button onclick="studentApp.handleUpdate(${item.id})">Edit</button>
                    <button onclick="studentApp.openDeleteModal(${item.id})">Delete</button>
                </div>
            </div>
        `;
      studentList.innerHTML += student;
    });
  },
  init: () => {
    studentApp.render();
  },
};
studentApp.init();



