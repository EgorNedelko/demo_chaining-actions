const addStepBtns = document.querySelectorAll(".btn[name='Add']")
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
   "Element doesn't exist" : "Provide xpath, css selector or label of the element that is not present on the page"
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
   // step.setAttribute('draggable', true)
   step.setAttribute('data-type', 'Select Type')
   step.setAttribute('data-name', 'visible')

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
   dropdownBtn.classList.add('btn', 'no-type', 'color-blue','dropdown-btn')
   dropdownBtn.setAttribute('type', 'button')
   dropdownBtn.textContent = 'Select Type'

   const dropdown = document.createElement('div')
   dropdown.classList.add('dropdown')

   //create dropdownItems and attach them to dropdown
   for (let i = 1; i < 10; i++) {
      const a = document.createElement('a')
      a.classList.add('dropdown-item')
      a.textContent = Object.keys(stepTypesTextContent)[i]
      if (Object.keys(stepTypesTextContent)[i] == "Find element" || Object.keys(stepTypesTextContent)[i] == "Find input") {
         const chainableIcon = document.createElement('i')
         chainableIcon.classList.add('fas', 'fa-solid', 'fa-link')
         a.append(chainableIcon)
      }
      dropdown.appendChild(a)
   }
   const divider = document.createElement('hr')
   divider.classList.add('dropdown-divider')
   dropdown.appendChild(divider)

   const stepCustomNameContainer = document.createElement('div')
   stepCustomNameContainer.classList.add('custom-name-container')
   const customNameVisibilityIcon = document.createElement('img')
   customNameVisibilityIcon.classList.add('custom-name-visibility-icon', 'name-visible')
   customNameVisibilityIcon.setAttribute('src', "https://img.icons8.com/material-outlined/50/000000/visible--v1.png")

   const stepCustomName = document.createElement('input')
   stepCustomName.classList.add('step-custom-name')
   stepCustomName.classList.add('readonly')
   stepCustomName.setAttribute('type', 'text')
   stepCustomName.setAttribute('placeholder', 'Select Type first')
   stepCustomName.setAttribute('readonly', true)
   // dropdown.appendChild(stepCustomName)
   stepCustomNameContainer.appendChild(stepCustomName)
   stepCustomNameContainer.appendChild(customNameVisibilityIcon)
   dropdown.appendChild(stepCustomNameContainer)

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
      "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/4a90e2/external-magnifying-glass-interface-kiranshastry-lineal-kiranshastry.png",
      "https://img.icons8.com/pastel-glyph/64/4a90e2/click-and-collect--v2.png",
      "https://img.icons8.com/ios/50/4a90e2/text-input-form.png",
      "https://img.icons8.com/material-outlined/24/4a90e2/text.png"
   ]

   let stepIconsClass = [
      "btn-find-el", "btn-click", "btn-find-input", "btn-typein"
   ]
   let stepIconsTooltips = [
      "Find element", "Click element", "Find input", "Type in"
   ]
   for (let i = 0; i < stepIconsSrc.length; i++) {
      const img = document.createElement('img')
      img.classList.add('btn', 'btn-options', 'btn-white', stepIconsClass[i])
      img.setAttribute('src', stepIconsSrc[i])
      img.setAttribute('title', stepIconsTooltips[i])
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

function addRecordBtn(inputsGroup) {
   const recordBtn = document.createElement('button')
   recordBtn.classList.add('btn', 'btn-record')
   recordBtn.setAttribute('type', 'button')
   recordBtn.textContent = 'Record'
   inputsGroup.appendChild(recordBtn)
}


//HELPER FUNCTIONS
function modifyNewStep(elemToClose, selectedType) {
   closeStepOptions(elemToClose)
   hideDropdowns()

   //find and modify new step
   const dropdownBtn = elemToClose.querySelector('.dropdown-btn')
   const stepInput = elemToClose.querySelector('.step-input')
   elemToClose.dataset.type = selectedType
   highlightSelected(elemToClose)
   dropdownBtn.textContent = selectedType
   stepInput.setAttribute('placeholder', stepTypesTextContent[selectedType])

   //remove custom name + style
   elemToClose.querySelector('.step-custom-name').value = ''
   elemToClose.querySelector('.step-custom-name').setAttribute('placeholder', 'Edit custom name')
   elemToClose.querySelector('.step-custom-name').removeAttribute('readonly')
   dropdownBtn.classList.remove('custom-name')
   dropdownBtn.classList.remove('readonly')

   //add record btn to GoToURL step
   if (selectedType == "Go to URL" && localStorage.getItem('recordBtn') == 'true') {
      addRecordBtn(elemToClose.querySelector('.inputs-group'))
   }

   //Highlighting the click input grey and making it non-editable
   handleClickBtnInput(selectedType, elemToClose.querySelector('.step-input'))
}

function addAndModifyChainStep(e, selectedType) {
   let targetPosition;
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

            if (!steps[i+1].children[2].children[0].children[0].classList.contains('no-type')) {
               addStep(targetPosition)
            }
         }

         //Find and modify chain step
         steps = [...document.querySelectorAll('.step')]
         const chainStepElem = steps[i+1]
         const chainStepDropdownBtn = chainStepElem.querySelector('.dropdown-btn')
         const chainStepInput = chainStepElem.querySelector('.step-input')
         chainStepDropdownBtn.textContent = selectedType == "Find element" ? "Click element" : "Type in"
         chainStepInput.setAttribute('placeholder', stepTypesTextContent[chainStepDropdownBtn.textContent])

         //remove custom name + style
         chainStepElem.querySelector('.step-custom-name').value = ''
         chainStepElem.querySelector('.step-custom-name').setAttribute('placeholder', 'Edit custom name')
         chainStepElem.querySelector('.step-custom-name').removeAttribute('readonly')
         chainStepDropdownBtn.classList.remove('custom-name')
         chainStepDropdownBtn.classList.remove('readonly')
         
         selectedType = chainStepDropdownBtn.textContent
         chainStepElem.dataset.type = selectedType
         highlightSelected(chainStepElem)
         closeStepOptions(chainStepElem)
         handleClickBtnInput(selectedType, chainStepInput)
      }
   }
}

