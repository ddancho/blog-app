export function getErrorMessage(error: unknown) {
  let message: string = "";

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "messsage" in error) {
    message = String(error.messsage);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong";
  }

  return message;
}

export function slugifyString(slug: string) {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const POSTS_PER_PAGE = 3;

export const FORM_DATA_FILES = "image";

export const MAX_FILE_SIZE = 5_000_000;

export const FILE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// this is only for the local development
// in the production this would be bucket address or something else
export const UPLOAD_FOLDER_DIR_PATH = process.cwd() + "/public/upload/images";

// Image src property is UPLOAD_FOLDER_DIR/name
// this is constructed for local dev
export const UPLOAD_FOLDER_DIR = "/upload/images";
