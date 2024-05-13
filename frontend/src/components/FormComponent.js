import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormComponent.css';

const YourFormComponent = () => {
  const initialFormData = {
    age: '',
    gender: '',
    price: '',
    type: '',
    location: '',
    contact: '',
    name: '',
    about: '',
    doesntLikeKids: '',
    doesntLikeMen: '',
    isEnergetic: '',
    isFixed: '',
    image: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
    username: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [numImages, setNumImages] = useState(1);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setFormData(prevFormData => ({ ...prevFormData, username: storedUsername }));
    }
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      const file = e.target.files[0];
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else if (e.target.type === 'checkbox') {
      setFormData({ ...formData, [name]: e.target.checked ? "true" : "false" });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === 'type') {
      updateBreedOptions(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      if (isChecked) {
        const response = await axios.post('http://127.0.0.1:8000/api/animalAdopter/create_animal_model', data);
        console.log('Data saved successfully. Animal ID:', response.data.id);
        setSuccessMessage('Animal information saved successfully! Please enter your next animal.');  // Set success message
        setTimeout(() => setSuccessMessage(''), 3000);  // Clear message after 3 seconds
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/animalAdopter/create_animal_model', data);
        console.log('Data saved successfully. Animal ID:', response.data.id);
        setFormData(initialFormData);  // Clear form data after successful save
        setSuccessMessage('Animal information saved successfully!');  // Set success message
        setTimeout(() => setSuccessMessage(''), 3000);  // Clear message after 3 seconds
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleAddImage = () => {
    if (numImages < 5) {
      setNumImages(prevNumImages => prevNumImages + 1);
    }
    else {
      setSuccessMessage('You have reached the maximum number of images.');
    }
  };

  const handleRemoveImage = (index) => {
    if (numImages) {
      setNumImages(prevNumImages => prevNumImages - 1);
    }
    else {
      setSuccessMessage('You must have at least one image.');
    }
  };

  const renderImageInputs = () => {
    const imageInputs = [];
    for (let i = 2; i <= numImages; i++) {
      imageInputs.push(
        <label key={i}>
          <input type="file" name={`image${i}`} onChange={handleChange} />
        </label>
      );
    }
    return imageInputs;
  }

  function updateBreedOptions(type) {
    const breedsByType = {
      dog: ['Alaskan Malamute', 'Australian Shepherd', 'Basset Hound', 'Beagle', 'Belgian Malinois', 'Bichon Frise',
       'Border Collie', 'Boston Terrier', 'Boxer', 'Bulldog', 'Bullmastiff', 'Bull Terrier', 'Cairn Terrier', 'Cavalier King Charles Spaniel',
        'Chesapeake Bay Retriever', 'Chinese Shar-Pei', 'Cocker Spaniel', 'Dachshund', 'Dalmatian', 'Doberman Pinscher', 'English Springer Spaniel',
         'French Bulldog', 'German Shepherd', 'Golden Retriever', 'Great Dane', 'Havanese', 'Italian Greyhound', 'Labrador Retriever', 'Lhasa Apso',
          'Maltese', 'Miniature Pinscher', 'Miniature Schnauzer', 'Newfoundland', 'Pembroke Welsh Corgi', 'Pomeranian', 'Portuguese Water Dog', 'Poodle',
           'Rhodesian Ridgeback', 'Rottweiler', 'Shetland Sheepdog', 'Shiba Inu', 'Shih Tzu', 'Siberian Husky', 'Staffordshire Bull Terrier', 'Vizsla',
            'Weimaraner', 'West Highland White Terrier', 'Yorkshire Terrier', 'Other'],
      cat: ['Abyssinian', 'American Bobtail', 'American Curl', 'American Shorthair', 'American Wirehair', 'Balinese', 'Bengal', 'Birman', 'Bombay',
       'British Shorthair', 'Burmese', 'Chartreux', 'Cornish Rex', 'Devon Rex', 'Egyptian Mau', 'Exotic Shorthair', 'Havana Brown', 'Himalayan',
        'Japanese Bobtail', 'Javanese', 'Korat', 'Maine Coon', 'Manx', 'Munchkin', 'Nebelung', 'Norwegian Forest Cat', 'Ocicat', 'Oriental', 'Persian',
         'Pixiebob', 'Ragamuffin', 'Ragdoll', 'Russian Blue', 'Scottish Fold', 'Selkirk Rex', 'Siamese', 'Siberian', 'Singapura', 'Somali', 'Sphynx',
          'Tonkinese', 'Turkish Angora', 'Turkish Van', 'York Chocolate', 'Australian Mist', 'Chausie', 'Cymric', 'Sokoke', 'Other'],
      rodent:['African Pygmy Hedgehog', 'Capybara', 'Chinchilla', 'Degu', 'Dwarf Hamster', 'Flying Squirrel', 'Ferret', 'Gambian Pouched Rat',
       'Gerbil', 'Guinea Pig', 'Hamster', 'Jerboa', 'Mouse', 'Naked Mole Rat', 'Porcupine', 'Prairie Dog', 'Rat', 'Sugar Glider', 'Squirrel', 'Duprasi', 'Other'],
      fish:['Angelfish', 'Barb', 'Betta Fish', 'Catfish', 'Cichlid', 'Clownfish', 'Discus', 'Gourami', 'Goldfish', 'Guppy', 'Koi', 'Molly', 'Neon Tetra',
       'Plecostomus', 'Platy', 'Rainbowfish', 'Rasbora', 'Swordtail', 'Tetra', 'Zebrafish', 'Other'],
      bird:['Budgerigar', 'Canary', 'Cockatiel', 'Cockatoo', 'Conure', 'Dove', 'Eclectus Parrot', 'Finch', 'Lovebird', 'Macaw', 'Parakeet',
       'Parrotlet', 'Pionus Parrot', 'Quaker Parrot', 'Senegal Parrot', 'Sun Conure', 'Toucan', 'African Grey Parrot', 'Indian Ringneck Parakeet', 'Rosella', 'Other'],
      reptile:['Bearded Dragon', 'Boa Constrictor', 'Corn Snake', 'Crested Gecko', 'Leopard Gecko', 'Ball Python', 'Red-Eared Slider', 'Russian Tortoise',
       'Blue Tongue Skink', 'Green Iguana', 'Red-Footed Tortoise', 'Sulcata Tortoise', 'Veiled Chameleon', 'Leopard Tortoise', 'Painted Turtle',
        'African Fat-Tailed Gecko', 'Kingsnake', 'Milk Snake', 'Tegu', 'Uromastyx', 'Other'],
      horse:['Appaloosa', 'Arabian', 'Clydesdale', 'Friesian', 'Hanoverian', 'Irish Draught', 'Morgan', 'Mustang', 'Paint Horse', 'Palomino',
       'Quarter Horse', 'Shetland Pony', 'Thoroughbred', 'Welsh Pony', 'Andalusian', 'Haflinger', 'Pony of the Americas', 'Tennessee Walking Horse',
        'Miniature Horse', 'Percheron', 'Other'],
      other:['Other'],
    };

    const selectedBreeds = breedsByType[type] || [];

    setBreeds(selectedBreeds);
  }

  return (
    <div className="rehome-form-page">
      <div className="form">
        <form onSubmit={handleSubmit} encType="multipart/form-data" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h3>Pet Information</h3>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Animals birthday:
            <input type="date" name="age" value={formData.age} onChange={handleChange} />
          </label>
          <div>
            <label>
              Gender:
              <input type="radio" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} /> Female
            </label>
            <label>
              <input type="radio" name="gender" value="unknown" checked={formData.gender === "unknown"} onChange={handleChange} /> Unknown
            </label>
          </div>
          <label>
            Price:
            <input type="text" name="price" value={formData.price} onChange={handleChange} />
          </label>
          <label>
            Type:
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="">Select Animal Type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="rodent">Rodent</option>
              <option value="fish">Fish</option>
              <option value="bird">Bird</option>
              <option value="reptile">Reptile</option>
              <option value="horse">Horse</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label>
            Breed:
            <input type="text" list="breed" name="breed" value={formData.breed} onChange={handleChange} />
              <datalist id="breed">
                {breeds.map(breed => (
                  <option key={breed} value={breed}>{breed}</option>
                ))}
              </datalist>
            </label>
          <div className="special-needs">
            <label>Special Accommodations:</label>
            <label>
              <input type="checkbox" name="doesntLikeKids" checked={formData.doesntLikeKids === "true"} onChange={handleChange} /> Doesn't like kids.
            </label>
            <label>
              <input type="checkbox" name="doesntLikeMen" checked={formData.doesntLikeMen === "true"} onChange={handleChange} /> Doesn't like men.
            </label>
            <label>
              <input type="checkbox" name="isEnergetic" checked={formData.isEnergetic === "true"} onChange={handleChange} /> Very Energetic.
            </label>
            <label>
              <input type="checkbox" name="isFixed" checked={formData.isFixed === "true"} onChange={handleChange} /> Is Spayed or Neutered.
            </label>
          </div>
          <label>
            About:
            <input type="text" name="about" value={formData.about} onChange={handleChange} />
          </label>
          <div className='images'>
            <label>Images:</label>
            <input type="file" name="image" onChange={handleChange} />
            {renderImageInputs()}
            <div className='image-handlers'>
              <button type="button" onClick={handleAddImage}>+</button>
              <button type="button" onClick={handleRemoveImage}>-</button>
            </div>
          </div>
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
          </label>
          <label>
            Contact:
            <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
          </label>
          <label>
            Adoption Form:
            <input type="file" name="adoptForm" onChange={handleChange} />
          </label>
          <label>
            <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} /> Submitting multiple animals?
          </label>
          <button type="submit">Submit</button>
          {successMessage && <div className="success-message">{successMessage}</div>}  {/* Success message at the bottom */}
        </form>
      </div>
    </div>
  );
};

export default YourFormComponent;
