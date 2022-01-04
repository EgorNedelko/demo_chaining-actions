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
function handleChainMode() {
   isChainMode = isChainMode == false ? true : false
   chainModeBtn.setAttribute('src', isChainMode ? "https://img.icons8.com/material-sharp/24/ffffff/link--v1.png" : "https://img.icons8.com/material-sharp/24/ffffff/broken-link.png")
   chainModeBtn.classList.toggle('btn-green')
}
chainModeBtn.addEventListener('click', handleChainMode)


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

//click on open options common type btn to make that step this type
document.addEventListener('click', (e) => {
   let commonTypesArr = {
            "btn-find-el" : "Find element",
            "btn-click" : "Click element",
            "btn-find-input" : "Find input",
            "btn-typein" : "Type in"
         }

   if (e.target.classList.contains('btn-options')) {
      hideDropdowns()
      const dropdownBtn = e.target.parentNode.parentNode.children[2].children[0].children[0]
      const stepInput = e.target.parentNode.parentNode.children[2].children[1]
      dropdownBtn.textContent = commonTypesArr[e.target.classList[3]]
      stepInput.setAttribute('placeholder', stepTypesTextContent[dropdownBtn.textContent])
      const elemToClose = e.target.parentNode.parentNode
      closeStepOptions(elemToClose)
      checkRelations()
   }
})

//click add-common-step button to add template steps
document.querySelector("input[value='Add Common Step'").addEventListener('click', () => {
   hideDropdowns()
   addStep()
   const steps = [...document.querySelectorAll('.step')]
   const elemToOpen = steps[steps.length-1]
   openStepOptions(elemToOpen)
   assignOrderNumber()
   stepsCounter.textContent = document.querySelector('.steps').children.length
   checkRelations()
})

// click add-step button to add select type steps
document.querySelector("input[value='Add Select Type Step']").addEventListener('click', () => {
   hideDropdowns()
   addStep()
   assignOrderNumber()
   stepsCounter.textContent = document.querySelector('.steps').children.length
   checkRelations()
})

//click plus button to add steps and open the options
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('btn-plus')) {
      let steps = [...document.querySelectorAll('.step')]
      let targetPosition;
      for (let i = 0; i < steps.length; i++) {
         if (steps[i].contains(e.target)) {
            targetPosition = i
            console.log('targetPosition is ', targetPosition)
            console.log('targeted elem is ', steps[i])
         }
      }

      hideDropdowns()
      addStep(targetPosition)
      stepsCounter.textContent = document.querySelector('.steps').children.length

      steps = [...document.querySelectorAll('.step')]
      const elemToOpen = steps[targetPosition+1]
      console.log('elemToOpen', elemToOpen)
      openStepOptions(elemToOpen)
      
      assignOrderNumber()
   }
})

function addStep(targetPosition) {
   console.log('.init addStep(), targetPosition is ', targetPosition)
   if (targetPosition == undefined) console.log('no targetPosition ~ Add Step button')
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
   stepInput.classList.add('step-input')
   stepInput.setAttribute('type', 'text')
   stepInput.setAttribute('placeholder', 'Select Type first')

   //create trashbin icon
   const trashbinIcon = document.createElement('img')
   trashbinIcon.setAttribute('src', 'https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-trash-bin-ui-essential-kmg-design-flat-kmg-design.png')
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
   step.appendChild(plusBtn)
   step.appendChild(order)
   step.appendChild(inputsGroup)
   step.appendChild(trashbinIcon)
   step.appendChild(specificStepButtons)

   order.append(orderNumber)
   order.append(changeOrderIcon)

   inputsGroup.appendChild(dropdownContainer)
   inputsGroup.appendChild(stepInput)

   dropdownContainer.appendChild(dropdownBtn)
   dropdownContainer.appendChild(dropdown) 

   fragment.appendChild(step)
   console.log('created step = ', step)
      // document.querySelector('.steps').append(fragment)

   if (targetPosition == undefined) {
      console.log('no target position ~ end of list')
      document.querySelector('.steps').append(fragment)

   } else {
      let stepsArr = [...document.querySelectorAll('.step')]
      console.log('stepsArr[targetPosition]',stepsArr[targetPosition])
      console.log('stepsArr[targetPosition].nextSibling',stepsArr[targetPosition].nextSibling)
      document.querySelector('.steps').insertBefore(step, stepsArr[targetPosition].nextSibling)
   }


   // for (item in stepsArr) {
   //    console.log(step)
   // }

}

