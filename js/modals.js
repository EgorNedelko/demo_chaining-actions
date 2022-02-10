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
   "Seg1Step7" : "Almost there! Now we need an actual test scenario where all the fun stuff happens.",
   "Seg1Step8" : "Lastly, a third way you can access the content of an item is to click on its menu button and select 'Show'.",
   "Seg2Step1" : "Finally! Before us is a test scenario. Each step stands for one action, be it finding an element, clicking on it or providing user input for a form.",
   "Seg2Step2" : "Having added a step, we need to select what type it's going to be."
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

function modifyModal(mode, orderNum) {
   const modalOrderNum = document.createElement('div')
   modalOrderNum.classList.add('modal-order-num')
   modalOrderNum.textContent = orderNum
   if (mode == "trim") {
      document.querySelector('.modal-footer').removeChild(document.querySelector('.modal-next-btn'))
      document.querySelector('.modal-footer').append(modalOrderNum)
   } else {
      document.querySelector('.modal-footer').insertBefore(modalOrderNum, document.querySelector('.modal-next-btn'))
   }
}

function openTourModal(mode = 'overlay', sized = false) {
   if (sized) {
      setTimeout(()=>{
         document.querySelector('.modal').style.maxWidth = "400px"
      }, 1000)
   }
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

function openFocusbox(isTimed) {
   if (isTimed) {
      setTimeout(() => { document.getElementById('focusbox').classList.add('active') }, 400)
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

function positionFocusbox(width, height, left, top) {
   document.getElementById('focusbox').style.width = `${width}px`
   document.getElementById('focusbox').style.height = `${height}px`
   document.getElementById('focusbox').style.left = `${left}%`
   document.getElementById('focusbox').style.top = `${top}%`
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
         positionDoggy(false, 'doggy-head', 40, 37)
         
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
         positionModal(false, 35, 38)
         positionDoggy(false, 'doggy-flipped', 26, 16.5)
   
         //Apply onboarding-focus
         setTimeout(() => { document.querySelector('.quick-navigation').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-container').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-text').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.scen-link').style.color = "grey" }, 1000)
         setTimeout(() => { document.querySelector('.path-line').classList.add('onboarding-focus') }, 1000)
   
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy-flipped svg').setAttribute('opacity', '1') }, 1250)
      }
   
      //SCENARIOS PAGE
      if (localStorage.getItem('currentLocation') == 'scenarios') {
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step7"]))
         positionModal(false, 40, 23)
         positionDoggy(false, 'doggy', 61, 11.5)
         modifyModal('trim', '7/8')
         
         //Apply Onboarding focus
         setTimeout(() => { document.querySelector(".btn[value='Add Scenario']").classList.add('onboarding-focus') }, 1000)
         
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
      }

      //STEPS PAGE
      if (localStorage.getItem('currentLocation') == 'steps') {
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step1"]))
         positionDoggy(false, 'doggy-head', 40, 35.5)
         modifyModal('modify', '1/10')

         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy-head svg').setAttribute('opacity', '1') }, 1250)
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
            positionModal(true, 62, 20)
            positionDoggy(false, 'doggy', 78, 11.5)

            //Apply Onboarding focus
            setTimeout(() => { document.querySelector(".btn[value='New']").classList.add('onboarding-focus') }, 1000)
            
            //Make doggy and modal visible
            openTourModal()
            setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
         }
      }

      //MODULES PAGE
      if (localStorage.getItem('currentLocation') == 'modules') {
         //Close prev
         document.querySelector('.doggy-flipped > svg').setAttribute('opacity', '0')
         closeTourModal(true)

         //Remove Onboarding focus
         setTimeout(() => { document.querySelector('.quick-navigation').classList.remove('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-container').classList.remove('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-text').classList.remove('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-line').classList.remove('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.scen-link').removeAttribute('style') }, 500)

         //Create next
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step5"]))
            modifyModal('trim', '5/8')
         }, 600)
         positionModal(true, 46, 22)
         positionDoggy(false, 'doggy', 64, 11.5)

         //Apply onboarding-focus
         setTimeout(() => { document.querySelector(".btn[value='Add Module']").classList.add('onboarding-focus') }, 1000)

         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 1200)
      }

      //STEPS PAGE
      if (localStorage.getItem('currentLocation') == 'steps') {
         //Close prev
         document.querySelector('.doggy-head > svg').setAttribute('opacity', '0')
         closeTourModal(true)
         
         //Create next
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg2Header"], modalsBodyContent["Seg2Step2"]))
            modifyModal('trim', '2/10')
         }, 600)
         positionFocusbox(185, 38, 36.5, 32)
         positionDoggy(false, 'doggy', 64, 11.5)
         positionModal(true, 20, 34)
         openTourModal('nooverlay', true)
         openFocusbox(true)
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
         positionModal(true, 30, 46)
         positionDoggy(false, 'doggy-flipped', 26, 27.3)

         //Apply onboarding-focus
         setTimeout(() => { document.querySelector(".project-name").parentNode.classList.add('onboarding-focus') }, 1000)
         
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy-flipped svg').setAttribute('opacity', '1') }, 1200)
      }

      //MODULES PAGE
      if (localStorage.getItem('currentLocation') == 'modules') {
         //Close prev
         document.querySelector('.doggy svg').setAttribute('opacity', '0')
   
         //Create new
         setTimeout(() => {
            document.querySelector('.container').append(buildModal(modalsHeaderContent["Seg1Header"], modalsBodyContent["Seg1Step6"]))
            modifyModal('trim', '6/8')
         }, 600)
         positionModal(true, 45, 41)
         positionDoggy(false, 'doggy-flipped', 36, 16.5)
   
         //Apply onboarding-focus
         setTimeout(() => { document.querySelector('.quick-navigation').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-container').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.path-item-text').classList.add('onboarding-focus') }, 1000)
         setTimeout(() => { document.querySelector('.scen-link').style.color = "grey" }, 1000)
         setTimeout(() => { document.querySelector('.path-line').classList.add('onboarding-focus') }, 1000)
   
         //Make doggy and modal visible
         openTourModal()
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
         positionModal(true, 58, 49)
         positionDoggy(true, 'doggy', 79, 21.5)
   
         //Apply onboarding-focus
         setTimeout(() => { document.querySelector('.scenario').classList.add('onboarding-focus') }, 1000)
   
         //Make doggy and modal visible
         openTourModal()
         setTimeout(() => { document.querySelector('.doggy svg').setAttribute('opacity', '1') }, 2000)
      }
   }
})

