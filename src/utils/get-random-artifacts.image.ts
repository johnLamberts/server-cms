/**
 * Returns a random placeholder image URL for artifacts
 * when a user doesn't upload a specific image
 */
export const getRandomArtifactImage = (): string => {
  // Array of museum artifact placeholder images
  const placeholderImages = [
    'https://media.istockphoto.com/id/1128826884/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?s=612x612&w=0&k=20&c=390e76zN_TJ7HZHJpnI7jNl7UBpO3UP7hpR2meE1Qd4='
  ];
  
  // Select a random image from the array
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[randomIndex];
};

export default getRandomArtifactImage;
