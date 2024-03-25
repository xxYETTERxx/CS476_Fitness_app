function resizeImage(file, maxWidth, maxHeight, quality, callback){
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
  
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }
  
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
  
        canvas.toBlob((blob) => {
          callback(blob);
        }, 'image/webp', quality);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  export default resizeImage;
  