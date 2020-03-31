/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
import create from './helper/create';

class NavBar {
  constructor() {
    document.getElementById('add-form').onsubmit = (e) => {
      console.log(e);
    };
  }

  showModal() {
    const modalForm = document.getElementById('modal-form');
    if (modalForm.style.display === 'none') {
      modalForm.style.display = 'block';
      document.getElementById('main-container').classList.add('toggle-background');
    } else {
      modalForm.style.display = 'none';
      document.getElementById('main-container').classList.remove('toggle-background');
    }
  }
}

export default NavBar;
