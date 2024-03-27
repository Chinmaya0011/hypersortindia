import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import the user icon
import style from '../style/header.module.css'
const Header = () => {
  return (
    <div className={style.header}>
      <h1 className={style.h1}>Task Board</h1>
      {/* Use the FontAwesomeIcon component with the user icon */}
      <h1 className={style.user}><FontAwesomeIcon icon={faUser} /></h1>
    </div>
  );
}

export default Header;