//Press ENTER to create the 1st project and continue Onboarding 
// window.addEventListener('keydown', (e) => { })

//Close Tour Modal
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('close-modal-btn')) {
      closeTourModal(true)
      if (localStorage.getItem('currentLocation') == 'modules') {
         document.querySelector('.scen-link').removeAttribute('style')
      }
   }
})

//SKIP TOUR button
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('modal-skip-btn')) {
      localStorage.setItem('tourEnabled','false')
      closeTourModal(true)
      document.querySelector('.doggy-head svg').setAttribute('opacity', '0')
   }
})

//TOUR ELEMENTS EVENTS
if (document.querySelector("input[value='New']")) {
   document.querySelector("input[value='New']").addEventListener('click', () => {
      if (document.querySelector('.modal').classList.contains('active')) {
         closeTourModal(false)
      }
      if (document.querySelector("input[value='New']").classList.contains('onboarding-focus')) {
         document.querySelector("input[value='New']").classList.remove('onboarding-focus')
      }
   })
}

if (document.querySelector("input[value='Add Module']")) {
   document.querySelector("input[value='Add Module']").addEventListener('click', () => {
      if (document.querySelector('.modal').classList.contains('active')) {
         closeTourModal(false)
      }
      if (document.querySelector("input[value='Add Module']").classList.contains('onboarding-focus')) {
         document.querySelector("input[value='Add Module']").classList.remove('onboarding-focus')
      }
   })
}

if (document.querySelector("input[value='Add Scenario']")) {
   document.querySelector("input[value='Add Scenario']").addEventListener('click', () => {
      if (document.querySelector('.modal').classList.contains('active')) {
         closeTourModal(false)
      }
      if (document.querySelector("input[value='Add Scenario']").classList.contains('onboarding-focus')) {
         document.querySelector("input[value='Add Scenario']").classList.remove('onboarding-focus')
      }
   })
}
