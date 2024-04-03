import React from "react";
import FormComponent from '../components/FormComponent';

import './rehome.css';

const RehomeFormPage = () => {
  return (
    <div className="form-header" style={{ padding: '45px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Add a Pet to be Adopted</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <FormComponent />
      </div>
    </div>
  );
};

export default RehomeFormPage;
