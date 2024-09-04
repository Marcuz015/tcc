
document.getElementById('choose-picture-btn').addEventListener('click', function() {
    document.getElementById('picture-input').click();
  });
  
  // JavaScript code to handle the file input change event
  document.getElementById('picture-input').addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function() {
      const imageDataUrl = reader.result;
      document.getElementById('profile-picture-img').src = imageDataUrl;
    };
    reader.readAsDataURL(file);
  });