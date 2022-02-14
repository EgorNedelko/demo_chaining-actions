let tourEnabled_dropdownBtn = true
let tourEnabled_clickElement =  true
let tourEnabled_btnPlus = true
let tourEnabled_btnFindEl = true

const modalsHeaderContent = {
   "Welcome!" : "Welcome to DogQ!",
   "Seg1Step1" : "Structure your testing flow!",
   "Seg1Header" : "Structure and Navigation",
   "Seg2Header" : "Test scenarios"
}

const modalsBodyContent = {
   "Welcome!" : "We would love to show you around - it won't take long.",
   "Seg1Step1" : "The power of zero-code testing automation lies ahead, in test scenarios. But to get there we need to create a project we will be testing and a module that our scenario will be focusing on.", 
   "Seg1Step2" : "At the top of the chain, there's a project. So let's make one.",
   "Seg1Step3" : "Project created! To view its content just click on the project name.",
   "Seg1Step4" : "If you look at the navigation panel above, you can see that we are now inside the selected project where its modules are.",
   "Seg1Step5" : "Now we need a module - a part of the project we will be focusing on.",
   "Seg1Step6" : "Another way to navigate your project is to click on the navigation menu level you're currently on and select an item you want to go to.",
   "Seg1Step7" : "Almost there! Now create an actual test scenario where all the fun stuff happens.",
   "Seg1Step8" : "Lastly, a third way you can access the content of an item is to click on its menu button and select 'Show'.",
   "Seg2Step1" : "Finally! Before us is a test scenario editor. Each step stands for one action, be it finding an element, clicking on it or providing user input for a form.",
   "Seg2Step2" : "DogQ creates a 'Go to URL' step for you. It's present in every test scenario, all you need to do is provide the URL to go to.",
   "Seg2Step3" : "We can start creating our first automated test!",
   "Seg2Step4" : "Each step has two important features - Type and Input. Let's take a look at the types first.",
   "Seg2Step5" : "These are all the actions you can automate with DogQ. Let's set this step to 'Click element'.",
   "Seg2Step6" : "Red-colored input indicates there's a misstep in the scenario. Actions like 'Click element' don't have a real input and require that an element must be found first.",
   "Seg2Step7" : "We can easily fix this by adding a 'Find element' step right before it.",
   "Seg2Step8" : "These four buttons represent the most common step types. To set the newly created step to 'Find element', click on the magnifying glass icon.",
   "Seg2Step9" : "To find an element on a page, you need to give DogQ the element's tagname, CSS class, ID or xpath. Once all the inputs have been filled, their color will become neutral white, indicating the test is ready to go.",
   "Seg2Step10" : "Run your first test when you're ready!"
}

//Constructor functions
function buildModal(header, body) {
   let fragment = document.createDocumentFragment()

   const modal = document.createElement('div')
   modal.classList.add('modal')

   const modalHeader = document.createElement('div')
   modalHeader.classList.add('modal-header')

   const modalHeaderContent = document.createElement('div')
   modalHeaderContent.classList.add('modal-header-content')
   modalHeaderContent.textContent = header

   const closeModalBtn = document.createElement('div')
   closeModalBtn.classList.add('close-modal-btn')
   closeModalBtn.textContent = 'X'

   const modalBody = document.createElement('div')
   modalBody.classList.add('modal-body')
   
   const modalContent = document.createElement('div')
   modalContent.classList.add('modal-content', 'invisible')
   modalContent.textContent = body

   const modalFooter = document.createElement('div')
   modalFooter.classList.add('modal-footer')
   
   const modalNextBtn = document.createElement('div')
   modalNextBtn.classList.add('modal-next-btn')
   modalNextBtn.textContent = "GOT IT!"

   const modalNextBtnIcon = document.createElement('img')
   modalNextBtnIcon.classList.add('modal-next-btn-icon')
   modalNextBtnIcon.setAttribute('src', "https://img.icons8.com/windows/32/ffffff/circled-chevron-right.png")

   modalHeader.appendChild(modalHeaderContent)
   modalHeader.appendChild(closeModalBtn)
   modalBody.appendChild(modalContent)
   modalNextBtn.appendChild(modalNextBtnIcon)
   modalFooter.appendChild(modalNextBtn)

   modal.appendChild(modalHeader)
   modal.appendChild(modalBody)
   modal.appendChild(modalFooter)

   fragment.append(modal)
   return fragment
}

