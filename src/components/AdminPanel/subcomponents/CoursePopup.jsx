import React, { useContext, useState } from 'react';
import bemCssModules from 'bem-css-modules';

import Modal from '../../Modal/Modal';
import { StoreContext } from '../../../store/StoreProvider';
import { default as CoursePopupStyles } from './CoursePopup.module.scss';
import request from '../../../helpers/request';

const style = bemCssModules(CoursePopupStyles);

const CoursePopup = ({ 
 authors = [],
 hidePopup,
 isEditMode = true,
 isOpenPopup,
 id,
 img = '',
 price = 0,
 title = '',
}) => {
 const [formAuthors, setFormAuthors] = useState(authors);
 const [formAuthor, setFormAuthor] = useState('');
 const [formImg, setFormImg] = useState(img);
 const [formPrice, setFormPrice] = useState(price);
 const [formTitle, setFormTitle] = useState(title);

 const { setCourses } = useContext(StoreContext);

 const handleOnChangeAuthor = e => setFormAuthor(e.target.value);
 const handleOnChangeImg = e => setFormImg(e.target.value);
 const handleOnChangePrice = e => setFormPrice(e.target.value);
 const handleOnChangeTitle = e => setFormTitle(e.target.value);

 const handleOnSubmit = async e => {
  e.preventDefault();
  
  const courseObject = {
   authors: formAuthors,
   id,
   img: formImg,
   price: Number(formPrice),
   title: formTitle,
  };

  if (isEditMode) {
   const { data, status } = await request.put('/courses', courseObject); //używamy put, bo aktualizujemy i przesyłamy cały obiekt kursy, gdybyśmy zmieniali pojedynczą informację użylibyśmy patch, w przypadku tworzenia i wysyłania nowego obiektu używamy metody post;

   if (status === 202) {
    setCourses(data.courses);
   }
   } else { 
   const { data, status } = await request.post('/courses', courseObject); //tworzymy nowy obiekt, gdy nie jesteśmy w trybie edycji

    if (status === 201) {
     setCourses(data.courses);
    }
   }
  
  hidePopup();
 };

 const addAuthor = e => {
  e.preventDefault();
  setFormAuthors(prev => [...prev, formAuthor]);
  setFormAuthor('');
 };

 const deleteAuthor = e => {
  const authorToDelete = e.target.dataset.author;
  setFormAuthors(prev => prev.filter(author => author !== authorToDelete));
 };

 const authorsElements = formAuthors.map(author => (
  <li key={author}>
   <p>{author}</p>
   <button data-author={author} onClick={deleteAuthor}>Usuń</button>
  </li>
 ));

 const correctLabel = isEditMode ? 'Aktualizuj kurs' : 'Utwórz kurs';

 return (
  <Modal handleOnClose={hidePopup} isOpen={isOpenPopup}>
   <div className={style()}>
    <form className={style('form')} method="submit" onSubmit={handleOnSubmit}>
     <div className={style('form-row')}>
      <label>
       Autor:
       <input className={style('input')} onChange={handleOnChangeAuthor} type="text" value={formAuthor} />
       <button onClick={addAuthor}>Dodaj autora</button>
      </label>
     </div>
     <div className={style('form-row')}>
      <label>
       Obrazek url:
       <input className={style('input')} onChange={handleOnChangeImg} type="text" value={formImg} />
      </label>
     </div>
     <div className={style('form-row')}>
      <label>
       Cena:
       <input className={style('input')} onChange={handleOnChangePrice} type="number" value={formPrice} />
      </label>
     </div>
     <div className={style('form-row')}>
      <label>
       Tytuł:
       <input className={style('input')} onChange={handleOnChangeTitle} type="text" value={formTitle} />
      </label>
     </div>
     <button type="submit">{correctLabel}</button>
     <button onClick={hidePopup} type="button">Anuluj</button>
    </form>
    <p>Lista autorów:</p>
    <ul>
     {authorsElements}
    </ul>
   </div>

  </Modal>
 );
}
 
export default CoursePopup;