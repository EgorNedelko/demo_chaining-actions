// let draggables = document.querySelectorAll(".step[draggable='true']")
// draggables.forEach(draggables => {
//    draggables.remove
//    draggables.addEventListener('dragstart', () => {
//       console.log('drag start')
//    })
// })

const stepsBtns = document.querySelectorAll(".step-btns-menu > .btn")
const addStepBtns = document.querySelectorAll(".btn[name='Add']")
const stepsCounter = document.getElementById("stepsCounter")
const stepTypesTextContent = {
   "Select Type" : "Select Type first",
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

//click the dropdown button for the dropdown to appear 
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('dropdown-btn')) {
      document.querySelectorAll('.dropdown').forEach(el => {
         if (el != e.target.parentNode.children[1]) el.classList.remove('visible')
      })
      e.target.parentNode.children[1].classList.toggle('visible')
   }
})

//click on trashbin icon to remove a step 
document.addEventListener('click', (e) => {
   if(e.target.classList.contains('trashbin-icon')) {
      e.target.parentNode.remove()
      stepsCounter.textContent = document.querySelector('.steps').children.length
      checkRelations()
      assignOrderNumber()
   }
})

//common step types as buttons
stepsBtns.forEach(stepBtn => {
   let commonTypesArr = {
      "btn-find-el" : "Find element",
      "btn-click" : "Click element",
      "btn-find-input" : "Find input",
      "btn-typein" : "Type in"
   } 
   stepBtn.addEventListener('click', (e) => {
      const btnClicked = commonTypesArr[e.target.classList[2]]
      addStep()
      const steps = [...document.querySelectorAll('.step')]
      steps[steps.length-1].children[2].children[0].children[0].textContent = btnClicked
      steps[steps.length-1].children[2].children[1].setAttribute('placeholder', stepTypesTextContent[btnClicked])
      checkRelations()
      assignOrderNumber()
   })
})

//click add-step buttons to add steps
addStepBtns.forEach(btn => btn.addEventListener('click', () => {
   hideDropdowns()
   addStep()
   assignOrderNumber()

   // draggables = document.querySelectorAll(".step[draggable='true']")
   // draggables.forEach(draggables => {
   //    draggables.remove
   //    draggables.addEventListener('dragstart', () => {
   //       console.log('drag start')
   //    })
   // })

   stepsCounter.textContent = document.querySelector('.steps').children.length
   checkRelations()
}))

function addStep() {
   //create document fragment
   const fragment = document.createDocumentFragment()

   //create step container
   const step = document.createElement('div')
   step.classList.add('step')
   step.setAttribute('draggable', true)
   // step.addEventListener('dragstart', () => {
   //    step.classList.add('dragging')
   // })
   // step.addEventListener('dragend', () => {
   //    step.classList.remove('dragging')
   // })

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
   for (let i = 1; i < 10; i++) {
      const contentArr = ['Go to URL', 'Check URL', 'Check path', 'Find element', 'Click element',
                           'Find input', 'Type in', 'Find text', "Element doesn't exist"]
      const a = document.createElement('a')
      a.classList.add('dropdown-item')
      // a.textContent = contentArr[i]
      a.textContent = Object.keys(stepTypesTextContent)[i]
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

//change btns and inputs' text content based on the selected step type, click element details
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('dropdown-item')) {
      const selectedType = e.target.textContent
      const dropdownBtn = e.target.parentNode.parentNode.children[0]
      const stepInput = e.target.parentNode.parentNode.parentNode.children[1]

      stepInput.setAttribute('placeholder', stepTypesTextContent[selectedType]) //change input placeholder
      dropdownBtn.textContent = e.target.textContent //change btn text content
      e.target.parentNode.classList.remove('visible') //hide dropdown

      //Highlighting the click input grey and making it non-editable
      if (selectedType == "Click element") {
         stepInput.classList.add('no-edit')
         stepInput.setAttribute('disabled', true)
      } else {
         stepInput.classList.remove('no-edit')
         stepInput.removeAttribute('disabled')
      }

      checkRelations()

   }
})

function checkRelations() {
   const steps = [...document.querySelectorAll('.step')]

   for (let i = 0; i < steps.length; i++) {
      if (steps[i-1]) prevStepType = steps[i-1].children[2].children[0].children[0].textContent
      currentStepType = steps[i].children[2].children[0].children[0].textContent
      currentStepInput = steps[i].children[2].children[1]
      if (i == 0) {
         if (currentStepType != "Go to URL") {
         steps.forEach(step => {
            step.children[2].children[1].classList.add('error')
            step.children[2].children[1].setAttribute('placeholder', "Go to URL first.")
         })
         return
         } else {
            steps.forEach(step => {
               step.children[2].children[1].classList.remove('error')
               step.children[2].children[1].setAttribute('placeholder', stepTypesTextContent[step.children[2].children[0].children[0].textContent])
            })
         }
      }

      switch (currentStepType) {
         case "Click element":
            if (!steps[i-1] || prevStepType != "Find element") {
               currentStepInput.classList.add('error')
               currentStepInput.setAttribute('placeholder', 'Find element first')
            } else {
               if (currentStepInput.classList.contains('error')) {
                  currentStepInput.classList.error('error')
               }
               currentStepInput.setAttribute('placeholder', stepTypesTextContent[currentStepType])
            }
            break;

         case "Type in":
            if (!steps[i-1] || prevStepType != "Find input") {
               currentStepInput.classList.add('error')
               currentStepInput.setAttribute('placeholder', 'Find input first')
            } else {
               if (currentStepInput.classList.contains('error')) {
                  currentStepInput.classList.error('error')
               }
               currentStepInput.setAttribute('placeholder', stepTypesTextContent[currentStepType])
            }
            break;
      }
   }
}

function assignOrderNumber() {
   const steps = [...document.querySelectorAll('.step')]

   for (let i = 0; i < steps.length; i++) {
      document.querySelectorAll('.order-num')[i].textContent = i+1
   }
}