const getElemLeftPosition = targetElem => Math.ceil((targetElem.getBoundingClientRect().x / window.innerWidth) * 100) + 1.5
const getElemTopPosition = targetElem => Math.ceil((targetElem.getBoundingClientRect().y / window.innerHeight) * 100) - 2.5

const getFocusboxWidth = targetElem => Math.ceil(targetElem.getBoundingClientRect().width) + 20
const getFocusboxHeight = targetElem => Math.ceil(targetElem.getBoundingClientRect().height) + 20

function getFocusboxLeftPos(elem) {
   const leftPosition = elem.getBoundingClientRect().x
   return (((leftPosition / window.innerWidth) * 100 ) + (((getFocusboxWidth(elem) / window.innerWidth) * 100) / 2)) - 0.5
}

function getFocusboxTopPos(elem) {
   const topPosition = elem.getBoundingClientRect().y
   return (((topPosition / window.innerHeight) * 100 ) + (((getFocusboxHeight(elem) / window.innerHeight) * 100) / 2)) - 1
}

function modifyModal(mode, orderNum) {
   const modalOrderNum = document.createElement('div')
   modalOrderNum.classList.add('modal-order-num')
   modalOrderNum.textContent = orderNum
   if (mode == 'trim') {
      document.querySelector('.modal').removeChild(document.querySelector('.modal-footer'))
      document.querySelector('.modal-header').insertBefore(modalOrderNum, document.querySelector('.modal-close-btn'))
   } else {
      document.querySelector('.modal-header').insertBefore(modalOrderNum, document.querySelector('.modal-close-btn'))
   }
}

function openTourModal(mode = 'overlay', sized = false, pointed = 'notpointed', top = 40, left = 100, rotation = 45) {
   if (mode == 'nooverlay') {
      setTimeout(()=>{
         document.querySelector('.modal').classList.add('active')
         document.querySelector('.modal-content').classList.remove('invisible')
      }, 1000)
   } else if (mode == 'overlay') {
      setTimeout(()=>{
         overlay.classList.add('active')
         document.querySelector('.modal').classList.add('active')
         document.querySelector('.modal-content').classList.remove('invisible')
      }, 1000)
   }
   if (sized) {
      setTimeout(()=>{
         document.querySelector('.modal').style.maxWidth = "400px"
      }, 1000)
   }
   if (pointed == 'pointed') {
      // const modalPointer = window.getComputedStyle(modal, "::after")
      setTimeout(()=>{
         document.querySelector('.modal').style.setProperty('--pseudoElemOpacity', '1')
      }, 1000)
   }
   if (top) {
      setTimeout(()=>{
         document.querySelector('.modal').style.setProperty('--pseudoElemTop', `${top}%`)
      }, 1000)
   }
   if (left) {
      setTimeout(()=>{
         document.querySelector('.modal').style.setProperty('--pseudoElemLeft', `${left}%`)
      }, 1000)
   }
   if (rotation) {
      setTimeout(()=>{
         document.querySelector('.modal').style.setProperty('--pseudoElemRotation', `${rotation}deg`)
      }, 1000)
   }
}

function closeTourModal(isTimed) {
   if (isTimed) {
      setTimeout(() => {
         document.querySelector('.modal').classList.remove('active')
      }, 300)
      setTimeout(() => {
         overlay.classList.remove('active')
      }, 400)
      setTimeout(() => {
         document.querySelector('.container').removeChild(document.querySelector('.modal'))
      }, 500)
   } else {
      // overlay.classList.remove('active')
      document.querySelector('.modal').classList.remove('active')
      setTimeout(() => { document.querySelector('.container').removeChild(document.querySelector('.modal')) }, 200)
   }
}

function closeFocusbox(isTimed) {
   if (isTimed) {
      setTimeout(() => { document.getElementById('focusbox').classList.remove('active') }, 600)
   } else {
      document.getElementById('focusbox').classList.remove('active')
   }
}

