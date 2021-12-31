const addStepBtns = document.querySelectorAll(".btn[name='Add']")
const stepsCounter = document.getElementById("stepsCounter")
const stepTypesTextContent = {
   "Go to URL" : "Provide the URL to go to: https://example.com/",
   "Check URL" : "Provide the URL where you should be now",
   "Check path" : "Provide the path (trailing part of the URL) or regular expression where you should be now",
   "Find element" : "Provide xpath, css selector or label of the element",
   "Click element" : "Click the element found at the previous step",
   "Find input" : "Provide xpath, css selector or label of the input",
   "Type in" : "Provide data for the input found at the previous step",
   "Find text" : "Provide a string to search",
   "Element does't exist" : "Provide xpath, css selector or label of the element that is not present on the page"
}

document.addEventListener('click', (e) => {
   if (e.target.classList.contains('dropdown-btn')) {
      document.querySelectorAll('.dropdown').forEach(el => {
         if (el != e.target.parentNode.children[1]) el.classList.remove('visible')
      })
      e.target.parentNode.children[1].classList.toggle('visible')
   }
})

document.addEventListener('click', (e) => {
   if (e.target.classList.contains('dropdown-item')) {
      const selectedType = e.target.textContent
      e.target.parentNode.parentNode.parentNode.children[1].setAttribute('placeholder', stepTypesTextContent[selectedType]) //change input placeholder
      e.target.parentNode.parentNode.children[0].textContent = e.target.textContent //change btn text content
      e.target.parentNode.classList.remove('visible') //hide dropdown

      console.log(selectedType)
      if (selectedType == "Click element") {
         e.target.parentNode.parentNode.parentNode.children[1].classList.add('no-edit')
         e.target.parentNode.parentNode.parentNode.children[1].setAttribute('disabled', true)
      } else {
         e.target.parentNode.parentNode.parentNode.children[1].classList.remove('no-edit')
         e.target.parentNode.parentNode.parentNode.children[1].removeAttribute('disabled')
      }
   }
})

addStepBtns.forEach(btn => btn.addEventListener('click', () => {
   hideDropdowns()
   addStep()
   stepsCounter.textContent = Number(stepsCounter.textContent) + 1
}))

function addStep() {
   //create document fragment
   const fragment = document.createDocumentFragment()

   //create step container
   const step = document.createElement('div')
   step.classList.add('step')

   //create order-icon
   const orderIcon = document.createElement('img')
   orderIcon.setAttribute('src', 'https://img.icons8.com/material-outlined/24/000000/menu--v1.png')
   orderIcon.classList.add('order-icon')

   //create  order-number
   const orderNumber = document.createElement('span')
   orderNumber.classList.add('order-num')
   orderNumber.textContent = document.querySelectorAll('.order-num').length + 1

   //create inputs-group
   const inputsGroup = document.createElement('div')
   inputsGroup.classList.add('inputs-group')

   //create dropdown-container
   const dropdownContainer = document.createElement('div')
   dropdownContainer.classList.add('dropdown-container')

   //create dropdown-btn
   const dropdownBtn = document.createElement('button')
   dropdownBtn.classList.add('btn', 'btn-white', 'dropdown-btn')
   dropdownBtn.setAttribute('type', 'button')
   dropdownBtn.textContent = 'Select Type'

   const dropdown = document.createElement('div')
   dropdown.classList.add('dropdown')

   //create dropdownItems and attach them to dropdown
   for (let i = 0; i < 9; i++) {
      const contentArr = ['Go To URL', 'Check URL', 'Check path', 'Find element', 'Click element',
                           'Find input', 'Type in', 'Find text', "Element doesn't exist"]
      const a = document.createElement('a')
      a.classList.add('dropdown-item')
      a.textContent = contentArr[i]
      dropdown.appendChild(a)
   }

   const stepInput = document.createElement('input')
   stepInput.classList.add('step-input')
   stepInput.setAttribute('type', 'text')
   stepInput.setAttribute('placeholder', 'Select Type first')

   //create trashbin icon
   const trashbinIcon = document.createElement('img')
   trashbinIcon.setAttribute('src', 'https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-trash-bin-ui-essential-kmg-design-flat-kmg-design.png')
   trashbinIcon.classList.add('trashbin-icon')
   
   //attachments
   step.appendChild(orderIcon)
   step.appendChild(orderNumber)
   step.appendChild(inputsGroup)
   step.appendChild(trashbinIcon)

   inputsGroup.appendChild(dropdownContainer)
   inputsGroup.appendChild(stepInput)

   dropdownContainer.appendChild(dropdownBtn)
   dropdownContainer.appendChild(dropdown) 
   
   fragment.appendChild(step)
   document.querySelector('.steps').append(fragment)
}


function hideDropdowns() {
   document.querySelectorAll('.dropdown').forEach(el => {
      el.classList.remove('visible')
   })
}