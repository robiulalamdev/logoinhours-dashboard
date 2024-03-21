import {
  iAbout,
  iCategory,
  iContact,
  iFaq,
  iFooter,
  iHeader,
  iHome,
  iPages,
  iReviews,
} from "../icons/icons";

export const sidebar_routes = [
  { id: 1, name: "Home", url: "home", icon: iHome },
  { id: 2, name: "Pages", url: "pages", icon: iPages },
  { id: 3, name: "Category", url: "categories", icon: iCategory },
  // { id: 4, name: "Contact Us", url: "contact-us", icon: iContact },
  { id: 5, name: "Reviews", url: "reviews", icon: iReviews },
  // { id: 6, name: "FAQ", url: "faqs", icon: iFaq },
];

export const pagesTabs = [
  { id: 1, name: "Categories" },
  { id: 2, name: "New Category" },
];

export const reviewTabs = [
  { id: 1, name: "Reviews" },
  { id: 2, name: "Add Review" },
];

export const editor = {
  modules: {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  },
  formats: [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "image",
    "video",
  ],
};