function chainAddStep(selectedType) {
   console.log(selectedType)
   addStep()
   const steps = [...document.querySelectorAll('.step')]
   if (selectedType == "Find element") {
      const elem = steps[steps.length-1].children[2].children[1]
      console.log(elem)
      console.log(selectedType)
      let ind = Object.keys(stepTypesTextContent).indexOf(selectedType)
      let values = Object.values(stepTypesTextContent)
      console.log(values)
      console.log(ind)
      
      elem.setAttribute('placeholder', "Click")
      // elem.setAttribute('placeholder', values[ind])
   } 
   //dont add steps if there already needed step right ahead
}

function hideDropdowns() {
   document.querySelectorAll('.dropdown').forEach(el => {
      el.classList.remove('visible')
   })
}

function openStepOptions(elemToOpen) {
   const plusBtn = elemToOpen.children[0]
   const order = elemToOpen.children[1]
   const commonBtns = elemToOpen.children[4]
   // const trashBin = stepToOpen.children[3]

   elemToOpen.classList.add('options-opened')
   commonBtns.classList.remove('invisible')
   plusBtn.classList.add('invisible')
   order.classList.add('invisible')
   // trashBin.classList.add('invisible')
}

function closeStepOptions(elemToClose) {
   const plusBtn = elemToClose.children[0]
   const order = elemToClose.children[1]
   const dropdownBtn = elemToClose.children[2].children[0].children[0]
   const commonBtns = elemToClose.children[4]
   // const trashBin = stepToClose.children[3]

   elemToClose.classList.remove('options-opened')
   plusBtn.classList.remove('invisible')
   order.classList.remove('invisible')
   dropdownBtn.classList.remove('btn-grey')
   dropdownBtn.classList.add('btn-white')
   commonBtns.classList.add('invisible')
   // trashBin.classList.remove('invisible')
}

//change btns and inputs' text content based on the selected step type, click element details
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('dropdown-item')) {
      const elemToClose = e.target.parentNode.parentNode.parentNode.parentNode
      closeStepOptions(elemToClose)

      const selectedType = e.target.textContent
      const dropdownBtn = e.target.parentNode.parentNode.children[0]
      const commonBtns = e.target.parentNode.parentNode.parentNode.parentNode.children[4]
      const stepInput = e.target.parentNode.parentNode.parentNode.children[1]

      stepInput.setAttribute('placeholder', stepTypesTextContent[selectedType]) //change input placeholder
      dropdownBtn.textContent = e.target.textContent //change btn text content
      e.target.parentNode.classList.remove('visible') //hide dropdown
      dropdownBtn.classList.remove('btn-grey', 'color-blue')
      dropdownBtn.classList.add('btn-white')
      commonBtns.classList.add('invisible')

      //Highlighting the click input grey and making it non-editable
      if (selectedType == "Click element") {
         stepInput.classList.add('no-edit')
         stepInput.setAttribute('disabled', true)
      } else {
         stepInput.classList.remove('no-edit')
         stepInput.removeAttribute('disabled')
      }
      
      
      if ((isChainMode && selectedType == "Find element") || (isChainMode && selectedType == "Find input")) {
         console.log('isChainMode and selectedType is ', selectedType)
         console.log('.init chainAddStep(', selectedType, ')')
         chainAddStep(selectedType)
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
      // console.log(document.querySelectorAll('.order-num')[i])
      document.querySelectorAll('.order-num')[i].textContent = i+1
      // document.querySelectorAll('.order-num')[i].children[1].textContent = i+1
   }
}
