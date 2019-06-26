let itemCount = 0;
let uncheckedCount = 0;
const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function renderCounters() {
  uncheckedCountSpan.innerHTML = uncheckedCount;
  itemCountSpan.innerHTML = itemCount;
}

function addTodo(todo) {
  itemCount += 1;
  uncheckedCount += 1;

  // Create list item
  const li = document.createElement('li');


  // Create checkbox inside list item
  const input = document.createElement('input');
  input.setAttribute('type', 'checkbox');
  input.addEventListener('click', (event) => {
    if (event.target.checked) {
      uncheckedCount -= 1;
      event.target.parentElement.childNodes[1].setAttribute('class', 'isChecked');
    }
    else {
      uncheckedCount += 1;
      event.target.parentElement.childNodes[1].setAttribute('class', '');
    }
    renderCounters();
  });
  li.appendChild(input);

  // Create text div inside list item
  const div = document.createElement('div');
  div.textContent = todo;
  li.appendChild(div);

  // Create delete button inside list item
  const button = document.createElement('button');
  button.setAttribute('title', 'delete');
  button.textContent = 'delete';
  button.addEventListener('click', () => {
    // delete button callback
    const confirmation = confirm('Are you sure you want to delete this Todo?')
    if (confirmation) {
      if (!li.childNodes[0].checked) {
        // if checkbox was unchecked, decrement unchecked by one
        uncheckedCount -= 1;
      }
      li.parentNode.removeChild(li);
      itemCount -= 1;
      renderCounters();
    }
  });
  li.appendChild(button);

  // Append list item to list
  list.appendChild(li);
  renderCounters();
}

function newTodo() {
  // function called from HTML
  const todo = prompt('Add a Todo');
  if (todo) addTodo(todo);
}
