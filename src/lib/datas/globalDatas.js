import {
  iAbout,
  iContact,
  iFaq,
  iFooter,
  iHeader,
  iHome,
  iPages,
  iReviews,
} from "../icons/icons";

export const sidebar_routes = [
  { id: 1, name: "Home", url: "/home", icon: iHome },
  { id: 2, name: "Header", url: "header", icon: iHeader },
  { id: 3, name: "Footer", url: "footer", icon: iFooter },
  { id: 4, name: "Pages", url: "pages", icon: iPages },
  { id: 5, name: "About Us", url: "about-us", icon: iAbout },
  { id: 6, name: "Contact Us", url: "contact-us", icon: iContact },
  { id: 7, name: "Reviews", url: "reviews", icon: iReviews },
  { id: 8, name: "FAQ", url: "faqs", icon: iFaq },
];

export const pagesTabs = [
  { id: 1, name: "Pages" },
  { id: 2, name: "New Page" },
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
