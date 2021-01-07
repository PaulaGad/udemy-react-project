import React, { createContext, useEffect, useState } from 'react';
import request from '../helpers/request';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
 const [courses, setCourses] = useState([]);
 const [user, setUser] = useState(null);
 
 const fetchData = async () => { //tworzymy funkcję asynchroniczną, w useEffect nie jesteśmy w stanie zrobić tego bezpośrednio
  const { data } = await request.get('/courses');// robimy destrukturyzację z request, z tego co nam zwróci wyciągamy data, czyli same dane. Dzięki temu, że korzystamy z f. asynchronicznej możemy skorzystać z await. Czyli dopiero jak dane zostaną pobrane, program pójdzie dalej. request.get('/courses') - podajemy adres url, z którego chcemy pobrać dane. 
  setCourses(data.courses); // w obiekcie data znajduje się obiekt courses
 };

 useEffect(() => {
  fetchData();
 }, []);

 // const fetchData = async () => {
 //  const { data } = await request.get('/courses');
 //  setCourses(data.courses);
 // }

 // useEffect(() => {
 //  fetchData();
 // }, []);

 return (
  <StoreContext.Provider value={{ //wrzucamy tu wszystko, bo chcemy korzystać z tego w całej aplikacji, ale jako obiekt
   courses,
   setCourses,
   user,
   setUser
  }}>
   {children}
  </StoreContext.Provider>
 );
};
 
export default StoreProvider;