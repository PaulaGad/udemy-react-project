import React, { useContext } from 'react';
import Course from '../Course/Course';
import { StoreContext } from '../../store/StoreProvider';

import bemCssModules from 'bem-css-modules';
import { default as UserCoursesStyles } from './UserCourses.module.scss';

const style = bemCssModules(UserCoursesStyles);

const UsersCourses = () => {
 const { user, courses } = useContext(StoreContext);
 
 const boughtCourses = courses
 .filter(course => user.courses.includes(course.id))
 .map(course => <Course key={course.id} {...course}/>);

 return (
  <section className={style()}>
   <h2 className={style('title')}>Twoje wykupione kursy</h2>
   <ul className={style('list')}>
   {boughtCourses}
   </ul>
  </section>
 );
}
 
export default UsersCourses;