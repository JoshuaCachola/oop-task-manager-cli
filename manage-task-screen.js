// IMPORTANT! IMPORTANT!
// ---------------------------------------------------------------------
// ALL SCREEN CLASSES HAVE A this.state INSTANCE VARIABLE THAT HOLDS THE
// APPLICATION STATE CREATED IN THE program.js. WHENEVER YOUR CODE NEEDS
// TO INTERACT WITH THE STATE IN ONE OF THE FOLLOWING CLASSES, DO IT
// THROUGH THE this.state INSTANCE VARIABLE.
class ManageTasksScreen {
  constructor(rl, state) {
    this.rl = rl;
    this.state = state;
  }

  printUi() {
    console.clear();
    console.log("********************************************");
    console.log("* TO-DO ITEMS                   (c) 1987   *");
    console.log("********************************************");
    console.log();

    // TODO: Print the incomplete to-do items in the format as
    //       shown in the requirements, 1-based list.
    const toDo = this.state.getToDoList();
    toDo.forEach((task, i) => {
      if (!task.getCompleted() && task instanceof Note) {
        console.log(`${i + 1}. ${task.getText()}`);
      } else if (!task.getCompleted() && task instanceof Task) {
        console.log(`${i + 1}. ${task.getTitle()}`);
      }
    });

    console.log();
    console.log("A. Add a new item");
    console.log("X. Return to main menu");
    console.log();
  }

  show() {
    this.printUi();
    this.rl.question("> ", answer => {
      const index = Number.parseInt(answer) - 1;
      let screen = this;
      if (answer.toUpperCase() === "A") {
        screen = new AddItemScreen(this.rl, this.state);
      } else if (answer.toUpperCase() === "X") {
        screen = new MainScreen(this.rl, this.state);
      } else if (!isNaN(index)) {
        screen = new ItemDetailScreen(this.rl, this.state, index);
      } // } else if (answer.toUpperCase() === "C") {

      // }
      screen.show();
    });
  }
}

exports.ManageTasksScreen = ManageTasksScreen;

// Requires at bottom to prevent circular dependencies problems in node
const { AddItemScreen } = require('./add-item-screen');
const { MainScreen } = require('./main-screen');
const { ItemDetailScreen } = require('./item-detail-screen');
const { Note, Task } = require('./application');
