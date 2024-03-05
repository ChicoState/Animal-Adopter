import React from "react";
import FormComponent from '../components/FormComponent';

const AdoptionFormPage = () => {
  return (
    <div style={{ padding: '45px', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '20px' }}>Add a Pet to be Adopted</h1>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <FormComponent />
      </div>
    </div>
  );
};

export default AdoptionFormPage;
