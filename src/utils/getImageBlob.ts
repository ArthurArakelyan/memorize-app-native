const getImageBlob = async (url: string): Promise<Blob> => {
  try {
    const response = await fetch(url);
    return await response.blob();
  } catch (e) {
    throw e;
  }
};

export default getImageBlob;
