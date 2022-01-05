// const stepsBtns = document.querySelectorAll(".step-btns-menu > .btn")
const addStepBtns = document.querySelectorAll(".btn[name='Add']")
const stepsCounter = document.getElementById("stepsCounter")
const chainModeBtn = document.querySelector('.btn-chain-mode')
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
const chainModeIconsUrls = [ "https://img.icons8.com/material-sharp/24/ffffff/broken-link.png",
                             "https://img.icons8.com/material-sharp/24/ffffff/link--v1.png" ]
                             
//Chain mode
let isChainMode = false

chainModeBtn.addEventListener('click', handleChainMode)


//CONSTRUCTOR FUNCTIONS
function addStep(targetPosition) {
   //create document fragment
   const fragment = document.createDocumentFragment()

   //create step container
   const step = document.createElement('div')
   step.classList.add('step')
   step.setAttribute('draggable', true)

   // create plus button
   const plusBtn = document.createElement('input')
   plusBtn.classList.add('btn', 'btn-white', 'btn-plus')
   plusBtn.setAttribute('type', 'button')
   plusBtn.setAttribute('value', "+")
   plusBtn.setAttribute('name', "Plus")

   //create  order
   const order = document.createElement('div')
   order.classList.add('order')
   const orderNumber = document.createElement('span')
   orderNumber.classList.add('order-num')
   orderNumber.textContent = document.querySelectorAll('.order-num').length + 1
   const changeOrderIcon = document.createElement('img')
   changeOrderIcon.classList.add('order-icon')
   changeOrderIcon.setAttribute('src', "https://img.icons8.com/ios-glyphs/30/000000/resize-vertical.png")

   //create inputs-group
   const inputsGroup = document.createElement('div')
   inputsGroup.classList.add('inputs-group')

   //create dropdown-container
   const dropdownContainer = document.createElement('div')
   dropdownContainer.classList.add('dropdown-container')

   //create dropdown-btn
   const dropdownBtn = document.createElement('button')
   dropdownBtn.classList.add('btn', 'btn-grey', 'color-blue','dropdown-btn')
   dropdownBtn.setAttribute('type', 'button')
   dropdownBtn.textContent = 'Select Type'

   const dropdown = document.createElement('div')
   dropdown.classList.add('dropdown')

   //create dropdownItems and attach them to dropdown
   for (let i = 1; i < 10; i++) {
      const a = document.createElement('a')
      a.classList.add('dropdown-item')
      a.textContent = Object.keys(stepTypesTextContent)[i]
      dropdown.appendChild(a)
   }

   const stepInput = document.createElement('input')
   stepInput.classList.add('step-input', 'no-input')
   stepInput.setAttribute('type', 'text')
   stepInput.setAttribute('placeholder', 'Select Type first')

   //create trashbin icon
   const trashbinIcon = document.createElement('img')
   trashbinIcon.setAttribute('src', "https://img.icons8.com/windows/32/4a90e2/trash.png")
   trashbinIcon.classList.add('trashbin-icon')

   //create specific step buttons
   const specificStepButtons = document.createElement('div')
   specificStepButtons.classList.add('specific-step-buttons', 'invisible')
   let stepIconsSrc = [
      "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/ffffff/external-magnifying-glass-interface-kiranshastry-lineal-kiranshastry.png",
      "https://img.icons8.com/pastel-glyph/64/ffffff/click-and-collect--v2.png",
      "https://img.icons8.com/ios/50/ffffff/text-input-form.png",
      "https://img.icons8.com/material-outlined/24/ffffff/text.png"
   ]
   let stepIconsClass = [
      "btn-find-el", "btn-click", "btn-find-input", "btn-typein"
   ]
   for (let i = 0; i < stepIconsSrc.length; i++) {
      const img = document.createElement('img')
      img.classList.add('btn', 'btn-options', 'btn-blue', stepIconsClass[i])
      img.setAttribute('src', stepIconsSrc[i])
      specificStepButtons.append(img)
   }

   //attachments
   step.appendChild(order)
   step.appendChild(plusBtn)
   step.appendChild(inputsGroup)
   step.appendChild(trashbinIcon)
   step.appendChild(specificStepButtons)

   order.append(orderNumber)
   // order.append(changeOrderIcon)

   inputsGroup.appendChild(dropdownContainer)
   inputsGroup.appendChild(stepInput)

   dropdownContainer.appendChild(dropdownBtn)
   dropdownContainer.appendChild(dropdown) 

   fragment.appendChild(step)

   if (targetPosition == undefined) {
      document.querySelector('.steps').append(fragment)

   } else {
      let stepsArr = [...document.querySelectorAll('.step')]
      document.querySelector('.steps').insertBefore(step, stepsArr[targetPosition].nextSibling)
   }

}

