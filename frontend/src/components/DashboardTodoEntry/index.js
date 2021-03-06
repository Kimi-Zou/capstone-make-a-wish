import moment from 'moment';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { DashboardContext } from '../../context/dashboard';
import './index.css';

const DashboardTodoEntry = ({ todo }) => {
  const { status } = todo;
  const { title } = todo.Wish;
  const { image } = todo.Wish.WishImages[0];
  const { displayName, birthday } = todo.Wish.User;
  const sessionUser = useSelector(state => state.session.user);
  const { linkToFriend, displayGift, updateTodo } = useContext(DashboardContext);

  return (
    <tr className='dashboard-todo-entry__wrapper'>
      <td
        className='dashboard-todo-entry__gift'
        onClick={() => {
          linkToFriend(todo.Wish.User);
          displayGift(todo.Wish);
        }}
      >
        <img
          className='dashboard-todo-entry__gift-image'
          src={image}
          alt='gift'
        />
        <span className='dashboard-todo-entry__gift-title'>
          {title}
        </span>
      </td>
      <td
        className='dashboard-todo-entry__friend'
        onClick={() => {
          linkToFriend(todo.Wish.User);
        }}
      >
        <span className='dashboard-todo-entry__friend-name'>
          {displayName}
        </span>
        <span className='dashboard-todo-entry__friend-birthday'>
          {moment(birthday).format('MM-DD')}
        </span>
      </td>
      {
        [1, 2, 3].map(statusCode => (
          <td className='dashboard-todo-entry__task-box' key={statusCode}>
            {
              status >= statusCode
                ? <i className='dashboard-todo-entry__complete fas fa-check-circle' />
                : <div
                    className='dashboard-todo-entry__incomplete'
                    onClick={() => updateTodo(todo.id, statusCode, sessionUser.id)}
                  />
            }
          </td>
        ))
      }
    </tr>
  );
};

export default DashboardTodoEntry;
