/* eslint-disable class-methods-use-this */
import create from './helper/create';

class NavBar {
  constructor() {
    document.getElementById('add-button').addEventListener('click', () => {
      this.showModal();
      document.getElementById('container').style.backgroundColor = '#FFFFFF';
    });
  }

  showModal() {
    const modalForm = document.getElementById('modal-form');
    if (modalForm.style.display === 'none') modalForm.style.display = 'block';
    else modalForm.style.display = 'none';
  }
}

export default NavBar;
