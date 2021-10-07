// Endpoints focused on Captures.
const router = require('express').Router();

const {
    captureVote,
    getCapturesForMap
} = require('../handlers/captures');

// Capture endpoints.
router.put("/capture/vote", captureVote);
router.get("/captures", getCapturesForMap);

module.exports = router;