import firebase from '../firebase';
import axios from '../axios';

export default async (provider, type) => {
  try {
    const { user } = await firebase.auth().signInWithPopup(provider);
    if (type === 'signup') {
      const { data } = await axios.post('/auth/register', {
        name: user.displayName,
        profilePicture: user.photoURL,
        email: user.email,
      });
      return { data, user };
    }
    const { data } = await axios.post('/auth/login', {
      email: user.email,
    });
    return { data, user };
  } catch (e) {
    console.log(e);
  }
};