function openFocusbox(isTimed) {
   if (isTimed) {
      setTimeout(() => { document.getElementById('focusbox').classList.add('active') }, 1000)
   } else {
      document.getElementById('focusbox').classList.add('active')
   }
}

function positionDoggy(isTimed, doggyClass, leftPosition, topPosition) {
   let doggy = document.querySelector(`.${doggyClass}`)

   if (isTimed) {
      setTimeout(() => {
         doggy.style.left = `${leftPosition}%`
         doggy.style.top = `${topPosition}%`
      }, 2000)
   } else {
      doggy.style.left = `${leftPosition}%`
      doggy.style.top = `${topPosition}%`
   }
}

function positionModal(isTimed, leftPosition, topPosition) {
   if (isTimed) {
      setTimeout(() => {
         document.querySelector('.modal').style.left = `${leftPosition}%`
         document.querySelector('.modal').style.top = `${topPosition}%`
      }, 600)
   } else {
      document.querySelector('.modal').style.left = `${leftPosition}%`
      document.querySelector('.modal').style.top = `${topPosition}%`
   }
}

function changeModalContent(newContent, newOrderNum) {
   document.querySelector('.modal-content').classList.add('invisible')
   setTimeout(() => { document.querySelector('.modal-content').textContent = newContent }, 400)
   setTimeout(() => { document.querySelector('.modal-content').classList.remove('invisible') }, 425)
   if (newOrderNum) {
      document.querySelector('.modal-order-num').textContent = newOrderNum
   }
}

function positionFocusbox(width, height, left, top) {
   if (width) {
      document.getElementById('focusbox').style.width = `${width}px`
   } 
   if (height) {
      document.getElementById('focusbox').style.height = `${height}px`
   }
   if (left) {
      document.getElementById('focusbox').style.left = `${left}%`
   }
   if (top) {
      document.getElementById('focusbox').style.top = `${top}%`
   }
}

//////////////EVENTS
//PAGE LOADED
document.addEventListener('DOMContentLoaded', () => {
   //PROJECTS PAGE
   if (localStorage.getItem('currentLocation') == 'projects') {
      if (document.querySelectorAll('.project').length == 0) {
         //Create Welcome Modal 
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Welcome!"], modalsBodyContent["Welcome!"]))
         document.querySelector('.modal-next-btn').childNodes[0].textContent = "START QUICK TOUR"
         document.querySelector('.modal-header').removeChild(document.querySelector('.close-modal-btn'))
         positionDoggy(false, 'doggy-head', 40, 38)
         
         //Add SKIP TOUR button
         const skipTourBtn = document.createElement('div')
         skipTourBtn.classList.add('modal-skip-btn')
         skipTourBtn.textContent = "SKIP TOUR"
         document.querySelector('.modal-footer').insertBefore(skipTourBtn, document.querySelector('.modal-next-btn'))
         document.querySelector('.modal-footer').style.justifyContent = "center"
         
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy-head svg').setAttribute('opacity', '1') }, 1250)
      }
   }

   if (localStorage.getItem('tourEnabled') == 'true') {
      //MODULES PAGE
      if (localStorage.getItem('currentLocation') == 'modules') {
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step4"]))
         modifyModal('modify', '4/8')
         const targetElem = document.querySelector('.quick-navigation')
         positionFocusbox(getFocusboxWidth(targetElem), getFocusboxHeight(targetElem), getFocusboxLeftPos(targetElem), getFocusboxTopPos(targetElem))
         
         //Show current tour elements
         openFocusbox(true)
         openTourModal('nooverlay')
      }
   
      //SCENARIOS PAGE
      if (localStorage.getItem('currentLocation') == 'scenarios') {
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step7"]))
         positionModal(false, 50.5, 11.5)
         positionDoggy(false, 'doggy', 61, 11.5)
         modifyModal('trim', '7/8')
         
         //Apply Onboarding focus
         setTimeout(() => { document.querySelector(".btn[value='Add Scenario']").classList.add('onboarding-focus') }, 1000)
         
         //Make doggy and modal visible
         openTourModal('overlay', true, 'pointed', 60, 100, 45)
         setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
      }

      //STEPS PAGE
      if (localStorage.getItem('currentLocation') == 'steps') {
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step1"]))
         modifyModal('modify', '1/10')

         //Activate tour elements
         openTourModal()
      }
   }
})

