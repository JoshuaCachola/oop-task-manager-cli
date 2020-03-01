// This is the State class that should manage the
// entire state of your application.

class State {
  // Called from program.js to create an instance
  // of the application state.
  constructor(filePath, fs) {
    this.filePath = filePath;
    this.fs = fs;
    // TODO: Any other initialization that you need.
    this.categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
    this.toDoList = [];
    this.finishedTasks = [];
  }

  // Called from program.js if there is JSON saved
  // in the file pointed to by the value in
  // this.filePath.
  loadFromJson(data) {
    // TODO: Load this object from the data
    const parsedState = JSON.parse(data);
    parsedState.categories.forEach((category, index) => {
      this.setCategory(category, index);
    });
    parsedState.toDoList.forEach(todo => {
      if (todo.text) {
        this.pushTodo(new Note(todo.text, todo.completed));
      } else if (todo.title) {
        this.pushTodo(new Task(todo.title, todo.categoryIndex, todo.description, todo.completed));
      }
    });
  }

  // TODO: Your code, here, to manage the state
  getCategories() {
    return this.categories;
  }

  getToDoList() {
    return this.toDoList;
  }

  pushTodo(todo) {
    this.toDoList.push(todo);
  }

  setCategory(newCategoryName, categoryIndex) {
    this.categories[categoryIndex] = newCategoryName;
  }

  saveToJSON(state) {
    const savedState = JSON.stringify(state);
    this.fs.writeFile(this.filePath, savedState, (err) => {
      if (err) throw err;
    });
  }

  moveToFinished(index) {
    this.finishedTasks.push(this.toDoList.splice(index, 1)[0]);
  }

}

// TODO: All of your other classes, here.
class Task {
  constructor(title, categoryIndex, description, completed) {
    this.title = title;
    this.categoryIndex = categoryIndex;
    this.description = description;
    this.completed = completed;
  }

  getTitle() {
    return this.title;
  }

  getCategoryIndex() {
    return this.categoryIndex;
  }

  getDescription() {
    return this.description;
  }

  toggleCompleted() {
    this.completed = true;
  }

  getCompleted() {
    return this.completed;
  }
}

class Note {
  constructor(text, completed) {
    this.text = text;
    this.completed = completed;
  }

  getText() {
    return this.text;
  }

  toggleCompleted() {
    this.completed = true;
  }

  getCompleted() {
    return this.completed;
  }
}

// TODO: Export your classes, here, if necessary.
module.exports = {
  State,
  Task,
  Note
};