function handleClickBtnInput(selectedType, stepInput) {
   if (selectedType == "Click element") {
      stepInput.value = ''
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
   const plusBtn = elemToOpen.querySelector('.btn-plus')
   const commonBtns = elemToOpen.children[4]

   elemToOpen.classList.add('options-opened')
   commonBtns.classList.remove('invisible')
   order.classList.add('invisible')
   plusBtn.classList.add('invisible')
}

function closeStepOptions(elemToClose) {
   const order = elemToClose.children[0]
   const plusBtn = elemToClose.children[1]
   const dropdownBtn = elemToClose.children[2].children[0].children[0]
   const commonBtns = elemToClose.children[4]

   elemToClose.classList.remove('options-opened')
   order.classList.remove('invisible')
   plusBtn.classList.remove('invisible')
   dropdownBtn.classList.remove('no-type')
   dropdownBtn.classList.add('btn-white')
   commonBtns.classList.add('invisible')
}

function hideDropdowns() {
   document.querySelectorAll('.dropdown').forEach(el => {
      el.classList.remove('visible')
   })
   // document.querySelectorAll('.path-dropdown').forEach(el => {
   //    el.classList.remove('visible')
   // })
   // document.querySelectorAll('.actions-dropdown').forEach(el => {
   //    el.classList.remove('visible')
   // })
}

function checkRelations() {
   const steps = [...document.querySelectorAll('.step')]

   for (let i = 0; i < steps.length; i++) {
      if (steps[i-1]) {
         prevStepDropdownBtn = steps[i-1].querySelector('.dropdown-btn').textContent
         prevStepType = steps[i-1].dataset.type
      }
      currentStepDropdownBtn = steps[i].querySelector('.dropdown-btn').textContent
      currentStepType = steps[i].dataset.type
      currentStepInput = steps[i].querySelector('.step-input')
      if (i == 0) {
         if (currentStepType != "Go to URL") {
         steps.forEach(step => {
            step.querySelector('.step-input').classList.add('error')
            step.querySelector('.step-input').setAttribute('placeholder', "Go to URL first.")
         })
         return
         } else {
            steps.forEach(step => {
               step.querySelector('.step-input').classList.remove('error')
               step.querySelector('.step-input').setAttribute('placeholder', stepTypesTextContent[step.dataset.type])
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
                  currentStepInput.classList.remove('error')
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
                  currentStepInput.classList.remove('error')
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

function highlightSelected(step) {
   const dropdownItems = step.querySelectorAll('.dropdown-item')
   dropdownItems.forEach(item => {
      if (item.textContent == step.dataset.type) {
         item.classList.add('selected-type')
      } else {
         item.classList.remove('selected-type')
      }
   })
}

function handleChainMode() {
   isChainMode = isChainMode == false ? true : false
   chainModeBtn.setAttribute('src', isChainMode ? "https://img.icons8.com/material-sharp/24/ffffff/link--v1.png" : "https://img.icons8.com/material-sharp/24/ffffff/broken-link.png")
   chainModeBtn.classList.toggle('btn-green')
   chainModeBtn.classList.toggle('btn-grey')
}

function handleNewStepBtn() {
   const items = document.querySelector('.steps').children
   const arr = []
   for (let i = 0; i < items.length; i++) {
      arr.push(items[0].classList[0])
   }
   if (arr.indexOf('new-step-btn') != arr.length-1) {
      document.querySelector('.steps').removeChild(document.querySelector('.new-step-btn-container'))
      addNewStepBtn()
   }
}

function addNewStepBtn() {
   //create document fragment
   const fragment = document.createDocumentFragment()

   //create step container
   const newStepBtnContainer = document.createElement('div')
   newStepBtnContainer.classList.add('new-step-btn-container', 'transparent')

   // create plus button
   const newStepBtn = document.createElement('input')
   newStepBtn.classList.add('btn', 'btn-white', 'new-step-btn')
   newStepBtn.setAttribute('type', 'button')
   newStepBtn.setAttribute('value', "+")
   newStepBtn.setAttribute('name', "Plus")

   const message = document.createElement('p')
   message.classList.add('message')
   message.textContent = 'Add new step'

   //attachments
   newStepBtnContainer.appendChild(newStepBtn)
   newStepBtnContainer.appendChild(message)
   fragment.appendChild(newStepBtnContainer)
   document.querySelector('.steps').append(fragment)
}



function refreshCore() {
   checkRelations()
   assignOrderNumber()
   handleNewStepBtn()
   document.getElementById('itemCounter').textContent = document.querySelector('.steps').children.length
}

//STORAGE FUNCTIONS
function saveSteps() {
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   const savePrInd = localStorage.getItem('saveProjectInd')
   const saveModInd = localStorage.getItem('saveModuleInd')
   const saveScenInd = localStorage.getItem('saveScenarioInd')
   const stepsList = document.querySelectorAll('.step')

   userProjects[savePrInd].modules[saveModInd].scenarios[saveScenInd].steps = []
   for (let s = 0; s < stepsList.length; s++) {
      stylesList = stepsList[s].className.split(' ').filter(x => x != 'onboarding-focus')
      userProjects[savePrInd].modules[saveModInd].scenarios[saveScenInd].steps[s] = {
         type: stepsList[s].dataset.type,
         value: stepsList[s].querySelector('.step-input').value,
         name: stepsList[s].querySelector('.step-custom-name').value,
         nameVisibility: stepsList[s].dataset.name,
         styles: stylesList
      }
   }

   //Rewrite USERPROJECTS object
   localStorage.removeItem('userProjects')
   localStorage.setItem('userProjects', JSON.stringify(userProjects))
}

function loadSteps() {
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   const prInd = localStorage.getItem('projectInd')
   const modInd = localStorage.getItem('moduleInd')
   const scenInd = localStorage.getItem('scenarioInd')

   //Load steps
   if (userProjects[prInd].modules[modInd].scenarios[scenInd].steps && userProjects[prInd].modules[modInd].scenarios[scenInd].steps.length) {
      
      //Clean the slate if there're custom steps
      document.querySelectorAll('.step').forEach(step => document.querySelector('.steps').removeChild(step))
      
      for (let s = 0; s < userProjects[prInd].modules[modInd].scenarios[scenInd].steps.length; s++) {
         addStep()
         let stepToModify = document.querySelectorAll('.step')[s]

         //Load type, value, placeholder, custom name and name visibility
         stepToModify.dataset.type = userProjects[prInd].modules[modInd].scenarios[scenInd].steps[s].type
         stepToModify.querySelector('.dropdown-btn').textContent = stepToModify.dataset.type
         stepToModify.dataset.name = userProjects[prInd].modules[modInd].scenarios[scenInd].steps[s].nameVisibility
         stepToModify.querySelector('.step-input').value = userProjects[prInd].modules[modInd].scenarios[scenInd].steps[s].value
         stepToModify.querySelector('.step-custom-name').value = userProjects[prInd].modules[modInd].scenarios[scenInd].steps[s].name
         stepToModify.querySelector('.step-input').setAttribute('placeholder', stepTypesTextContent[stepToModify.dataset.type])

         //Add Record Btn
         if (stepToModify.dataset.type == 'Go to URL' && localStorage.getItem('recordBtn') == 'true') {
            addRecordBtn(stepToModify.querySelector('.inputs-group'))
         }

         //Make custom name editable if a step has a type 
         if (stepToModify.dataset.type != "Select Type") {
            stepToModify.querySelector('.step-custom-name').removeAttribute('readonly')
            stepToModify.querySelector('.step-custom-name').classList.remove('readonly')
            stepToModify.querySelector('.step-custom-name').setAttribute('placeholder', 'Edit custom name')
         }

         //Change step name
         if (stepToModify.querySelector('.step-custom-name').value) {
            if (stepToModify.dataset.name == 'visible') {
               stepToModify.querySelector('.dropdown-btn').textContent = stepToModify.querySelector('.step-custom-name').value
               stepToModify.querySelector('.dropdown-btn').classList.add('custom-name')
            } else {
               stepToModify.querySelector('.custom-name-visibility-icon').setAttribute('src', "https://img.icons8.com/material-outlined/50/000000/invisible.png")
            }
         }
         
         //Add styles to steps, dropdown item, btns and inputs
         let stepStyles = []
         for (let style = 0; style < userProjects[prInd].modules[modInd].scenarios[scenInd].steps[s].styles.length; style++) {
            stepStyles.push(userProjects[prInd].modules[modInd].scenarios[scenInd].steps[s].styles[style])
         }
         stepStyles.forEach(style => stepToModify.classList.add(style))

         highlightSelected(stepToModify)

         if (userProjects[prInd].modules[modInd].scenarios[scenInd].steps[s].value) {
            stepToModify.querySelector('.step-input').classList.remove('no-input')
         }
         
         if (stepStyles.includes('options-opened')) {
            openStepOptions(stepToModify)
         }
         if (stepToModify.dataset.type != 'Select Type') {
            stepToModify.querySelector('.dropdown-btn').classList.remove('no-type')
            stepToModify.querySelector('.dropdown-btn').classList.add('btn-white')
         }
      }

   //In case there're no steps, create a default one
   } else {
      addStep()
      document.getElementById('itemCounter').textContent = 1
      document.querySelectorAll('.step')[0].dataset.type = "Go to URL"
      highlightSelected(document.querySelectorAll('.step')[0])
      document.querySelectorAll('.step')[0].querySelector('.dropdown-btn').textContent = "Go to URL"
      document.querySelectorAll('.step')[0].querySelector('.dropdown-btn').classList.remove('no-type')
      document.querySelectorAll('.step')[0].querySelector('.dropdown-btn').classList.add('btn-white')
      document.querySelectorAll('.step')[0].querySelector('.step-input').setAttribute('placeholder', "Provide the URL to go to: https://example.com/")
      document.querySelectorAll('.step')[0].querySelector('.step-custom-name').removeAttribute('readonly')
      document.querySelectorAll('.step')[0].querySelector('.step-custom-name').classList.remove('readonly')
      document.querySelectorAll('.step')[0].querySelector('.step-custom-name').setAttribute('placeholder', 'Edit custom name')
   }

   //Refresh core
   refreshCore()
   
   document.querySelector('.pr-path').textContent = userProjects[prInd].name
   document.querySelector('.mod-path').textContent = userProjects[prInd].modules[modInd].name
   document.querySelector('.scen-path').textContent = userProjects[prInd].modules[modInd].scenarios[scenInd].name
   document.getElementById('itemName').textContent = userProjects[prInd].modules[modInd].scenarios[scenInd].name
}

function storeDestination(targetElem) {
   let userProjects = JSON.parse(localStorage.getItem('userProjects')) 
   let projectInd = localStorage.getItem('projectInd')
   let moduleInd = localStorage.getItem('moduleInd')
   let scenarioInd = localStorage.getItem('scenarioInd')

   //if it's a project
   if (targetElem.parentNode.parentNode.classList.contains('projects-container')) {
      for (let i = 0; i < userProjects.length; i++) {
         if (userProjects[i].name == targetElem.textContent) {
            projectInd = i
         }
      }

   //if it's a module
   } else if (targetElem.parentNode.parentNode.classList.contains('modules-container')) {
      for (let i = 0; i < userProjects[projectInd].modules.length; i++) {
         if (userProjects[projectInd].modules[i].name == targetElem.textContent) {
            moduleInd = i
         }
      }

   //if it's a scenario
   } else if (targetElem.parentNode.parentNode.classList.contains('scenarios-container') ||
               targetElem.classList.contains('scenario-name')) {
      for (let i = 0; i < userProjects[projectInd].modules[moduleInd].scenarios.length; i++) {
         if (userProjects[projectInd].modules[moduleInd].scenarios[i].name == targetElem.textContent) {
            scenarioInd = i
         }
      }
   }
   localStorage.setItem('projectInd', projectInd)
   localStorage.setItem('moduleInd', moduleInd)
   localStorage.setItem('scenarioInd', scenarioInd)
}

function defineCurrentLocation(location) {
   сurrentLocation = location
   localStorage.setItem('currentLocation', location)
   const scenInd = localStorage.getItem('scenarioInd')
   localStorage.setItem('saveScenarioInd', scenInd)
}

function loadTools() {
   if (!localStorage.getItem('advancedTools') || localStorage.getItem('advancedTools') == 'false') {
      document.querySelector('.btn-chain-mode').style.display = 'none'
      document.querySelector(".btn[value='Add Common Step']").style.display = 'none'

      let steps = document.querySelectorAll('.step')
      for (let i = 0; i < steps.length; i++) {
         if (steps[i].classList.contains('options-opened')) {
            steps[i].classList.remove('options-opened')
            steps[i].querySelector('.order').classList.remove('invisible')
            steps[i].querySelector('.btn-plus').classList.remove('invisible')
            steps[i].querySelector('.specific-step-buttons').classList.add('invisible')
         }
      }
   }
}

//AUTO-SAVING
window.addEventListener('beforeunload', saveSteps)

//AUTO-LOADING 
document.addEventListener('DOMContentLoaded', () => {
   defineCurrentLocation('steps')
   loadSteps()
   loadTools()
})

//Click QUICK NAV DROPDOWN ITEM to store destination 
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('path-dropdown-item')) {
      storeDestination(e.target)
   }
})

//Click on the CLEAR ALL BUTTON to clear out CURRENT SCENARIO
document.querySelector("input[value='Clear All']").addEventListener('click', () => {
   let userProjects = JSON.parse(localStorage.getItem('userProjects'))
   const targetProject = localStorage.getItem('targetProject')
   const targetModule = localStorage.getItem('targetModule')
   const targetScenario = localStorage.getItem('targetScenario')
   
   //Locate project
   for (let i = 0; i < userProjects.length; i++) {
      if (userProjects[i].name == targetProject) {

         //Locate module
         if (userProjects[i].modules) {
            for (let j = 0; j < userProjects[i].modules.length; j++) {
               if (userProjects[i].modules[j].name == targetModule) {

                  //Locate the scenario
                  if (userProjects[i].modules[j].scenarios) {
                     for (let y = 0; y < userProjects[i].modules[j].scenarios.length; y++) {
                        if (userProjects[i].modules[j].scenarios[y].name == targetScenario) {

                           //Erase all steps at this destination inside USERPROJECTS object
                           userProjects[i].modules[j].scenarios[y].steps = []
                        }
                     }
                  }
               }
            }
         }
      }
   }

   //Rewrite USERPROJECTS object
   localStorage.removeItem('userProjects')
   localStorage.setItem('userProjects', JSON.stringify(userProjects))
   
   //Clean all current steps and add the default 'Go to URL'
   document.querySelectorAll('.step').forEach(step => document.querySelector('.steps').removeChild(step))
   addStep()
   document.getElementById('itemCounter').textContent = 1
   document.querySelectorAll('.step')[0].dataset.type = "Go to URL"
   highlightSelected(document.querySelectorAll('.step')[0])
   document.querySelectorAll('.step')[0].querySelector('.dropdown-btn').textContent = "Go to URL"
   document.querySelectorAll('.step')[0].querySelector('.dropdown-btn').classList.remove('no-type')
   document.querySelectorAll('.step')[0].querySelector('.dropdown-btn').classList.add('btn-white')
   document.querySelectorAll('.step')[0].querySelector('.step-input').setAttribute('placeholder', "Provide the URL to go to: https://example.com/")
   document.querySelectorAll('.step')[0].querySelector('.step-custom-name').removeAttribute('readonly')
   document.querySelectorAll('.step')[0].querySelector('.step-custom-name').classList.remove('readonly')
   document.querySelectorAll('.step')[0].querySelector('.step-custom-name').setAttribute('placeholder', 'Edit custom name')

   if (localStorage.getItem('recordBtn') == 'true') {
      addRecordBtn(document.querySelectorAll('.step')[0].querySelector('.inputs-group'))
   }

   //Refresh core
   refreshCore()
})


//EVENTS
//click DROPDOWN-ITEMS to change step type
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('dropdown-item')) {
      const elemToClose = e.target.parentNode.parentNode.parentNode.parentNode
      const selectedType = e.target.textContent
      
      modifyNewStep(elemToClose, selectedType)
      
      if ((isChainMode && selectedType == "Find element") || (isChainMode && selectedType == "Find input")) {
         addAndModifyChainStep(e, selectedType)
      }

      //refresh core
      refreshCore()
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
      const elemToClose = e.target.parentNode.parentNode
      const selectedType = commonTypesArr[e.target.classList[3]]

      modifyNewStep(elemToClose, selectedType)

      if ((isChainMode && selectedType == "Find element") || (isChainMode && selectedType == "Find input")) {
         addAndModifyChainStep(e, selectedType)
      }

      //refresh core
      refreshCore()
   }
})

//click CHAINABLE icon to change step type and create CHAIN STEP
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('fa-link')) {
      const elemToClose = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
      const selectedType = e.target.parentNode.textContent
      
      modifyNewStep(elemToClose, selectedType)

      addAndModifyChainStep(e, selectedType)
      
      //refresh core
      refreshCore()
   }
})

