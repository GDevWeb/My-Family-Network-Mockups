const express = require("express");
const router = express.Router();
const Album = require("../models/album");
const albumCtrl = require("../controllers/album");


/* Album routes */
// Add an album:
router.post("/", albumCtrl.createAlbum);
// Get album by id :
router.get("/:id", albumCtrl.getOneAlbum);
// PUT - Update one album :
router.put("/:id", albumCtrl.modifyAlbum);
// Delete an album :
router.delete("/:id", albumCtrl.deleteAlbum);
// Delete one article :
router.delete("/album/:id", albumCtrl.deletePost);
// Get all albums :
router.get("/", albumCtrl.getAllAlbums);

/* Articles routes */


module.exports = router;
