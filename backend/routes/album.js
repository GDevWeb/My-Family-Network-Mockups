const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const albumCtrl = require("../controllers/album");

/* Album routes */
// Get all albums :
router.get("/", auth, albumCtrl.getAllAlbums);
// Add an album:
router.post("/", auth, multer,albumCtrl.createAlbum);
// Get album by id :
router.get("/:id", auth, albumCtrl.getOneAlbum);
// PUT - Update one album :
router.put("/:id", auth, multer, albumCtrl.modifyAlbum);
// Delete an album :
router.delete("/:id", auth, albumCtrl.deleteAlbum);

/* Articles routes */

module.exports = router;