//coloring INPUTS depending on absence of value
document.addEventListener('input', (e) => {
   const editedInput = e.target
   if (editedInput.value) {
      editedInput.classList.remove('no-input')
   } else {
      editedInput.classList.add('no-input')
   }
})

// MOUSE EVENTS
///////////////
//click DROPDOWN-ITEMS to change step type
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('dropdown-item')) {
      //classes - event start
      const elemToClose = e.target.parentNode.parentNode.parentNode.parentNode
      closeStepOptions(elemToClose)
      hideDropdowns()

      //find and modify new step
      let selectedType = e.target.textContent
      const dropdownBtn = e.target.parentNode.parentNode.children[0]
      const stepInput = e.target.parentNode.parentNode.parentNode.children[1]
      dropdownBtn.textContent = e.target.textContent
      stepInput.setAttribute('placeholder', stepTypesTextContent[selectedType])

      //Highlighting the click input grey and making it non-editable
      handleClickBtnInput(selectedType, stepInput)
      
      let targetPosition;
      if ((isChainMode && selectedType == "Find element") || (isChainMode && selectedType == "Find input")) {
         let steps = [...document.querySelectorAll('.step')]
         for (let i = 0; i < steps.length; i++) {
            if (steps[i].contains(e.target)) {
               targetPosition = i

               if (!steps[i+1]) {
                  addStep()
               } else {
                  if (selectedType == "Find element" && steps[i+1].children[2].children[0].children[0].textContent == "Click element") {
                     assignOrderNumber()
                     checkRelations()
                     return
                  }
                  addStep(targetPosition)
               }

               //Find and modify chain step
               steps = [...document.querySelectorAll('.step')]
               const chainStepElem = steps[i+1]
               let chainStepDropdownBtn = chainStepElem.children[2].children[0].children[0]
               const chainStepInput = chainStepElem.children[2].children[1]
               chainStepDropdownBtn.textContent = selectedType == "Find element" ? "Click element" : "Type in"
               chainStepInput.setAttribute('placeholder', stepTypesTextContent[chainStepDropdownBtn.textContent])
               selectedType = chainStepDropdownBtn.textContent
               closeStepOptions(chainStepElem)
               handleClickBtnInput(selectedType, chainStepInput)
            }
         }
      }

      //refresh core
      assignOrderNumber()
      checkRelations()
   }
})

//click OPTIONS common type btn to make that step this type
document.addEventListener('click', (e) => {
   let commonTypesArr = {
            "btn-find-el" : "Find element",
            "btn-click" : "Click element",
            "btn-find-input" : "Find input",
            "btn-typein" : "Type in"
         }

   if (e.target.classList.contains('btn-options')) {
      //classes - event start
      const elemToClose = e.target.parentNode.parentNode
      closeStepOptions(elemToClose)
      hideDropdowns()

      //find and modify new step
      const dropdownBtn = e.target.parentNode.parentNode.children[2].children[0].children[0]
      const stepInput = e.target.parentNode.parentNode.children[2].children[1]
      dropdownBtn.textContent = commonTypesArr[e.target.classList[3]]
      stepInput.setAttribute('placeholder', stepTypesTextContent[dropdownBtn.textContent])
      let selectedType = dropdownBtn.textContent

      //Highlighting the click input grey and making it non-editable
      handleClickBtnInput(selectedType, stepInput)

      let targetPosition;
      if ((isChainMode && selectedType == "Find element") || (isChainMode && selectedType == "Find input")) {
         let steps = [...document.querySelectorAll('.step')]
         for (let i = 0; i < steps.length; i++) {
            if (steps[i].contains(e.target)) {
               targetPosition = i

               if (!steps[i+1]) {
                  addStep()
               } else {
                  if (selectedType == "Find element" && steps[i+1].children[2].children[0].children[0].textContent == "Click element") {
                     assignOrderNumber()
                     checkRelations()
                     return
                  }
                  addStep(targetPosition)
               }

               //Find and modify chain step
               steps = [...document.querySelectorAll('.step')]
               const chainStepElem = steps[i+1]
               let chainStepDropdownBtn = chainStepElem.children[2].children[0].children[0]
               const chainStepInput = chainStepElem.children[2].children[1]
               chainStepDropdownBtn.textContent = selectedType == "Find element" ? "Click element" : "Type in"
               chainStepInput.setAttribute('placeholder', stepTypesTextContent[chainStepDropdownBtn.textContent])
               selectedType = chainStepDropdownBtn.textContent
               closeStepOptions(chainStepElem)
               handleClickBtnInput(selectedType, chainStepInput)
            }
         }
      }

      //refresh core
      assignOrderNumber()
      checkRelations()
   }
})

