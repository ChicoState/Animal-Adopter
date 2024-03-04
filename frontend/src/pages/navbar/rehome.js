import React from "react";

const Rehome = () => {
  return (
    <div>
      <h1>Add info about an animal.</h1>
      <label>
        Name: <input name="myName" />
      </label>
      <label>
        Age: <input name="myAge" />
      </label>
      <label>
        Type: <input name="myType" />
      </label>
      <label>
        SpecialNeeds: <input name="mySpecialNeeds" />
      </label>
      <label>
        Gender: <input name="myGender" />
      </label>
      <label>
        Bio: <input name="myBio" />
      </label>
      <label>
        Location: <input name="myLocation" />
      </label>
      <label>
        Phone: <input name="myPhone" />
      </label>
      <label>
        Price: <input name="myPrice" />
      </label>
      <button onClick={() => console.log("Submit clicked")}>Submit</button>
    </div>
  );
};

export default Rehome;