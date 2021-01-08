import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Courses from '../Courses/Courses';
import { StoreContext } from '../../store/StoreProvider';

import bemCssModules from 'bem-css-modules';
import { default as ContentStyles } from './Content.module.scss';

const style = bemCssModules(ContentStyles);

const ADMIN_TYPE = 1;

const Content = () => {
 const { user } = useContext(StoreContext);

 const isUserLogged = Boolean(user)
 const isAdminLogged = user?.accessLevel === ADMIN_TYPE;

 return (
  <main className={style()}>
   <Switch>
    <Route exact path="/" render={() => <Courses/>} />
    { isUserLogged && <Route exact path="/my-courses" render={() => <p>Moje kursy</p>}/>}
    { isAdminLogged && <Route exact path="/manage-courses" render={() => <p>Zarządzanie kursami</p>}/>}
    <Redirect to="/"/>
    {/* Gdybyśmy źle wpisali adres, to przełączy nas na stronę główną */}
   </Switch>
  </main>
 );
}
 
export default Content;