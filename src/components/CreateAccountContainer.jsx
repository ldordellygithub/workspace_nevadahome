// src/components/Auth/CreateAccountContainer.jsx

import React from 'react';

import  "../components/assets/styles/formStyles.css"
import CreateAccountForm from './features/Auth/CreateAccountForm';

//... other imports here...
 //... rest of your code here...

const CreateAccountContainer = () => {
  return (
    < div className="create-account-container">
      <div className='titulo-pppt'>
      <h2> Unete  Ahora </h2> 
      </div>
      <p>Inicia sesion para disfrutar  las  funcionalidades  premium!</p>
      <CreateAccountForm/>
    </div>

  );
};

export default CreateAccountContainer;
