export const getFileName = (url: string): string => {
  // Split the URL by `/` to get segments
  const pathSegments = url.split("/");

  // Check for specific route segments to determine the file category
  if (pathSegments.includes("user")) {
    return "users";
  } 

  if (pathSegments.includes("event")) {
    return "events";
  }

  return "others"
};

export default getFileName;