//NEXT BUTTON
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal-next-btn') || e.target.classList.contains('modal-next-btn-icon')) {
      //PROJECTS PAGE
      if (localStorage.getItem('currentLocation') == 'projects') {
         //In the Welcome Modal
         if (document.querySelector('.modal-header-content').textContent  == "Welcome to DogQ!") {
            //Close prev
            document.querySelector('.doggy-head > svg').setAttribute('opacity', '0')
            closeTourModal(true)
            localStorage.setItem('tourEnabled', 'true')

            //Create next 
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Step1"], modalsBodyContent["Seg1Step1"]))
               modifyModal('modify', '1/8')
            }, 600)
            openTourModal()
         } 

         //In the "Structure your testing flow!"
         if (document.querySelector('.modal-header-content').textContent  == "Structure your testing flow!") {
            //Close prev
            closeTourModal(true)
   
            //Create next
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step2"]))
               modifyModal('trim', '2/8')
            }, 600)
            positionModal(true, 68, 13)
            positionDoggy(false, 'doggy', 78, 11.5)

            //Apply Onboarding focus
            setTimeout(() => { document.querySelector(".btn[value='New']").classList.add('onboarding-focus') }, 1000)
            
            //Make doggy and modal visible
            openTourModal('overlay', true, 'pointed', 60)
            setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
         }
      }

      //MODULES PAGE
      if (localStorage.getItem('currentLocation') == 'modules') {
         //Close prev
         document.querySelector('.doggy-flipped > svg').setAttribute('opacity', '0')
         closeTourModal(true)
         closeFocusbox(true)

         //Create next
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step5"]))
            modifyModal('trim', '5/8')
         }, 600)
         positionModal(true, 55, 12)
         positionDoggy(false, 'doggy', 65, 11.5)

         //Apply onboarding-focus
         setTimeout(() => { document.querySelector(".btn[value='Add Module']").classList.add('onboarding-focus') }, 1000)

         //Make doggy and modal visible
         openTourModal('overlay', true, 'pointed', 60)
         setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
      }

      //STEPS PAGE
      if (localStorage.getItem('currentLocation') == 'steps') {
         if (document.querySelector('.modal-order-num').textContent == '1/10') {
            //Close prev
            closeTourModal(true)
            
            //Create next
            const targetElem = document.querySelector('.step')
            positionFocusbox(getFocusboxWidth(targetElem), getFocusboxHeight(targetElem), getFocusboxLeftPos(targetElem), getFocusboxTopPos(targetElem))

            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step2"]))
               positionModal(false, 40, 50)
               document.querySelector('.modal-next-btn').childNodes[0].textContent = "NEXT"
               modifyModal('modify', '2/10')
            }, 600)
            
            //Activate tour elements
            openFocusbox(true)
            openTourModal('nooverlay', true, 'pointed', -5, 38, -45)
         }

         if (document.querySelector('.modal-order-num').textContent == '2/10') {
            //Close prev
            closeTourModal(true)
            closeFocusbox(true)

            //Create next
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step3"]))
               positionModal(false, 48, 85)
               modifyModal('trim', '3/10')
            }, 600)
            positionDoggy(false, 'doggy-flipped', getElemLeftPosition(document.querySelector(".btn[value='Add Step']")), getElemTopPosition(document.querySelector(".btn[value='Add Step']"))-0.8)

            //Apply onboarding-focus
            setTimeout(() => { document.querySelector(".btn[value='Add Step']").classList.add('onboarding-focus') }, 1000)
            
            //Activate tour elements
            openTourModal('overlay', false, 'pointed', 45, 5, 225)
            setTimeout(() => { document.querySelector('.doggy-flipped svg').setAttribute('opacity', '1') }, 1200)
         }

         if (document.querySelector('.modal-order-num').textContent == '6/10') {
            //Close prev
            closeTourModal(false)
            closeFocusbox(false)

            //Create next
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step7"]))
               positionModal(false, 42, 23)
               modifyModal('trim', '7/10')
            }, 600)
            positionDoggy(false, 'doggy-flipped', getElemLeftPosition(document.querySelector('.btn-plus'))-1.2, getElemTopPosition(document.querySelector('.btn-plus'))-0.8)

            //Apply onboarding-focus
            setTimeout(() => { document.querySelector('.btn-plus').classList.add('onboarding-focus') }, 800)

            //Activate tour elements
            openTourModal('overlay', true, 'pointed', 45, 5, 225)
            setTimeout(() => { document.querySelector('.doggy-flipped svg').setAttribute('opacity', '1') }, 1200)
         }

         if (document.querySelector('.modal-order-num').textContent == '9/10') {
            //Close prev
            closeTourModal(false)
            closeFocusbox(false)

            //Create next
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step10"]))
               positionModal(false, 61, 13.2)
               modifyModal('trim', '10/10')
            }, 600)
            positionDoggy(false, 'doggy', getElemLeftPosition(document.querySelector(".btn[value='Execute']"))-3, getElemTopPosition(document.querySelector(".btn[value='Execute']"))-5.9)
            setTimeout(() => {
               const targetElem = document.querySelector('.steps')
               positionFocusbox(getFocusboxWidth(targetElem), getFocusboxHeight(targetElem), getFocusboxLeftPos(targetElem), getFocusboxTopPos(targetElem))
            }, 700)

            //Apply onboarding-focus
            setTimeout(() => { document.querySelector(".btn[value='Execute']").classList.add('onboarding-focus') }, 800)

            //Activate tour elements
            openTourModal('nooverlay', false, 'pointed', 60, 100, 45)
            openFocusbox(true)
            setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
         }
      }
   }
})

