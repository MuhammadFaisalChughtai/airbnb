const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const upload = require("../../middleware/upload");
const fs = require("fs");
const Property = require("../../models/Property");
const User = require("../../models/User");
const Image = require("../../models/Image");
const path = require("path");
// const checkObjectId = require("../../middlew`a`re/checkObjectId");
router.post(
  "/create-post",
  [upload.single("image"), auth],
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      const newProperty = new Property({
        name: user.name,
        user: req.user.id,
        pName: req.body.pName,
        cover: req.body.cover,
        location: req.body.location,
        city: req.body.city,
        price: req.body.price,
        type: req.body.type,
      });

      const property = await newProperty.save();
      res.json(property);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.post("/upload-photo", upload.single("img"), (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  console.log(url);
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString("base64");
  var final_img = {
    contentType: req.file.mimetype,
    image: new Buffer(encode_img, "base64"),
  };
  Image.create(final_img, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.contentType(final_img.contentType);
      res.end(url + "/uploads/" + req.file.filename);
    }
  });
});
router.post("/all-properties", async (req, res) => {
  try {
    const property = await Property.find()
      .sort({ date: -1 })
      .populate("user", ["name", "email"]);
    // .limit(req.body.limit)
    // .skip(req.body.skip);

    res.json({ property, totalPost: property.length });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
router.post("/specific-property", async (req, res) => {
  try {
    const type = req.body.value;
    console.log(type);
    const property = await Property.find({ type })
      .sort({ date: -1 })
      .populate("user", ["name", "email"]);
    // .limit(req.body.limit)
    // .skip(req.body.skip);

    res.json({ property, totalPost: property.length });
  } catch (err) {
    res.status(500).json({
      error: {
        msg: "Server Error",
      },
    });
  }
});
module.exports = router;