//click NEW STEP PLUS BUTTON to add a new step
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('new-step-btn')) {
      hideDropdowns()
      addStep()
      
      //refresh core
      refreshCore()
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

      if (localStorage.getItem('advancedTools') == 'true') {
         steps = [...document.querySelectorAll('.step')]
         const elemToOpen = steps[targetPosition+1]
         openStepOptions(elemToOpen)
      }

      //Refresh core
      refreshCore()
   }
})

//click the DROPDOWN BUTTON for the dropdown to appear 
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('dropdown-btn')) {
      document.querySelectorAll('.dropdown').forEach(el => {
         if (el != e.target.parentNode.children[1]) el.classList.remove('visible')
      })
      e.target.parentNode.querySelector('.dropdown').classList.toggle('visible')
   }
})

//click on TRASHBIN icon to remove a step 
document.addEventListener('click', (e) => {
   if(e.target.classList.contains('trashbin-icon')) {
      e.target.parentNode.remove()
      refreshCore()
   }
})

//click ADD COMMON STEP button to add template steps
document.querySelector("input[value='Add Common Step'").addEventListener('click', () => {
   hideDropdowns()
   addStep()
   const steps = [...document.querySelectorAll('.step')]

   const elemToOpen = steps[steps.length-1]
   openStepOptions(elemToOpen)

   //Refresh core
   refreshCore()
})