//SAVE BUTTON
document.addEventListener('click', (e) => {
   if (e.target.value == 'Save' && localStorage.getItem('tourEnabled') == 'true') {
      //PROJECTS PAGE
      if (localStorage.getItem('currentLocation') == 'projects') {
         //Close prev
         document.querySelector('.doggy svg').setAttribute('opacity', '0')

         //Create next
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step3"]))
            modifyModal('trim', '3/8')
         }, 600)
         positionModal(true, 30, 43)

         //Apply onboarding-focus
         setTimeout(() => { document.querySelector(".project-name").parentNode.classList.add('onboarding-focus') }, 1000)
         
         //Make doggy and modal visible
         openTourModal('overlay', true, 'pointed', -10, 35, -45)
      }

      //MODULES PAGE
      if (localStorage.getItem('currentLocation') == 'modules') {
         //Close prev
         document.querySelector('.doggy svg').setAttribute('opacity', '0')
   
         //Create new
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step6"]))
            modifyModal('trim', '6/8')
            document.querySelector('.modal').style.maxWidth = "525px"
         }, 600)
         positionModal(true, 54, 10)

         positionDoggy(false, 'doggy-flipped', getElemLeftPosition(document.querySelector('.mod-link')), 16.5)
   
         //Apply onboarding-focus
         setTimeout(() => { document.querySelector('.quick-navigation').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-container').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-text').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-line').classList.add('onboarding-focus') }, 1000)
   
         //Make doggy and modal visible
         openTourModal('overlay', false, 'pointed', 60, 4, -135)
         setTimeout(() => { document.querySelector('.doggy-flipped svg').setAttribute('opacity', '1') }, 1200)
      }

      //SCENARIOS PAGE
      if (localStorage.getItem('currentLocation') == 'scenarios') {
         //Close prev
         document.querySelector('.doggy svg').setAttribute('opacity', '0')
         // document.removeEventListener('mouseover', darkenUponHover, false)
   
         //Create next
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step8"]))
            modifyModal('trim', '8/8')
         }, 600)
         positionModal(true, 72.8, 19)
   
         //Apply onboarding-focus
         setTimeout(() => { document.querySelector('.scenario').classList.add('onboarding-focus') }, 1000)
   
         //Make doggy and modal visible
         openTourModal('overlay', true, 'pointed', 78, 90, 135)
      }
   }
})

