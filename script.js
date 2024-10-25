document.addEventListener("DOMContentLoaded", function() {       //

    const todoInput = document.getElementsByTagName("input")[0];  // Get the first input element (task input box)
    const addButton = document.getElementsByTagName("button")[0]; // Get the first button element (add task button)
    const todoList  = document.getElementsByTagName("ul")[0];     // Get the first ul element (where tasks will be listed)

    // Function to add sub-elements (radio buttons and delete button) inside the task element
    const addSubElements = (liBox, uniqueGroupName) => {
        // Helper function to create a radio button with a label
        const createRadioButton = (value, labelText) => {
            const radioLabel    = document.createElement("label");  // Create a label element
            const radioButton   = document.createElement("input");  // Create a radio input element
            radioButton.type    = "radio";                          // Set input type to radio
            radioButton.name    = uniqueGroupName;                  // Assign unique group name for this task's radio buttons
            radioButton.value   = value;                            // Set the value (todo, in-progress, done)

            if (value === "todo") { radioButton.checked = true};    // Default selection to "todo" status

            // Change task class when the radio button is selected
            radioButton.addEventListener("change", () => {
                const liElement = radioLabel.parentElement.parentElement;   // Get the parent task element (li)
                liElement.classList.remove("todo", "in-progress", "done");  // Remove any existing status classes
                liElement.classList.add(value);                             // Add the selected status class
            });

            radioLabel.appendChild(radioButton);              // Append the radio button to the label
            radioLabel.appendChild(document.createTextNode(labelText)); // Add label text

            return radioLabel; // Return the completed radio button + label
        };

        // Create the 3 radio buttons: To Do, In Progress, Done
        const toDoRadio       = createRadioButton("todo", "To Do");
        const inProgressRadio = createRadioButton("in-progress", "In Progress");
        const doneRadio       = createRadioButton("done", "Done");

        // Create a delete button to remove the task
        const deleteButton    = document.createElement("button");

        deleteButton.innerHTML                 = '<i class="fas fa-trash"></i>'; // Set button icon 
        deleteButton.title                     = "Delete task";                  // Set a tooltip for the button
        deleteButton.style.color               = "white";                        // Set button text color
        deleteButton.style.backgroundColor     = 'red';                          // Set button background color

        // Change background color on mouseover
        deleteButton.addEventListener('mouseover', function() {
            deleteButton.style.backgroundColor = '#300202'; 
        });

        // Reset background color on mouseout
        deleteButton.addEventListener('mouseout', function() {
            deleteButton.style.backgroundColor = 'red'; 
        });

        // Event listener to delete the task when the delete button is clicked
        deleteButton.addEventListener("click", () => {
            const liElement = liBox.parentElement; // Get the task element (li)
            liElement.remove();                    // Remove the task from the DOM
        });

        // Append radio buttons and delete button to the task box
        liBox.appendChild(toDoRadio);
        liBox.appendChild(inProgressRadio);
        liBox.appendChild(doneRadio); 
        liBox.appendChild(deleteButton);
    };

    // Function to add a new task to the list
    const addTask       = (task, taskList) => {
        const liElement = document.createElement("li");   // Create a new list item (li) for the task
        const itemBox   = document.createElement('div');  // Create a div to hold radio buttons and delete button

        itemBox.classList.add('itembox');                 // Add 'itembox' class to the div
        const uniqueGroupName = 'status-' + Date.now();   // Create a unique group name for the radio buttons using timestamp
        addSubElements(itemBox, uniqueGroupName);         // Add radio buttons and delete button to the task box

        liElement.innerText = task;                       // Set the task text inside the list item
        liElement.classList.add("todo");                  // Default task status is "todo"

        liElement.appendChild(itemBox);                   // Append the task box to the list item

        taskList.appendChild(liElement);                  // Add the list item to the task list (ul)
    };

    // Event listener for the Add button to create a new task
    addButton.onclick = function() {
        if (todoInput.value.trim()) {                     // Check if the input value is not empty
            addTask(todoInput.value, todoList);           // Add the task to the list
            todoInput.value = "";                         // Clear the input field after adding the task
        }
    };
});
