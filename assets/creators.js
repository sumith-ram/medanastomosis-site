/*
  MedAnastomosis — creator directory data
  ------------------------------------------------------------
  Every card on "Our Creators" (and the featured row on Home) is built from this list.
  To add a creator, copy one block, fill it in, and delete the "sample: true" line.

  name       Full name as it should appear, e.g. "Dr. First Last"
  title      One line under the name, e.g. "Dermatology Resident"
  stage      Used by the filter buttons. One of:
             "Medical student", "FMG", "Resident", "Doctor", "Consultant"
  specialty  Used by the specialty dropdown, e.g. "Dermatology"
  city       City shown on the card
  photo      Path to a square or 4:5 photo, e.g. "assets/creators/first-last.jpg"
             Leave "" to show initials instead.
  bio        Two or three sentences for the profile pop-up
  topics     What they create content about (shown as tags)
  reach      Optional audience line, e.g. "120K followers". Leave "" to hide.
  socials    Any of: instagram, youtube, linkedin, x, website
             handle = what people see, url = full link. Leave a network out if they are not on it.
  featured   true = also shown in the "Meet our creators" row on the Home page (first 4 are used)
*/
window.MA_CREATORS = [
  {
    name: "Creator Name",
    title: "Dermatology Resident",
    stage: "Resident",
    specialty: "Dermatology",
    city: "Hyderabad",
    photo: "assets/creators/sample-1.webp",
    bio: "[Two or three lines about the creator, what they share and who it helps.]",
    topics: ["Skin health", "Residency life"],
    reach: "",
    socials: {
      instagram: { handle: "@handle", url: "" },
      youtube: { handle: "Channel name", url: "" }
    },
    featured: true,
    sample: true
  },
  {
    name: "Creator Name",
    title: "MBBS Student",
    stage: "Medical student",
    specialty: "General Medicine",
    city: "Chennai",
    photo: "assets/creators/sample-2.webp",
    bio: "[Two or three lines about the creator, what they share and who it helps.]",
    topics: ["Study tips", "Med school life"],
    reach: "",
    socials: {
      instagram: { handle: "@handle", url: "" },
      x: { handle: "@handle", url: "" }
    },
    featured: true,
    sample: true
  },
  {
    name: "Creator Name",
    title: "Foreign Medical Graduate",
    stage: "FMG",
    specialty: "General Medicine",
    city: "Bengaluru",
    photo: "assets/creators/sample-3.webp",
    bio: "[Two or three lines about the creator, what they share and who it helps.]",
    topics: ["FMGE journey", "Studying abroad"],
    reach: "",
    socials: {
      instagram: { handle: "@handle", url: "" },
      youtube: { handle: "Channel name", url: "" },
      linkedin: { handle: "Profile name", url: "" }
    },
    featured: true,
    sample: true
  },
  {
    name: "Creator Name",
    title: "Consultant Psychiatrist",
    stage: "Consultant",
    specialty: "Psychiatry",
    city: "Mumbai",
    photo: "assets/creators/sample-4.webp",
    bio: "[Two or three lines about the creator, what they share and who it helps.]",
    topics: ["Mental health", "Awareness"],
    reach: "",
    socials: {
      instagram: { handle: "@handle", url: "" },
      linkedin: { handle: "Profile name", url: "" },
      website: { handle: "yourwebsite.com", url: "" }
    },
    featured: true,
    sample: true
  },
  {
    name: "Creator Name",
    title: "Radiology Resident",
    stage: "Resident",
    specialty: "Radiology",
    city: "Delhi",
    photo: "assets/creators/sample-5.webp",
    bio: "[Two or three lines about the creator, what they share and who it helps.]",
    topics: ["Imaging cases", "NEET PG prep"],
    reach: "",
    socials: {
      instagram: { handle: "@handle", url: "" },
      youtube: { handle: "Channel name", url: "" }
    },
    featured: false,
    sample: true
  },
  {
    name: "Creator Name",
    title: "General Surgeon",
    stage: "Doctor",
    specialty: "Surgery",
    city: "Pune",
    photo: "assets/creators/sample-6.webp",
    bio: "[Two or three lines about the creator, what they share and who it helps.]",
    topics: ["Surgery explained", "Patient education"],
    reach: "",
    socials: {
      instagram: { handle: "@handle", url: "" },
      x: { handle: "@handle", url: "" }
    },
    featured: false,
    sample: true
  },
  {
    name: "Creator Name",
    title: "Doctor building a clinic",
    stage: "Doctor",
    specialty: "Family Medicine",
    city: "Kochi",
    photo: "assets/creators/sample-7.webp",
    bio: "[Two or three lines about the creator, what they share and who it helps.]",
    topics: ["Practice building", "Preventive care"],
    reach: "",
    socials: {
      instagram: { handle: "@handle", url: "" },
      website: { handle: "yourclinic.com", url: "" }
    },
    featured: false,
    sample: true
  },
  {
    name: "Creator Name",
    title: "Final-year MBBS Student",
    stage: "Medical student",
    specialty: "General Medicine",
    city: "Kolkata",
    photo: "assets/creators/sample-8.webp",
    bio: "[Two or three lines about the creator, what they share and who it helps.]",
    topics: ["Internship prep", "Productivity"],
    reach: "",
    socials: {
      instagram: { handle: "@handle", url: "" },
      youtube: { handle: "Channel name", url: "" }
    },
    featured: false,
    sample: true
  }
];