//Press ENTER to create the 1st project and continue Onboarding 
window.addEventListener('keydown', (e) => {
   if (e.key == "Enter" && localStorage.getItem('tourEnabled') == 'true') {
      //PROJECTS PAGE
      if (localStorage.getItem('currentLocation') == 'projects') {
         //Close prev
         document.querySelector('.doggy svg').setAttribute('opacity', '0')

         //Create next
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step3"]))
            modifyModal('trim', '3/8')
         }, 600)
         positionModal(true, 30, 43)

         //Apply onboarding-focus
         setTimeout(() => { document.querySelector(".project-name").parentNode.classList.add('onboarding-focus') }, 1000)
         
         //Make doggy and modal visible
         openTourModal('overlay', true, 'pointed', -10, 35, -45)
      }

      //MODULES PAGE
      if (localStorage.getItem('currentLocation') == 'modules') {
         //Close prev
         document.querySelector('.doggy svg').setAttribute('opacity', '0')

         //Create new
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step6"]))
            modifyModal('trim', '6/8')
            document.querySelector('.modal').style.maxWidth = "525px"
         }, 600)
         positionModal(true, 54, 10)

         positionDoggy(false, 'doggy-flipped', getElemLeftPosition(document.querySelector('.mod-link')), 16.5)

         //Apply onboarding-focus
         setTimeout(() => { document.querySelector('.quick-navigation').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-container').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-text').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-line').classList.add('onboarding-focus') }, 1000)

         //Make doggy and modal visible
         openTourModal('overlay', false, 'pointed', 60, 4, -135)
         setTimeout(() => { document.querySelector('.doggy-flipped svg').setAttribute('opacity', '1') }, 1200)
      }

      //SCENARIOS PAGE
      if (localStorage.getItem('currentLocation') == 'scenarios') {
         //Close prev
         document.querySelector('.doggy svg').setAttribute('opacity', '0')
         // document.removeEventListener('mouseover', darkenUponHover, false)

         //Create next
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step8"]))
            modifyModal('trim', '8/8')
         }, 600)
         positionModal(true, 72.8, 19)

         //Apply onboarding-focus
         setTimeout(() => { document.querySelector('.scenario').classList.add('onboarding-focus') }, 1000)

         //Make doggy and modal visible
         openTourModal('overlay', true, 'pointed', 78, 90, 135)
      }
   }
})

//Close Tour Modal
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('close-modal-btn')) {
      closeTourModal(true)
      closeFocusbox(true)
      document.querySelector('.doggy svg').setAttribute('opacity', '0')
      document.querySelector('.doggy-flipped svg').setAttribute('opacity', '0')
      document.querySelector('.doggy-head svg').setAttribute('opacity', '0')
      localStorage.setItem('tourEnabled', 'false')
   }
})

//SKIP TOUR button
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal-skip-btn')) {
      localStorage.setItem('tourEnabled', 'false')
      closeTourModal(true)
      document.querySelector('.doggy-head svg').setAttribute('opacity', '0')
   }
})

