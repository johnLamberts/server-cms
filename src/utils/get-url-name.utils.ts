export const getFileName = (url: string): string => {
  // Split the URL by `/` to get segments
  const pathSegments = url.split("/");

  // Check for specific route segments to determine the file category
  if (pathSegments.includes("user")) {
    return "users";
  } else if (pathSegments.includes("visitor")) {
    return "visitors";
  } else if (pathSegments.includes("events")) {
    return "events";
  } else if (pathSegments.includes("page-editor")) {
    return "page_editors";
  } else {
    return "others"; // Default for unhandled routes
  }
};

export default getFileName;
