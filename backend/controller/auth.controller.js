import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
import patientREGS from '../models/patientRegistration.model.js';

dotenv.config();

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// @route POST /signup
export const register = async (req, res) => {

  
  // console.log("api is being hit");
  // const { name, email, password, role ,contact,baseSaldepartment,employeeIdary,} = req.body;
  // console.log(req.body);

  // try{
  //     const user = await User.create (req.body);
  //     const token = generateToken(user._id);
  //     res.status(200).json({
  //       status:"success",
  //       user,
  //       token
  //     })
  // }catch(error){
  //     console.log(error);
  // }


  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role,contact,baseSalary,department,employeeId });
    console.log("user found",user)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

// @route POST /signup for patient
export const registerPatient = async (req, res) => {
  console.log("api is being hit for patient");
  const { name, email, password,role,contact } = req.body;

  try {
    const userExists = await patientREGS.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await patientREGS.create({ name, email, password, role,contact });
    console.log("user found",user)
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contact:user.contact,
      password:user.password,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};


// @route POST /login
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('hi form login controller');

  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log("user found ")
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};




// //created my madhu
// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('hi form login controller');
//   try {
//     const user = await User.findOne({ email });
//     console.log(user);
//     if (!user || user.password !== password) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }
//     console.log("user found ")
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Login failed', error });
//   }
// };
// created by madhu



// @route POST /login for patient
export const loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await patientREGS.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    console.log("user found ")

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
