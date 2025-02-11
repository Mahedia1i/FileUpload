import Demo from "../model/demoModel.js";

export const getData = async (req, res) => {
  try {
    const users = await Demo.find();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in fetch users: ", error);
    res.status(500).json({ message: "server error" });
  }
};
