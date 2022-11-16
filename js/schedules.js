//click the FILTER DROPDOWN BUTTON for the filter dropdown to appear 
document.addEventListener('click', (e) => {
   //if clicked on the text
   // if (!e.target.parentNode.classList.contains('deactivated')) {
   //    console.log(e.target)
   // }

   //if clicked on the area around the text
   if (!e.target.classList.contains('deactivated')) {
      if (e.target.classList.contains('filter-dropdown-btn')) {
         document.querySelectorAll('.filter-dropdown').forEach(el => {
            if (el != e.target.parentNode.children[2]) el.classList.remove('visible')
         })
         e.target.parentNode.querySelector('.filter-dropdown').classList.toggle('visible')
      }
   }
})

function deactivateChildrenFilters() {
   document.querySelector('.filter-module').children[1].classList.add('deactivated')
   document.querySelector('.filter-scenario').children[1].classList.add('deactivated')
}

document.addEventListener('DOMContentLoaded', (e) => {
   if (document.getElementById('filterSearchProject').textContent == 'All') {
      deactivateChildrenFilters()
   }
})