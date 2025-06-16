function initializeProfileLogic() {
    let cropper;
    const croppedImages = [];

    const overlay = document.getElementById('imageOverlay');
    const overlayImage = document.getElementById('overlayImage');
    const profileImage = document.querySelector('.profile-image');

    document.querySelectorAll('.profile-container').forEach(container => {
        container.addEventListener('click', () => {
            overlayImage.src = profileImage.src;
            overlay.classList.add('active');
            if (cropper) cropper.destroy();
        });
    });

    document.getElementById('applyCrop').addEventListener('click', () => {
        if (cropper) {
            const croppedCanvas = cropper.getCroppedCanvas();
            const croppedImage = croppedCanvas.toDataURL('image/png');
            croppedImages.push(croppedImage);
            overlayImage.src = croppedImage;
            profileImage.src = croppedImage;
            resetCropper();
            overlay.classList.remove('active');
        }
    });

    document.getElementById('startCrop').addEventListener('click', () => {
        cropper = new Cropper(overlayImage, { aspectRatio: 1, viewMode: 1 });
        toggleCropControls(true);
    });

    document.getElementById('cancelCrop').addEventListener('click', resetCropper);

    document.getElementById('reuploadImage').addEventListener('click', () => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
        fileInput.onchange = event => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = e => {
                    overlayImage.src = e.target.result;
                    profileImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
    });

    document.getElementById('closeOverlay').addEventListener('click', () => {
        overlay.classList.remove('active');
        if (cropper) cropper.destroy();
    });

    function resetCropper() {
        if (cropper) cropper.destroy();
        toggleCropControls(false);
    }

    function toggleCropControls(isCropping) {
        document.getElementById('applyCrop').style.display = isCropping ? 'inline' : 'none';
        document.getElementById('startCrop').style.display = isCropping ? 'none' : 'inline';
        document.getElementById('reuploadImage').style.display = isCropping ? 'none' : 'inline';
        document.getElementById('cancelCrop').style.display = isCropping ? 'inline' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeProfileLogic();

    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        // Initialize icon based on current mode
        const updateIcon = () => {
            if (document.body.classList.contains('light-mode')) {
                modeToggle.innerHTML = '&#9790;'; // Moon icon
            } else {
                modeToggle.innerHTML = '&#9728;'; // Sun icon
            }
        };

        updateIcon();

        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            updateIcon();
        });
    }
});