//click PLUS BUTTON to add steps and open the options
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('btn-plus')) {
      let steps = [...document.querySelectorAll('.step')]
      let targetPosition;
      for (let i = 0; i < steps.length; i++) {
         if (steps[i].contains(e.target)) {
            targetPosition = i
         }
      }

      hideDropdowns()
      addStep(targetPosition)
      stepsCounter.textContent = document.querySelector('.steps').children.length

      steps = [...document.querySelectorAll('.step')]
      const elemToOpen = steps[targetPosition+1]
      openStepOptions(elemToOpen)

      assignOrderNumber()
   }
})

//click the DROPDOWN BUTTON for the dropdown to appear 
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('dropdown-btn')) {
      document.querySelectorAll('.dropdown').forEach(el => {
         if (el != e.target.parentNode.children[1]) el.classList.remove('visible')
      })
      e.target.parentNode.children[1].classList.toggle('visible')
   }
})

//click on TRASHBIN icon to remove a step 
document.addEventListener('click', (e) => {
   if(e.target.classList.contains('trashbin-icon')) {
      e.target.parentNode.remove()
      stepsCounter.textContent = document.querySelector('.steps').children.length
      checkRelations()
      assignOrderNumber()
   }
})

//click ADD COMMON STEP button to add template steps
document.querySelector("input[value='Add Common Step'").addEventListener('click', () => {
   hideDropdowns()
   addStep()
   const steps = [...document.querySelectorAll('.step')]

   const elemToOpen = steps[steps.length-1]
   openStepOptions(elemToOpen)


   stepsCounter.textContent = document.querySelector('.steps').children.length
   assignOrderNumber()
   checkRelations()
})

// click ADD SELECT TYPE BUTTON to add select type steps
document.querySelector("input[value='Add Step']").addEventListener('click', () => {
   hideDropdowns()
   addStep()
   assignOrderNumber()
   stepsCounter.textContent = document.querySelector('.steps').children.length
   checkRelations()
})

//HELPER FUNCTIONS
function handleClickBtnInput(selectedType, stepInput) {
   if (selectedType == "Click element") {
      stepInput.classList.add('no-edit')
      stepInput.setAttribute('disabled', true)
   } else {
      stepInput.classList.remove('no-edit')
      stepInput.classList.remove('btn-grey')
      stepInput.removeAttribute('disabled')
   }
}

function openStepOptions(elemToOpen) {
   const order = elemToOpen.children[0]
   const plusBtn = elemToOpen.children[1]
   const commonBtns = elemToOpen.children[4]
   // const trashBin = stepToOpen.children[3]

   elemToOpen.classList.add('options-opened')
   commonBtns.classList.remove('invisible')
   order.classList.add('invisible')
   plusBtn.classList.add('invisible')
   // trashBin.classList.add('invisible')
}

function closeStepOptions(elemToClose) {
   const order = elemToClose.children[0]
   const plusBtn = elemToClose.children[1]
   const dropdownBtn = elemToClose.children[2].children[0].children[0]
   const commonBtns = elemToClose.children[4]
   // const trashBin = stepToClose.children[3]

   elemToClose.classList.remove('options-opened')
   order.classList.remove('invisible')
   plusBtn.classList.remove('invisible')
   dropdownBtn.classList.remove('btn-grey')
   dropdownBtn.classList.add('btn-white')
   commonBtns.classList.add('invisible')
   // trashBin.classList.remove('invisible')
}

function hideDropdowns() {
   document.querySelectorAll('.dropdown').forEach(el => {
      el.classList.remove('visible')
   })
}

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

function handleChainMode() {
   isChainMode = isChainMode == false ? true : false
   chainModeBtn.setAttribute('src', isChainMode ? "https://img.icons8.com/material-sharp/24/ffffff/link--v1.png" : "https://img.icons8.com/material-sharp/24/ffffff/broken-link.png")
   chainModeBtn.classList.toggle('btn-green')
   chainModeBtn.classList.toggle('btn-grey')
}