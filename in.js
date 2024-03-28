document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    const reader = new FileReader(); // Create a FileReader object
    reader.onload = function(e) {
      const imageDataURL = e.target.result; // Get the data URL of the image
      const img = document.createElement('img'); // Create an <img> element
      img.src = imageDataURL; // Set the src attribute with the data URL
      document.getElementById('imagePreview').innerHTML = ''; // Clear previous preview
      document.getElementById('imagePreview').appendChild(img); // Append the image to the preview div

      // Perform OCR on the image
      ocr(imageDataURL);
    };
    reader.readAsDataURL(file); // Read the selected file as Data URL
  }
});

async function ocr(imageDataURL, language = 'eng+spa+fra+deu+ita+chi_sim+rus+jpn+ara+hin') {
  try {
    const { data: { text } } = await Tesseract.recognize(
      imageDataURL,
      language,
      { logger: m => console.log(m) }
    );

    // Display the extracted text
    var displayDiv = document.getElementById('displayArea');
    displayDiv.innerText = text;

    console.log('OCR completed successfully.');
  } catch (error) {
    console.error('An error occurred during OCR:', error);
  }
}
