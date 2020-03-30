/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
import create from './helper/create';

class NavBar {
  constructor() {
    document.getElementById('add-button').addEventListener('click', () => {
      this.showModal();
    });
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