//TOUR ELEMENTS EVENTS
document.addEventListener('click', (e) => {
   if (localStorage.getItem('tourEnabled') == 'true') {
      if (e.target.value == 'New') {
         if (document.querySelector('.modal').classList.contains('active')) {
            closeTourModal(false)
         }
         if (document.querySelector("input[value='New']").classList.contains('onboarding-focus')) {
            document.querySelector("input[value='New']").classList.remove('onboarding-focus')
         }
      }

      if (e.target.value == 'Add Module') {
         if (document.querySelector('.modal').classList.contains('active')) {
            closeTourModal(false)
         }
         if (document.querySelector("input[value='Add Module']").classList.contains('onboarding-focus')) {
            document.querySelector("input[value='Add Module']").classList.remove('onboarding-focus')
         }
      }

      if (e.target.value == 'Add Scenario') {
         if (document.querySelector('.modal').classList.contains('active')) {
            closeTourModal(false)
         }
         if (document.querySelector("input[value='Add Scenario']").classList.contains('onboarding-focus')) {
            document.querySelector("input[value='Add Scenario']").classList.remove('onboarding-focus')
         }
      }

      if (e.target.value == 'Add Step') {
         if (document.querySelector('.modal').classList.contains('active')) {
            //Close prev
            document.querySelector('.doggy-flipped svg').setAttribute('opacity', '0')
            closeTourModal(true)

            //Create next
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step4"]))
               positionModal(false, 19, 38)
               modifyModal('trim', '4/10')
            }, 600)

            const targetElem = document.querySelectorAll('.dropdown-btn')[1]
            positionFocusbox(getFocusboxWidth(targetElem), getFocusboxHeight(targetElem), getFocusboxLeftPos(targetElem), getFocusboxTopPos(targetElem))

            //Activate tour elements
            openFocusbox(true)
            openTourModal('nooverlay', true, 'pointed', 40, 100, 45)
         }
         if (document.querySelector("input[value='Add Step']").classList.contains('onboarding-focus')) {
            document.querySelector("input[value='Add Step']").classList.remove('onboarding-focus')
         }
      }

      if (e.target.classList.contains('dropdown-btn')) {
         if (tourEnabled_dropdownBtn) {
            const targetElem = document.querySelectorAll('.dropdown')[1]
            positionFocusbox(getFocusboxWidth(targetElem), getFocusboxHeight(targetElem), getFocusboxLeftPos(targetElem), getFocusboxTopPos(targetElem))
            positionModal(false, 20, 57.4)
            changeModalContent(modalsBodyContent["Seg2Step5"], '5/10')
            tourEnabled_dropdownBtn = false
         }
      }

      if (e.target.textContent == 'Click element') {
         if (tourEnabled_clickElement) {
            //Close prev
            closeFocusbox(false)
            closeTourModal(false)

            //Create next
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step6"]))
               positionModal(false, 57, 55)
               modifyModal('modify', '6/10')
            }, 600)
            setTimeout(() => {
               const targetElem = document.querySelectorAll('.step-input')[1]
               positionFocusbox(getFocusboxWidth(targetElem), getFocusboxHeight(targetElem), getFocusboxLeftPos(targetElem), getFocusboxTopPos(targetElem))
            }, 700)
            openFocusbox(true)
            openTourModal('nooverlay', false, 'pointed', -6, 52, -45)

            tourEnabled_clickElement = false
         }            
      }

      if (e.target.classList.contains('btn-plus')) {
         if (tourEnabled_btnPlus) {
            //Close prev
            document.querySelector('.doggy-flipped svg').setAttribute('opacity', '0')
            closeTourModal(true)
            document.querySelector('.btn-plus').classList.remove('onboarding-focus')

            //Create next
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step8"]))
               positionModal(false, 27, 26.5)
               modifyModal('trim', '8/10')
            }, 600)
            setTimeout(() => {
               const targetElem = document.querySelectorAll('.specific-step-buttons')[1]
               // positionFocusbox(getFocusboxWidth(targetElem), getFocusboxHeight(targetElem), getFocusboxLeftPos(targetElem), getFocusboxTopPos(targetElem))
               positionFocusbox(172, 46, getFocusboxLeftPos(targetElem)+0.8, getFocusboxTopPos(targetElem))
            }, 700)
            openFocusbox(true)
            openTourModal('nooverlay', false, 'pointed', 72, 45, 135)

            tourEnabled_btnPlus = false
         }
      }

      if (e.target.classList.contains('btn-find-el')) {
         if (tourEnabled_btnFindEl) {
            //Close prev
            closeTourModal(true)
            closeFocusbox(false)

            //Create next 
            setTimeout(() => {
               document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step9"]))
               positionModal(false, 50, 55)
               modifyModal('modify', '9/10')
            }, 600)
            setTimeout(() => {
               const targetElem = document.querySelectorAll('.step-input')[1]
               positionFocusbox(getFocusboxWidth(targetElem), getFocusboxHeight(targetElem), getFocusboxLeftPos(targetElem), getFocusboxTopPos(targetElem))
            }, 700)
            openFocusbox(true)
            openTourModal('nooverlay', false, 'pointed', -6, 52, -45)

            tourEnabled_btnFindEl = false
         }
      }

      if (e.target.value == 'Execute') {
         document.querySelector('.doggy svg').setAttribute('opacity', '0')
         closeTourModal(true)
         closeFocusbox(true)
         localStorage.setItem('tourEnabled', 'false')
      }
   }
})
