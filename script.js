//top-btns
const addStepBtns = document.querySelectorAll(".btn[name='Add']")

//select-type-btns
const selectTypeBtn = document.getElementById('selectTypeBtn')
const dropdownMenu = document.getElementById('dropdownMenu')
const dropdownItems = document.querySelectorAll('.dropdown-item-link')

selectTypeBtn.addEventListener('click', () => {
   dropdownMenu.classList.toggle('visible')
})

addStepBtns.forEach(btn => btn.addEventListener('click', addStep))

//there are 9 step types
// dropdownItems.forEach(item => item.addEventListener('click', () => {

// }))


function addStep() {
   //create document fragment
   const newStep = document.createDocumentFragment()

   //create step container
   const step = document.createElement('div')
   step.classList.add('step')

   //create context-menu-icon
   const contextMenuIcon = document.createElement('img')
   contextMenuIcon.setAttribute('src', 'https://img.icons8.com/material-outlined/24/000000/menu--v1.png')
   contextMenuIcon.classList.add('context-menu-icon')

   //create  order-number
   const orderNumber = document.createElement('span')
   orderNumber.classList.add('order-num')
   orderNumber.textContent = document.querySelectorAll('.order-num').length + 1

   //create select-type-container
   const selectTypeContainer = document.createElement('div')
   selectTypeContainer.classList.add('select-type-container')

   const selectTypeMenu = document.createElement('div')
   selectTypeMenu.classList.add('select-type-menu')

   const selectTypeButton = document.createElement('button')
   selectTypeButton.classList.add('btn', 'btn-white', 'select-type-btn')
   selectTypeButton.setAttribute('id', 'selectTypeBtn2')
   selectTypeButton.setAttribute('type', 'button')
   selectTypeButton.textContent = 'Select Type'

   const dropdownMenu = document.createElement('div')
   dropdownMenu.classList.add('select-type-dropdown')
   dropdownMenu.setAttribute('id', 'dropdownMenu')

   const dropdownList = document.createElement('ul')
   dropdownList.classList.add('dropdown-list')

   for (let i = 0; i < 9; i++) {
      const li = document.createElement('li')
      li.classList.add('dropdown-item')
      const a = document.createElement('a')
      a.classList.add('dropdown-item-link')
      li.appendChild(a)
      dropdownList.appendChild(li) //attaching li>a to ul
   }

   const stepTypeInput = document.createElement('input')
   stepTypeInput.classList.add('step-type-input')
   stepTypeInput.setAttribute('type', 'text')
   stepTypeInput.setAttribute('placeholder', 'Select Type first')

   //create trash-bin icon
   const trashBinIcon = document.createElement('img')
   trashBinIcon.setAttribute('src', 'https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-trash-bin-ui-essential-kmg-design-flat-kmg-design.png')
   trashBinIcon.classList.add('trash-bin-icon')
   
   //attachments
   step.appendChild(contextMenuIcon) //attaching order-icon to the step
   step.appendChild(orderNumber) //attaching order-number to the step
   step.appendChild(selectTypeContainer) //attaching inputs group to the step
   step.appendChild(trashBinIcon) //attaching trashbin icon to the step

   selectTypeContainer.appendChild(selectTypeMenu) //attaching selectTypeMenu container to inputsGroup
   selectTypeContainer.appendChild(stepTypeInput) //attaching input-text to select-type-inputs
   selectTypeMenu.appendChild(selectTypeButton) //attaching selectTypeBtn to the 
   selectTypeMenu.appendChild(dropdownMenu) 
   dropdownMenu.appendChild(dropdownList) //attaching ul with all the li>a's to the 
   
   newStep.appendChild(step) //attaching container for all to the fragment
   document.querySelector('.steps').append(newStep) //attaching the frament to the page
}