//click ADD SELECT TYPE BUTTON to add select type steps
document.querySelector("input[value='Add Step']").addEventListener('click', () => {
   hideDropdowns()
   addStep()
   refreshCore()
})

//coloring INPUTS depending on absence of value
document.addEventListener('input', (e) => {
   const editedInput = e.target
   if (editedInput.value) {
      editedInput.classList.remove('no-input')
   } else {
      editedInput.classList.add('no-input')
   }
})

//Force HOVER on adjacent text field
document.addEventListener('mouseover', (e) => {
   if (e.target.classList.contains('dropdown-btn')) {
      e.target.parentNode.parentNode.children[1].classList.add('hover')
   }  
})
document.addEventListener('mouseout', (e) => {
   if (e.target.classList.contains('dropdown-btn')) {
      e.target.parentNode.parentNode.children[1].classList.remove('hover')
   }  
})

//Edit STEP CUSTOM NAME for it to be displayed in the dropdown button
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('step-custom-name')) {
      const targetStep = e.target.parentNode.parentNode.parentNode.parentNode.parentNode
      const currentStepType = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.type
      e.target.addEventListener('input', (e) => {
         if (!e.target.value) {
            e.target.parentNode.parentNode.parentNode.children[0].textContent = currentStepType
            e.target.parentNode.parentNode.parentNode.children[0].classList.remove('custom-name')
            e.target.parentNode.children[1].setAttribute('src', "https://img.icons8.com/material-outlined/50/000000/visible--v1.png")
            e.target.parentNode.children[1].classList.remove('name-invisible')
            e.target.parentNode.children[1].classList.add('name-visible')
            e.target.parentNode.parentNode.parentNode.parentNode.parentNode.dataset.name = 'visible'
         } else {
            if (targetStep.dataset.name == 'visible') {
               if (!e.target.parentNode.parentNode.parentNode.children[0].classList.contains('custom-name')) {
                  e.target.parentNode.parentNode.parentNode.children[0].classList.add('custom-name')
               }
               e.target.parentNode.parentNode.parentNode.children[0].textContent = e.target.value
            }
         }
      })
   }
})

