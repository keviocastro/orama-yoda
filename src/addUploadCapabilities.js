const convertFileToBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const addUploadCapabilities = requestHandler => (type, resource, params) => {
  console.log(params)
  console.log(type)
  if ((type === "UPDATE" || type === "CREATE")) {
    // only one image
    if (Array.isArray(params.data.image))
      params.data.image = params.data.image[0];


    if (checkInputNewImage(params, "image")) {
      return makeRequestHandlerParams(
        params,
        newPrams => requestHandler(type, resource, newPrams),
        "image"
      );
    }

    if (Array.isArray(params.data.logo))
      params.data.logo = params.data.logo[0];


    if (checkInputNewImage(params, "logo")) {
      return makeRequestHandlerParams(
        params,
        newPrams => requestHandler(type, resource, newPrams),
        "logo"
      );
    }
  }

  return requestHandler(type, resource, params);
};

const checkInputNewImage = (params, imageParamName = "image") => {
  if (
    params.data[imageParamName] &&
    params.data[imageParamName].rawFile instanceof File
  ) {
    return true;
  } else {
    return false;
  }
};

const makeRequestHandlerParams = (
  params,
  callback,
  imageParamName = "image"
) => {
  const file = params.data[imageParamName].rawFile;
  return convertFileToBase64(file)
    .then(base64Image => ({
      base64: base64Image,
      name: `${file.name}`
    }))
    .then(transformedNewImage => {
      let newParms = {
        ...params,
        data: {
          ...params.data
        }
      };

      newParms.data[imageParamName] = { ...transformedNewImage };
      return callback(newParms);
    });
};

export default addUploadCapabilities;
