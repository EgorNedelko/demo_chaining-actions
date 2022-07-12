function openModal() {
   overlay.classList.add('active')
   document.querySelector('.notifications-settings-modal').classList.remove('display-none')
}

function closeModal() {
   overlay.classList.remove('active')
   document.querySelector('.notifications-settings-modal').classList.add('display-none')
}

//Buttons
document.querySelector("input[value='Set Email Notifications']").addEventListener('click', (e) => {
   openModal()
})
document.querySelector("input[value='Cancel']").addEventListener('click', () => {
   closeModal()
})
document.querySelector("input[value='Save']").addEventListener('click', () => {
   closeModal()
})

//Advanced Tools 
document.addEventListener('DOMContentLoaded', () => {
   if (localStorage.getItem('advancedTools') == 'true') {
      document.getElementById('profileCheckboxAdvanced').checked = true
   } else {
      document.getElementById('profileCheckboxAdvanced').checked = false
   }
})
document.getElementById('profileCheckboxAdvanced').addEventListener('change', () => {
   if (document.getElementById('profileCheckboxAdvanced').checked) {
      localStorage.setItem('advancedTools', true)
   } else {
      localStorage.setItem('advancedTools', false)
   }
})