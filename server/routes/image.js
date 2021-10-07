// Endpoints focused on Images.
const router = require('express').Router();

const {
    addCaptureImage,
    addAvatarImage,
} = require('../handlers/images');

// User endpoints.
router.post("/image/uploadCapture", addCaptureImage)
router.post("/image/uploadAvatar", addAvatarImage)

module.exports = router;