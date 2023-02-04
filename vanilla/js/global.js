const snippetList = document.querySelector('.snippets')
const loggedOutLinks = document.querySelectorAll('.logged-out')
const loggedInLinks = document.querySelectorAll('.logged-in')

const setupUI = (user) => {
  if (user) {
    loggedInLinks.forEach(item => item.style.display = 'list-item');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'list-item');
  }

}

const snippets = (data) => {
if (data.length) {


  let html = '';
  data.forEach(doc =>{
    const snip = doc.data();
    const li = `
    <li>
    <div class="collapsible-header grey lighten-4">${snip.Title}</div>
    <div class="collapsible-body white">${snip.Content}</div>
  </li>
  `
  html += li;
  });
  snippetList.innerHTML = html;
} else {
  snippetList.innerHTML = '<h5>Login to see collection </h5>'
  }
}
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });