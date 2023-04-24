const Image = require('../models/images');
const {StatusCodes} = require('http-status-codes');
const cloudinary = require('../cloudinary/cloudinary');
const fs = require('fs');

const getAllImage = async (req, res) =>{
  const images = await Image.find().sort({'createdAt': -1});
  res.status(StatusCodes.OK).json({images, count: images.length})
}
const getImage = async (req, res) =>{
  const {
    user: {userId},
    params: {id: imageId}
  }= req;
  const image = await Image.findOne({
    _id: imageId,
    createdBy: userId,
  })
  if(!image){
    throw new Error(`No image  with id ${imageId}`);
  }
  res.status(StatusCodes.OK).json({image})
}

const createImage = async (req, res) =>{
  // console.log('req', req)
  // if(req.file)
  // {
  //   console.log('req.body', ...req.body);
  //   console.log('req.file', req.file);
  // }
  // console.log('req.body', req.body);
  // let image;
  // console.log(req);
// if(req.body.url===null || req.body.url===undefined || req.body.url===''){
  if(req.file){
  // console.log('req.body', req.body);
  // console.log('req.file', req.file);
  // console.log(req.file);
  let img_path = req.file.path;
  const img_upload = await cloudinary.uploader.upload(img_path);
  // console.log('img_upload', img_upload)
  const data = {
    url: img_upload.secure_url,
    cloudinary_id: img_upload.public_id,
    label: req.body.label
  }
  // console.log('if data', data)
  const image = await Image.create(data);
  fs.unlink(img_path, (err)=>{
    if(err){
      console.log("err occured while deleting image from app");
    }
    else{
      console.log("image deleted from app succesfully");
    }
  })
  res.status(StatusCodes.CREATED).json({image})
}
else{
  // console.log('req.body',req.body)
  const data = {
    url: req.body.url,
    label: req.body.label,
    cloudinary_id:''
  }
  // console.log('else data', data)
  const image = await Image.create(data);
  res.status(StatusCodes.CREATED).json({image})
}

}

const updateImage = async (req, res) =>{
  const {
    body: {likes: likes},
    // user: {userId},
    params: {id: imageId}
  }= req;
  if(likes===""){
    throw new Error("Likes can't be updated")
  }
  // const image = await Image.findByIdAndUpdate(
  //   {_id: imageId, createdBy: userId},
  //   req.body,
  //   {new: true, runValidators: true}
  // );

  const image = await Image.findByIdAndUpdate(
    {_id: imageId},
    req.body,
    {new: true, runValidators: true}
  );
  if(!image){
    throw new Error(`No image with id ${imageId}`);
  }
  res.status(StatusCodes.OK).json({image})
}
const deleteImage= async (req, res) =>{
  const {
    // user: {userId},
    params: {id: imageId}
  }= req;
  // console.log("inside delet image");
  const image = await Image.findById({_id: imageId});
  if(!image){
    throw new Error(`No image with id ${imageId}`);
  }
  try{
    if(image.cloudinary_id!=="")
    {
      const result = await cloudinary.uploader.destroy(image.cloudinary_id);
    }
    await Image.deleteOne({_id: imageId});
  }
  catch(err){
    // console.log('error while deleting', err)

  }

  res.status(StatusCodes.OK).json({msg:"image deleted"})
}

module.exports = {
  getAllImage,
  getImage,
  createImage,
  updateImage,
  deleteImage
}
