const modalsHeaderContent = {
   "Welcome!" : "Welcome to DogQ!"
}

const modalsBodyContent = {
   "Welcome!" : "The power of zero-code testing automation lies ahead, in test scenarios. But first we need to create a project we are going to be testing.",
   "ExplainMod" : "Great! We are one step closer to automating zero-code tests. Now we need a module - a part of the project we're focusing on."
}

//Constructor function
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

   modalHeader.appendChild(modalHeaderContent)
   modalHeader.appendChild(closeModalBtn)
   modalBody.appendChild(modalContent)

   modal.appendChild(modalHeader)
   modal.appendChild(modalBody)

   fragment.append(modal)
   return fragment
}

//Helper funcitons
// function changeCurrentLocation(newValue) {
//    localStorage.removeItem('currentLocation')
//    localStorage.setItem('currentLocation', newValue)
// }

function openTourModal(content) {
   overlay.classList.add('active')
   document.querySelector('.container').append(buildModal(content))
   setTimeout(() => {
      document.querySelector('.modal').classList.add('active')
      document.querySelector('.modal-content').classList.remove('invisible')
   }, 500)
}

function closeTourModal() {
   document.querySelector('.modal').classList.remove('active')
   setTimeout(() => {
      overlay.classList.remove('active')
   }, 100)
   document.querySelector('.container').removeChild(document.querySelector('.modal'))
}


//EVENTS
//Start the tour
document.addEventListener('DOMContentLoaded', () => {
   if (localStorage.getItem('currentLocation') == 'projects') {
      if (!localStorage.getItem('userProjects') || localStorage.getItem('userProjects').length == 2) {
         //Modal #1
         document.querySelector('.container').append(buildModal(modalsHeaderContent["Welcome!"], modalsBodyContent["Welcome!"]))
         let timeout = setTimeout(()=>{
            overlay.classList.add('active')
            document.querySelector('.modal').classList.add('active')
            document.querySelector('.modal-content').classList.remove('invisible')
         }, 1000)
      }
   } 
})

//Close Modal
document.addEventListener('click', (e) => {
   if (e.target.classList.contains('close-modal-btn')) {
      closeTourModal()
   }
})