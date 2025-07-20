export interface User {
    uid: string;
    email: string;
    displayName: string;
  }
  
  export const signInWithEmailAndPassword = async (email: string, _: string) => {
    const mockUser = {
      uid: 'mock-uid',
      email: email,
      displayName: 'Mock User',
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    return Promise.resolve({ user: mockUser });
  };
  
  export const signOut = async () => {
    localStorage.removeItem('user');
    return Promise.resolve();
  };
  
  export const onAuthStateChanged = (callback: (user: User | null) => void) => {
    const user = localStorage.getItem('user');
    callback(user ? JSON.parse(user) : null);
    return () => {};
  };