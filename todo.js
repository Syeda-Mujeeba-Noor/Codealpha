const inputbox = document.getElementById('task');
  const listcontainer = document.getElementById('list-container');
 const completedCounter = document.getElementById('completed-counter');
        
        // Initialize the completed tasks count
        let completedCount = 0;

        // Variable to track the current task being edited
        let currentTaskBeingEdited = null;

        function addTask() {
            const task = inputbox.value.trim();
            if (!task) {
                alert('Please enter something');
                return;
            }

            // If in editing mode, update the task instead of adding a new one
            if (currentTaskBeingEdited) {
                const span = currentTaskBeingEdited.querySelector('.span');
                span.textContent = task;
                currentTaskBeingEdited = null;
                inputbox.value = "";
                return;
            }

            // Create a new list item
            const li = document.createElement('li');
            li.innerHTML = `
                <label>
                    <input type='checkbox' class='check'/>
                    <span class='span'>${task}</span>
                </label>
                <button class='delete-button'>Delete</button>
                <button class='edit'>Edit</button>`;
            listcontainer.append(li);
            inputbox.value = "";

            // Get references to the new elements
            const deletebutton = li.querySelector('.delete-button');
            const checkbox = li.querySelector('.check');
            const span = li.querySelector('.span');
            const editbutton = li.querySelector('.edit');

            // Event listener for the delete button
            deletebutton.addEventListener('click', function() {
                if (checkbox.checked) {
                    completedCount--;
                    updateCount();
                }
                li.remove();
                console.log('Task deleted');
            });

            // Event listener for the checkbox
            checkbox.addEventListener('change', function() {
                if (checkbox.checked) {
                    span.style.textDecoration = 'line-through';
                    completedCount++;
                } else {
                    span.style.textDecoration = 'none';
                    completedCount--;
                }
                updateCount();
            });

            // Event listener for the edit button
            editbutton.addEventListener('click', function() {
                inputbox.value = span.textContent;
                currentTaskBeingEdited = li;
            });
        }

        // Function to update the completed tasks count
        function updateCount() {
            completedCounter.textContent = completedCount;
        }