//DROPDOWNS 
window.addEventListener('click', (e) => {
   if (!e.target.classList.contains('dropdown-btn')) {
      const dropdowns = document.querySelectorAll('.dropdown')
      dropdowns.forEach(menu => {
         if (menu.classList.contains('visible')) {
            if (!e.target.classList.contains('step-custom-name') && !e.target.classList.contains('custom-name-visibility-icon')) {
               menu.classList.remove('visible')
            }
         }
      })
   }
})

//CUSTOM NAME VISIBILITY ICON
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('custom-name-visibility-icon')) {
      const visibilityIcon = e.target
      const dropdownBtn = visibilityIcon.parentNode.parentNode.parentNode.children[0]
      const targetStep = visibilityIcon.parentNode.parentNode.parentNode.parentNode.parentNode
      const stepCustomName = visibilityIcon.parentNode.children[0]

      //display type
      if (targetStep.dataset.name == 'visible' && stepCustomName.value) {
         visibilityIcon.setAttribute('src', "https://img.icons8.com/material-outlined/50/000000/invisible.png")
         visibilityIcon.classList.remove('name-visible')
         visibilityIcon.classList.add('name-invisible')
         targetStep.dataset.name = 'invisible'
         dropdownBtn.textContent = targetStep.dataset.type
         dropdownBtn.classList.toggle('custom-name')
      
      //display name
      } else if (targetStep.dataset.name == 'invisible') {
         visibilityIcon.setAttribute('src', "https://img.icons8.com/material-outlined/50/000000/visible--v1.png")
         visibilityIcon.classList.remove('name-invisible')
         visibilityIcon.classList.add('name-visible')
         targetStep.dataset.name = 'visible'
         dropdownBtn.textContent = stepCustomName.value
         dropdownBtn.classList.toggle('custom-name')
      }
   }
})

//CHAINABLE ICON HOVER
document.addEventListener('mouseover', (e) => {
   if (e.target.classList.contains('fa-link')) {
      let typesList = e.target.parentNode.parentNode.children
      let targetType = e.target.parentNode
      for (let i = 0; i < typesList.length; i++) {
         if (typesList[i] == targetType) {
            typesList[i+1].classList.add('hover')
         }
      }
   }
})
document.addEventListener('mouseout', (e) => {
   if (e.target.classList.contains('fa-link')) {
      let typesList = e.target.parentNode.parentNode.children
      let targetType = e.target.parentNode
      for (let i = 0; i < typesList.length; i++) {
         if (typesList[i] == targetType) {
            typesList[i+1].classList.remove('hover')
         }
      }
   }
})



//NEW STEP BTN HOVER
document.addEventListener('mouseover', (e) => {
   if (e.target.classList.contains('new-step-btn')) {
      document.querySelector('.new-step-btn-container').classList.remove('transparent')
   }
})
document.addEventListener('mouseout', (e) => {
   if (e.target.classList.contains('new-step-btn')) {
      document.querySelector('.new-step-btn-container').classList.add('transparent')
   }
})