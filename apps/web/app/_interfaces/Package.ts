interface Package {
  uid: string;
  receiverName: string;
  destination: string;
  contact: string;
  status: "waiting" | "delivering" | "finished";
}

export default Package;