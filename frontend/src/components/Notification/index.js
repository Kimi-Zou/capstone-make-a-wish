import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllNotifications } from '../../store/notification';
import NotificationFriendRequest from '../NotificationFriendRequest';
import NotificationAcceptFriend from '../NotificationAcceptFriend';
import './index.css';

const Notification = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const storeNotifications = useSelector(state => state.notification.notifications);
  const [notifications, setNotifications] = useState([]);

  // Get all notifications
  useEffect(() => {
    if (!sessionUser) return;
    dispatch(getAllNotifications(sessionUser.id));
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (storeNotifications.length > 0) setNotifications(storeNotifications);
  }, [storeNotifications]);

  // Calculate time
  const diffDay = (notification) => {
    const createdTime = moment(notification.createdAt);
    const currentTime = moment(new Date());
    return createdTime.diff(currentTime) < 86400000;
  };

  const diffYear = (notification) => {
    const createdTime = moment(notification.createdAt);
    const currentTime = moment(new Date());
    return createdTime.diff(currentTime, 'days') < 365;
  };

  return (
    <div className='notification__wrapper'>
      <div className='notification__inner-wrapper'>
        <div className='notification__heading'>Notifications</div>
        {
          notifications.length > 0
            ? notifications.map((notification) => {
                if (notification.NotificationObject.entityTypeId === 1) {
                  return (
                    <NotificationFriendRequest
                      key={notification.id}
                      notification={notification}
                      diffDay={diffDay}
                      diffYear={diffYear}
                    />
                  );
                } else if (notification.NotificationObject.entityTypeId === 2) {
                  return (
                    <NotificationAcceptFriend
                      key={notification.id}
                      notification={notification}
                      diffDay={diffDay}
                      diffYear={diffYear}
                    />
                  );
                }
              })
            : (
              <div className='notification__no-notification-message'>
                You don't have any notifications.
              </div>
              )
        }
      </div>
    </div>
  );
};

export default Notification;
